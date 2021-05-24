var dialogsGameOverRaven;
var dialogsGameOverTime;
var dialogsGameOverWin;
var load;
class Scene4 extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {}
  create() {
    //txt
    txt = this.add.text(60, 410);
    txt.setDepth(9);
    txt.setFontSize(35); //119 letras.
    txt.setColor("#000");
    //buttons
    //Keys
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyZSprite = this.add.sprite(730, 550, "keyz");
    keyZSprite.setDepth(10);
    keyZSprite.setVisible(false);
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.anims.create({
      key: "push",
      repeat: -1,
      frameRate: 2,
      frames: this.anims.generateFrameNumbers("keyz", {
        start: 0,
        end: 1,
      }),
    });
    keyZSprite.play("push");
    //UI
    uiText = this.add.image(400, 480, "ui");
    uiText.setDepth(8);
    uiText.setVisible(false);
    //dialogs
    dialogsGameOverRaven = [
      ["¿Qué ocurre?", ""],
      ["¿Lagartito?", ""],
      ["¿¡LAGARTITOOOOO!?", "bold"],
      [
        "Desde ahora puedes saltar todos los diálogos presionando la tecla «F».",
        "italic",
      ],
    ];
    dialogsGameOverTime = [
      ["Uaaaah…", ""],
      ["¿Ya no se ven las estrellas?", ""],
      ["Bien, ya es hora de comer…", ""],
      ["No tengo más PAPAS, ¡NOOOOOOO!", "bold"],
      [
        "Desde ahora puedes saltar todos los diálogos presionando la tecla «F».",
        "italic",
      ],
    ];
    dialogsGameOverWin = [
      ["Uaaaah…", ""],
      ["Tuve un sueño muy raro.", ""],
      ["Un lagartito corría por el huerto recogiendo papas.", ""],
      [
        "Y un cuervo tenia papas de color dorado, ¿De donde las abra obtenido?",
        "bold",
      ],
      [
        "Desde ahora puedes saltar todos los diálogos presionando la tecla «F».",
        "italic",
      ],
    ];
    //global time
    totalTime = 0;
    //txtLoad
    load = false;
  }

  update(time, delta) {
    totalTime += Clock(delta);
    if (!load) {
      if (endGame < 1) {
        LoadDialogs(dialogsGameOverRaven);
      } else if (endGame > 1) {
        txt.setFontFamily("Zapf Chancery, cursive");
        LoadDialogs(dialogsGameOverTime);
      } else {
        if (endGame == 1) {
          txt.setFontFamily("Zapf Chancery, cursive");
          LoadDialogs(dialogsGameOverWin);
        }
      }
      load = true;
    }

    if (InitDialog()) {
      this.scene.start("inicio");
    }
  }
}
