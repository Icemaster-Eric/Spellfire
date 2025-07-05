import numpy as np


class Player:
    def __init__(self):
        pass


class Bullet:
    def __init__(self):
        pass


class PlayerArchetype:
    MAX_PLAYERS = 100

    def __init__(self):
        self.players = {}
        self.data = np.zeros((PlayerArchetype.MAX_PLAYERS, 3), dtype=np.float32)
        self.n_active = 0

    def append(self, player: Player):
        if self.n_active >= self.MAX_PLAYERS:
            raise RuntimeError("Max player limit reached")

        self.players[player] = self.n_active


class BulletArchetype:
    INITIAL_BULLETS = 8192
    BULLETS_INCREMENT = 1024

    def __init__(self):
        self.bullets = {}
        self.data = np.zeros((BulletArchetype.INITIAL_BULLETS, 5), dtype=np.float32)
        self.n_active = 0

    def append(self, bullet: Bullet):
        pass


class World:
    def __init__(self):
        self.player_archetype = PlayerArchetype()
        self.bullet_archetype = BulletArchetype()

    def spawn(self, entity: Player | Bullet):
        if type(entity) == Player:
            self.player_archetype.append(entity)

        elif type(entity) == Bullet:
            self.bullet_archetype.append(entity)
