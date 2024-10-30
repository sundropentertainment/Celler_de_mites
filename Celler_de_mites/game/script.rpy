# Coloca el código de tu juego en este archivo.

# Declara los personajes usados en el juego como en el ejemplo:

define t = Character("Titus", color="000000")
define e = Character("El·lòdia", color="000000")
define s = Character("Segre", color="000000")
define p = Character("Peris", color="000000")
define l = Character("Laia", color="000000")
define a = Character("Alma", color="000000")
define j = Character("Jordi", color="000000")
define b = Character("Blanca", color="000000")

$ current_tooltip_image = None  # Default value when the game starts


image titus = "images/titus.png"
image elodia = "images/elodia.png"
image segre = "images/segre.png"
image peris = "images/peris.png"
image laia = "images/laia.png"
image alma = "images/alma.png"
image jordi = "images/jordi.png"
image blanca = "images/blanca.png"

# El juego comienza aquí.

# Start of the game script
label start:
    # Show the necessary screens
    scene tavern
    #show screen tavern
    show screen potioncrafting
    show screen potion_display
    show screen drink_overlay
    show screen tooltip_display

    # Main opening dialogue
    "I obrim el bar!"
    "Quan vinguin clients els farem la beguda que ens demanin. Pot ser que ens diguin alguna informació sobre ells."


    # Call the show_dialogue function for each character as needed.
    call show_dialogue("titus")
    # You can call other characters sequentially as required, for example:
    call show_dialogue("elodia")
    call show_dialogue("segre")
    call show_dialogue("peris")
    call show_dialogue("laia")
    call show_dialogue("alma")
    call show_dialogue("jordi")
    call show_dialogue("blanca")

# At the beginning of your script, define a variable to manage dialogue state
default dialogue_paused = False

# Modify the show_dialogue label
label show_dialogue(character):
    $ current_character = character
    # Check if the dialogue is paused
    if dialogue_paused:
        return  # If it's paused, do nothing

    # Show the character image and dialogue based on the character name
    if character == "titus":
        show titus at Position(xpos=256, ypos=521, xanchor=0.5, yanchor=0.5) zorder 100
        t "Hola, sóc en Titus!"  # Dialogue for Titus
        $ desired_drink = desired_drinks["titus"]
    elif character == "elodia":
        show elodia at Position(xpos=211, ypos=522, xanchor=0.5, yanchor=0.5) zorder 100
        e "El·lòdia, a la vostra disposició."  # Dialogue for El·lòdia
        $ desired_drink = desired_drinks["elodia"]
    elif character == "segre":
        show segre at Position(xpos=309, ypos=597, xanchor=0.5, yanchor=0.5) zorder 100
        s "Hola, amic!"  # Dialogue for Segre
        $ desired_drink = desired_drinks["segre"]
    elif character == "peris":
        show peris at Position(xpos=376, ypos=506, xanchor=0.5, yanchor=0.5) zorder 100
        p "Sóc en Peris i m'agradaria una cosa refrescant."  # Dialogue for Peris
        $ desired_drink = desired_drinks["peris"]
    elif character == "laia":
        show laia at Position(xpos=157, ypos=506, xanchor=0.5, yanchor=0.5) zorder 100
        l "Hola, Laia aquí! Preparada per la festa."  # Dialogue for Laia
        $ desired_drink = desired_drinks["laia"]
    elif character == "alma":
        show alma at Position(xpos=211, ypos=506, xanchor=0.5, yanchor=0.5) zorder 100
        a "Alma a la vostra disposició."  # Dialogue for Alma
        $ desired_drink = desired_drinks["alma"]
    elif character == "jordi":
        show jordi at Position(xpos=225, ypos=573, xanchor=0.5, yanchor=0.5) zorder 100
        j "En Jordi vol una beguda energètica, si us plau."  # Dialogue for Jordi
        $ desired_drink = desired_drinks["jordi"]
    elif character == "blanca":
        show blanca at Position(xpos=236, ypos=575, xanchor=0.5, yanchor=0.5) zorder 100
        b "Hola, sóc la Blanca. Què tens de nou?"  # Dialogue for Blanca
        $ desired_drink = desired_drinks["blanca"]

    # Call serve_potion with the current_character

    # Hide all other characters
    hide elodia
    hide segre
    hide peris
    hide laia
    hide alma
    hide jordi
    hide blanca

    # Hide the custom textbox if potion crafting is visible
    if potioncrafting_visible:
        window hide  # Hides the default dialogue box
    "El personatge ha acabat de parlar. Pots preparar la beguda."
    # Show the craft potion button
    show screen craft_button  # Show the craft button screen
    


label serve_potion:
    # Pause the dialogue if it is active
    $ renpy.pause()

    # Get the desired drink for the current character
    $ desired_drink = desired_drinks[current_character]  # Look up the character's desired drink

    # Check if the served potion is the correct one
    if potion_slot == desired_drink:  # Compare with the potion that the player crafted
        if current_character == "titus":
            t "Gràcies! Això és el que volia."
        elif current_character == "elodia":
            e "Moltes gràcies!"
        elif current_character == "segre":
            s "Perfecte, això em va genial!"
        elif current_character == "peris":
            p "Genial! Estic refrescat!"
        elif current_character == "laia":
            l "M'encanta! Ets increïble."
        elif current_character == "alma":
            a "Molt bé, gràcies!"
        elif current_character == "jordi":
            j "Exactament el que necessitava!"
        elif current_character == "blanca":
            b "Fantàstic, gràcies!"
    else:
        # If incorrect
        if current_character == "titus":
            t "Això no és el que volia, adéu."
        elif current_character == "elodia":
            e "Ho sento, però no és el que volia. Adéu."
        elif current_character == "segre":
            s "No és el que buscava. Adéu!"
        elif current_character == "peris":
            p "No era el que volia, així que adéu."
        elif current_character == "laia":
            l "No m'agrada. Adéu!"
        elif current_character == "alma":
            a "No és el que volia. Fins aviat!"
        elif current_character == "jordi":
            j "No era el que necessitava, així que adéu."
        elif current_character == "blanca":
            b "No és el que volia. Fins aviat!"

    # Reset slots or other logic after serving the potion
    $ reset_slots()  # Reset the slots after serving

    # Hide the current character
    if current_character == "titus":
        hide titus
    elif current_character == "elodia":
        hide elodia
    elif current_character == "segre":
        hide segre
    elif current_character == "peris":
        hide peris
    elif current_character == "laia":
        hide laia
    elif current_character == "alma":
        hide alma
    elif current_character == "jordi":
        hide jordi
    elif current_character == "blanca":
        hide blanca

    # Reset the dialogue state after serving the potion
    $ dialogue_paused = False  # Resume the dialogue

    # Call a function to show a new character
    call show_next_character  # Implement this function to show the next character


    # Reset slots or other logic after serving the potion
    $ reset_slots()  # Reset the slots after serving


    # Hide the current character
    if character == "titus":
        hide titus
    if character == "elodia":
        hide elodia
    if character == "segre":
        hide segre
    if character == "peris":
        hide peris
    if character == "laia":
        hide laia
    if character == "alma":
        hide alma
    if character == "jordi":
        hide jordi
    if character == "blanca":
        hide blanca

    # Reset the dialogue state after serving the potion
    $ dialogue_paused = False  # Resume the dialogue

    # Call a function to show a new character
    call show_next_character  # Implement this function to show the next character

label show_next_character:
    # Logic to randomly or sequentially show the next character
    # For example, you can keep a list of characters and iterate through them
    # Then call show_dialogue with the new character's name




    
