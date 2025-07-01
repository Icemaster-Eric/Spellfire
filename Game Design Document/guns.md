# Guns
A comprehensive list of every gun, tactical item and throwable.

- Gun spread should slowly increase per shot until it reaches the maximum spread value, including a first-shot accuracy stat (?)
- Headshots (to be implemented later)

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

- `AR-1`
    - Description: `A beginner's automatic rifle.`
    - Damage: `15`
    - Fire Rate: `6`
    - Magazine Size: `25`
    - Reload Speed: `2.5`
    - Spread: `2`
    - Spread while moving: `3`
    - Weight: `5`
- `M-1`
    - Description: ``
    - Damage: `12`
    - Fire Rate: `7`
    - Magazine Size: `30`
    - Reload Speed: `3`
    - Spread: `2`
    - Spread while moving: `3.5`
    - Weight: `6`
- `VQ-1`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Modifications:
        - `1.25x sights`

## Sniper Rifles
Naming Convention: `[MythicalCreature] Gen-[Number]`

Sniper Scopes:
- Use right click to scope in, displaying a scope overlay that makes only a circular area around the mouse cursor visible.
- Scrolling up/down moves the viewbox in the direction that the mouse was in.
- The scope can be moved anywhere within the current viewbox.
- A bullet trajectory line will be displayed centered on the scope, constantly shifting left/right at random speeds based on the wind mechanic.
- The player will be forced out of scoping upon needing to reload.

Sniper bullets will be extremely fast projectiles, requiring raycasting ahead in order to confirm hits.

`MythicalCreature` corresponds to the specific modifier combination and `Number` corresponds to the base stats of the gun.
- `Basilisk Mk-1`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Modifications:
        - `2x Scope`
- `Manticore Mk-1`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Modifications:
        - `4x Scope`
- `Hydra Mk-1`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Modifications:
        - `3x Scope`

## Designated Marksman Rifles
Naming Convention: `[ClassicalTerm]-[RomanNumeral]`
`ClassicalTerm` corresponds to the specific modifier combination and `RomanNumeral` corresponds to the base stats of the gun.
- `Aegis X`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Semiauto
    - Modifications:
        - `1.3x sights`
- `Vigilus IV`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Semiauto
    - Modifications:
        - `1.5x sights`
- `Orion II`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
    - Semiauto
    - Modifications:
        - `2x sights`

## Light Machine Guns
Naming Convention: `[MachineTerm] [Number][Letter]`
`MachineTerm` corresponds to the specific modifier combination and `Number`/`Letter` corresponds to the base stats of the gun.
- `Forge 93B`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
- `Drill 76X`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
- `Crank 110T`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``

## Submachine Guns
Naming Convention: `[Nickname]-[Hex]`
`Nickname` corresponds to the specific modifier combination and `Hex` corresponds to the base stats of the gun.
- `Whisper-2B`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
- `Slicer-22`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``
- `Sweeper-6A`
    - Description: ``
    - Damage: ``
    - Fire Rate: ``
    - Magazine Size: ``
    - Reload Speed: ``
    - Spread: ``
    - Spread while moving: ``
    - Weight: ``

## Shotguns
Naming Convention: `[AggressiveAnimal] Gen[Number]`
`AggressiveAnimal` corresponds to the specific modifier combination and `Number` corresponds to the base stats of the gun.
- `Viper Gen2`
    - Description: ``
    - Damage: 
    - Fire Rate: 
    - Bullets per shot: 
    - Magazine Size: 
    - Reload Speed: 
    - Reload Amount: 
    - Spread: 
    - Weight: 
    - Semiauto
- `Rhino Gen1`
    - Description: ``
    - Damage: 
    - Fire Rate: 
    - Bullets per shot: 
    - Magazine Size: 
    - Reload Speed: 
    - Reload Amount: 
    - Spread: 
    - Weight: 
    - Automatic
- `Jackal Gen3`
    - Description: ``
    - Damage: 
    - Fire Rate: 
    - Bullets per shot: 
    - Magazine Size: 
    - Reload Speed: 
    - Reload Amount: 
    - Spread: 
    - Weight: 
    - Semiauto

## Handguns
[ to be considered ]

## Special Weapons
[ to be considered ]
