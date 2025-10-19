import server_packet_pb2
 
 
class Entity:
    def __init__(self, entity):
        self.type: int = entity.type
        self.type: server_packet_pb2. = entity.type
 
 
class ServerPacket:
    def __init__(self, packet):
        self.timestamp: float = packet.timestamp
        self.entities: list[Entity] = packet.entities
        self.events: list[ServerEvent] = packet.events