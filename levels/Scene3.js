class Scene3 extends Phaser.Scene {
  constructor() {
    super("tutorial");
  }

  preload() {}
  create() {
    //txt
    txt = this.add.text(60, 410);
    txt.setDepth(9);
    txt.setFontSize(35); //119 letras.
    txt.setColor("#000");
    //buttons
    keyZSprite = this.add.sprite(730, 550, "keyz");
    keyZSprite.setDepth(10);
    keyZSprite.setVisible(false);
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

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
    var dialogsTutorial = [
      ["Hey...", ""],
      ["¡Hey!", ""],
      ["¡HEEEEEEEEEY! Lagartito, despierta.", ""],
      [
        "El Pequeño Lagarto abre sus ojos, clavando su mirada fija hacia la nada durante unos segundos.",
        "italic",
      ],
      [
        "Parece que Dekhy se durmió, después del gran berrinche que hizo al perder todas sus papas.",
        "",
      ],
      ["¿Podrías recoger algunas del huerto?", ""],
      [
        "El pequeño Lagarto asiente, moviendo la cabeza de arriba hacia abajo.",
        "italic",
      ],
      ["Siempre igual de servicial y callado.", ""],
      [
        "Bien, recoge unas 50 papas, con eso tendrá para unos cuantos meses.",
        "",
      ],
      [
        "Hazlo antes de que despierte, ya casi amanece y tomará el control del cuerpo nuevamente. ¡Suerte!",
        "",
      ],
    ];
    LoadDialogs(dialogsTutorial);
    totalTime = 0;
  }

  update(time, delta) {
    totalTime += Clock(delta);
    if (InitDialog()) {
      this.scene.start("juego");
    }
  }
}
