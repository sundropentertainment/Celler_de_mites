# Coloca el código de tu juego en este archivo.

# Declara los personajes usados en el juego como en el ejemplo:

define t = Character("Titus")
define e = Character("El·lòdia")
define s = Character("Segre")
define p = Character("Peris")
define l = Character("Laia")
define a = Character("Alma")
define j = Character("Jordi")
define b = Character("Blanca")



# El juego comienza aquí.

label start:
    show screen tavern
    show screen potioncrafting
    show screen potion_display
    show screen drink_overlay

    "I obrim el bar!"

    "Quan vinguin clients els farem la beguda que ens demanin. Pot ser que ens diguin alguna informació sobre ells"


    $ randchar = renpy.random.choice(['ti', 'el', 'se', 'pe', 'la', 'al', 'jo', 'bl'])

    if randchar = 'ti':
        jump ti

    if randchar = 'el':
        jump el

    if randchar = 'se':
        jump se

    if randchar = 'pe':
        jump pe

    if randchar = 'la':
        jump la

    if randchar = 'al':
        jump al

    if randchar = 'jo':
        jump jo

    if randchar = 'bl':
        jump bl



label ti:
    "Hola"
 

label el:


label se:



label pe:



label la:



label al:



label jo:



label bl:

