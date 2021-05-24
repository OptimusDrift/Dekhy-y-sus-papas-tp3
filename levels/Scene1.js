class Scene1 extends Phaser.Scene {
  constructor() {
    super("inicio");
  }
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("ground90", "assets/platform90.png");
    this.load.image("papa", "assets/papa.png");
    this.load.image("papaGrande", "assets/papaGrande.png");
    this.load.image("reloj", "assets/reloj.png");
    this.load.image("goldPapa", "assets/goldPapa.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("ui", "assets/uiText.png");
    this.load.image("mm", "assets/misilMagico.png");
    this.load.image("ravenAtk", "assets/ravenAtk.png");
    this.load.image("portada", "assets/portada.png");
    this.load.image("btn", "assets/btnJugar.png");
    this.load.image("btnGit", "assets/btnGit.png");
    this.load.spritesheet("keyz", "assets/keyZ.png", {
      frameWidth: 32,
      frameHeight: 30,
    });
    this.load.spritesheet("lagartito", "assets/lagartito.png", {
      frameWidth: 68,
      frameHeight: 18,
    });
    this.load.spritesheet("ravenM", "assets/raven_moviment.png", {
      frameWidth: 32,
      frameHeight: 24,
    });
    this.load.spritesheet("ravenStun", "assets/ravenStun.png", {
      frameWidth: 26,
      frameHeight: 22,
    });
  }
  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("lagartito", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("lagartito", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    var btn = this.add.image(605, 340, "btn");
    var btnGit = this.add
      .image(94, 94, "btnGit")
      .setScale(0.5)
      .setRotation(-0.35);
    this.add.image(400, 300, "portada");
    btn.setDepth(8);
    btnGit.setDepth(8);
    btn.setInteractive();
    btnGit.setInteractive();
    btn.on("pointerdown", () => this.scene.start("tutorial"));
    btnGit.on(
      "pointerup",
      () => (window.location.href = "https://optimusdrift.github.io/Dekhy/")
    );
  }
}
