import threading
import time
 
import pyglet
from pyglet.gl import glClearColor
from pyglet.window import key
from websockets.sync.client import connect
 
import client_packet_pb2, server_packet_pb2, types_pb2
 
 
class Camera:
    def __init__(self, x: float = 0, y: float = 0, zoom: int = 50):
        self.x, self.y = x, y
        self.zoom = zoom
 
    def translate(self, x: float):
        return x * self.zoom
 
    def translate_entity(self, entity: server_packet_pb2.Entity):
        new_entity = server_packet_pb2.Entity()
        new_entity.CopyFrom(entity)
        new_entity.collider.position.x = window.width / 2 + (entity.collider.position.x - self.x) * self.zoom
        new_entity.collider.position.y = window.height / 2 + (entity.collider.position.y - self.y) * self.zoom
        return new_entity
 
 
class RenderEntity:
    @property
    def position(self):
        raise NotImplementedError
 
    @position.setter
    def position(self, value):
        raise NotImplementedError
 
    def delete(self):
        raise NotImplementedError
 
 
class RenderGunner(RenderEntity):
    def __init__(self, entity_id: int, name: str, x: float, y: float, radius: float, friendly: bool):
        self.entity_id = entity_id
        self.name = name
        self.circle = pyglet.shapes.Circle(
            x,
            y,
            radius,
            color=(30, 50, 255) if friendly else (255, 50, 30),
            batch=game.batch,
        )
        self.label = pyglet.text.Label(
            name,
            font_size=12,
            color=(30, 50, 155) if friendly else (155, 50, 30),
            x=window.width // 2,
            y=window.height // 2,
            anchor_x="center",
            anchor_y="center",
            batch=game.batch,
        )
 
    @property
    def position(self):
        return self.circle.position
 
    @position.setter
    def position(self, value):
        self.circle.position = value
        self.label.x = self.circle.x
        self.label.y = self.circle.y + 50
 
    def delete(self):
        self.circle.delete()
 
 
class Game:
    def __init__(self):
        self.entities: dict[int, server_packet_pb2.Entity] = {}
        self.render_entities: dict[int, RenderEntity] = {}
        self.batch = pyglet.graphics.Batch()
        self.camera = Camera()
        self.ping_label = pyglet.text.Label(x=50, y=window.height-50, color=(0,0,0), batch=self.batch)
        self.pings = []
 
 
class Player:
    def __init__(self):
        self.id: int = -1
        self.vx: float = 0
        self.vy: float = 0
        self.key_handler = key.KeyStateHandler()
 
 
window = pyglet.window.Window(caption="Spellfire Debug Client", width=800, height=600)
window = pyglet.window.Window(caption="Spellfire Debug Client", width=1600, height=900)
glClearColor(1, 1, 1, 1)  # white background
 
game = Game()
player = Player()
 
window.push_handlers(player.key_handler)
 
 
@window.event
def on_draw():
    window.clear()
    game.batch.draw()
 
 
def tick(dt):
    if len(game.pings) > 100:
        game.pings = game.pings[len(game.pings)-100:]
 
    game.ping_label.text = f"Ping: {sum(game.pings) / len(game.pings):.0f}ms"
 
    if player.key_handler[key.D] and player.key_handler[key.A]:
        player.vx = 0
    elif player.key_handler[key.D]:
        player.vx = 1
    elif player.key_handler[key.A]:
        player.vx = -1
    else:
        player.vx = 0
    if player.key_handler[key.W] and player.key_handler[key.S]:
        player.vy = 0
    elif player.key_handler[key.W]:
        player.vy = 1
    elif player.key_handler[key.S]:
        player.vy = -1
    else:
        player.vy = 0
 
    for entity_id, entity in game.entities.items():
        if entity_id in game.render_entities:
            game.render_entities[entity_id].position = (
                entity.collider.position.x,
                entity.collider.position.y,
            )
            continue
 
        print(
            f"[CLIENT]: Spawning entity (entity_id: {entity.id}, type:{entity.type}, position: {entity.collider.position.x}, {entity.collider.position.y})"
        )
 
        if entity.type == server_packet_pb2.Entity.EntityType.GUNNER:
            name = next(
                attr
                for attr in entity.attributes
                if attr.type
                == server_packet_pb2.EntityAttribute.EntityAttributeType.NAME
            ).name
            game.render_entities[entity_id] = RenderGunner(
                entity_id,
                name,
                entity.collider.position.x,
                entity.collider.position.y,
                game.camera.translate(entity.collider.radius),
                entity_id == player.id,
            )
 
    to_remove = []
    for entity_id, entity in game.render_entities.items():
        if entity_id not in game.entities.keys():
            to_remove.append(entity_id)
            game.render_entities[entity_id].delete()
    # remove entities
    for entity_id in to_remove:
        del game.render_entities[entity_id]
 
 
def network_loop():
    uri = "ws://localhost:3000/ws?guest=true"
 
    with connect(uri, ping_interval=5, ping_timeout=None) as ws:
        print("[SERVER]: Connected")
 
        last_send = time.perf_counter()
 
        while True:
            now = time.perf_counter()
 
            client_pkt = client_packet_pb2.ClientPacket(
                timestamp=types_pb2.Timestamp(ms=round(now * 1000)),
                events=[
                    client_packet_pb2.ClientEvent(
                        type=client_packet_pb2.ClientEvent.MOVE,
                        movement=types_pb2.Vec2(x=player.vx, y=player.vy),
                    )
                ],
            )
 
            data = client_pkt.SerializeToString()
            ws.send(data, text=True)
 
            dt = now - last_send
            last_send = now
 
            game.pings.append(round(dt*1000))
 
            try:
                msg = ws.recv(timeout=1/30, decode=False)
                if msg == b"pong":
                    continue
            except TimeoutError:
                continue
 
            packet = server_packet_pb2.ServerPacket()
            packet.ParseFromString(msg)
 
            for event in packet.events:
                if event.type == server_packet_pb2.ServerEvent.ENTER_GAME:
                    player.id = event.enter_game_player_id
                    print(f"[EVENT]: ENTER_GAME (player_id: {player.id})")
 
            for entity in packet.entities:
                if entity.id == player.id:
                    game.camera.x = entity.collider.position.x
                    game.camera.y = entity.collider.position.y
 
                game.entities[entity.id] = game.camera.translate_entity(entity)
 
            packet_ids = [entity.id for entity in packet.entities]
 
            to_remove = []
            for entity_id, entity in game.entities.items():
                if entity_id not in packet_ids:
                    print(
                        f"[CLIENT]: Despawning entity (entity_id: {entity_id}, type:{entity.type})"
                    )
                    to_remove.append(entity_id)
            # despawn entities
            for k in to_remove:
                del game.entities[k]
 
 
if __name__ == "__main__":
    net_thread = threading.Thread(target=network_loop, daemon=True)
    net_thread.start()
    pyglet.clock.schedule_interval(tick, 1 / 30.0)
    pyglet.app.run()
 