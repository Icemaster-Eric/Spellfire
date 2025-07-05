# Guns
A comprehensive list of every gun, tactical item and throwable.

- Gun spread should slowly increase per shot until it reaches the maximum spread value, including a first-shot accuracy stat (?)
- Headshots (to be implemented later)
- Crafting ammo? (tracer rounds, armor piercing, etc)

Damage: Damage per bullet
Fire Rate: bullets / second
Magazine Size: bullets in each magazine
Reload Speed: Seconds to reload magazine (or one or more shells)
Spread: Possible degrees offset for a bullet shooting out of the gun barrel
Spread while moving: Same as spread, but when the player is moving
Weight: How heavy the weapon is, impacts player movement speed when equipped based on the formula `(1 - weight / 100) * movement_speed`

## Assault Rifles
Naming Convention: `[LetterSeries]-[Number]`
`LetterSeries` corresponds to the specific modifier combination and `Number` corresponds to the base stats of the gun.

Rifle Sights:
- Use right click to zoom in further to where the mouse cursor is.
- Spread/spread while moving will be decreased, but movement speed will also be decreased.

## Sniper Rifles
Naming Convention: `[MythicalCreature] Gen-[Number]`

Sniper Scopes:
- Use right click to scope in, displaying a scope overlay that makes only a circular area around the mouse cursor visible.
- Scrolling up/down moves the viewbox in the direction that the mouse was in.
- The scope can be moved anywhere within the current viewbox.
- A bullet trajectory line will be displayed centered on the scope, constantly shifting left/right at random speeds based on the wind mechanic.
- The player will be forced out of scoping upon needing to reload.

Sniper bullets will be extremely fast projectiles, requiring raycasting ahead in order to confirm hits.

## Designated Marksman Rifles
Naming Convention: `[ClassicalTerm]-[RomanNumeral]`

## Light Machine Guns
Naming Convention: `[MachineTerm] [Number][Letter]`

## Submachine Guns
Naming Convention: `[Nickname]-[Hex]`
`Nickname` corresponds to the specific modifier combination and `Hex` corresponds to the base stats of the gun.

## Shotguns
Naming Convention: `[AggressiveAnimal] Gen[Number]`

## Special Weapons
[ to be considered ]

## Crafting
The crafting ui for guns will have a different generic gun blueprint for each gun category with slots for each part of the gun (such as the muzzle, scope, barrel, trigger, magazine, etc). When clicking on a specific slot, a list of different options will appear, each requiring different materials and having different effects on the gun's capabilities.
