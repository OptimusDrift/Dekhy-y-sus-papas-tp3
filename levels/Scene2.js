var tiempoRestante;
class Scene2 extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  preload() {}

  create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");
    //timer
    totalTime = 0;
    timerOn = false;
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    borders = this.physics.add.staticGroup();
    borders.create(400, 625, "ground").setScale(2).refreshBody();
    borders.create(400, -25, "ground").setScale(2).refreshBody();
    borders.create(-25, 300, "ground90").setScale(2).refreshBody();
    borders.create(825, 300, "ground90").setScale(2).refreshBody();
    borders.setVisible(false);

    //  Now let's create some ledges
    platforms.create(600, 430, "ground");
    platforms.create(30, 350, "ground");
    platforms.create(750, 280, "ground");
    platforms.create(140, 180, "ground");
    // The player and its settings
    player = this.physics.add.sprite(300, 450, "lagartito");
    raven = this.physics.add.sprite(600, 300, "ravenM");
    raven.setImmovable();
    raven.moves = false;
    raven.body.setAllowGravity(false);
    magicMisil = this.physics.add.image(400, 300, "mm");
    magicMisil.body.setAllowGravity(false);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    raven.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    //raven animations
    this.anims.create({
      key: "ravenright",
      frames: this.anims.generateFrameNumbers("ravenM", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "ravenLeft",
      frames: this.anims.generateFrameNumbers("ravenM", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //atack raven
    this.anims.create({
      key: "ravenAtack",
      frames: [{ key: "ravenAtk", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    //raven stun
    this.anims.create({
      key: "ravenStuned",
      frames: [{ key: "ravenStun", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    //ravenStuned = true;
    ravenDontMove = true;
    ravenPana = true;
    raven.disableBody(true, true);
    timerRavenPana = TimerOn(totalTime, 1);
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    papas = this.physics.add.group({
      key: "papa",
      repeat: 5,
      setXY: { x: 12, y: 0, stepX: 140 },
    });

    papasGrandes = this.physics.add.group({
      key: "papaGrande",
      repeat: 5,
      setXY: { x: 82, y: 0, stepX: 140 },
    });

    papas.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    papasGrandes.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });
    tiempoRestante = 120;
    goldPotato = this.physics.add.sprite(400, 480, "goldPapa");
    txtScore = "Recolectadas: ";
    txtGameEnd = "Tiempo restante: ";
    txtMissil = "Misil Mágico: ";
    this.add.image(60, 562, "papaGrande").angle = -60;
    this.add.image(375, 562, "reloj").setScale(0.08);
    //  The score
    scoreText = this.add.text(85, 545, txtScore + "0", {
      fontFamily: "Zapf Chancery, cursive",
      fontSize: "32px",
      fill: "#000",
    });
    MissilText = this.add.text(15, 25, txtMissil + "Preparando...", {
      fontFamily: "Zapf Chancery, cursive",
      fontSize: "16px",
      fill: "#000",
    });
    MissilText.setVisible(false);
    timeEndText = this.add.text(400, 545, txtGameEnd + tiempoRestante, {
      fontFamily: "Zapf Chancery, cursive",
      fontSize: "32px",
      fill: "#000",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(papas, platforms);
    this.physics.add.collider(papasGrandes, platforms);
    this.physics.add.collider(goldPotato, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, papas, collectPotato, null, this);
    this.physics.add.overlap(
      player,
      papasGrandes,
      collectBigPotato,
      null,
      this
    );
    this.physics.add.overlap(player, goldPotato, collectGoldPotato, null, this);
    this.physics.add.overlap(player, raven, KillPlayer, null, this);
    this.physics.add.overlap(borders, raven, StunRavenBorder, null, this);
    this.physics.add.overlap(magicMisil, raven, AngryRaven, null, this);
    //txt
    txt = this.add.text(60, 410);
    txt.setDepth(9);
    txt.setFontSize(35); //119 letras.
    txt.setColor("#000");
    //UI
    uiText = this.add.image(400, 480, "ui");
    uiText.setDepth(8);
    uiText.setVisible(false);
    //Pause
    pause = false;

    magicMisil.disableBody(true, true);
    goldPotato.setBounce(0.4);
    goldPotato.disableBody(true, true);
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
    //dialogs
    var dialogsRaven = [
      ["Mira ese cuervo, lleva una papa de color dorado.", ""],
      [
        "Esas papas contarán cómo 5 de las papas normales, a Dekhy le encantaran.",
        "",
      ],
      ["Pero esos cuervos están muy lejos...", ""],
      [
        "Voy a intentar canalizar mi magia a través de tí, espereme un momento.",
        "",
      ],
    ];
    dialogsRaven2 = [
      [
        "Parece ser que si es posible, pero no es tan poderosa cómo debería.",
        "",
      ],
      [
        "Te prestaré mi magia, utilízala presionando «X» para aturdir a ese cuervo.",
        "",
      ],
    ];
    dialogsRaven3 = [
      ["Y ahora el cuervo está enojado, será mejor que lo esquives.", ""],
    ];
    dialogsRaven4 = [
      ["Parece que ya no quiere seguir luchando.", ""],
      [
        "Termina de cosechar las papas, estaré en tu cabeza, usa mi magia si lo necesitas.",
        "",
      ],
    ];
    canTalk = false;
    canUse = false;
    firstAtack = false;
    firstDeadRaven = false;
    contin = false;
    LoadDialogs(dialogsRaven);
    //end the game
    timeToEndGame = 0;
    finalTimeToEndGame = 0;
    finalTimeToEndGame = TimerOn(finalTimeToEndGame, tiempoRestante);
    endGame = 0;
  }
  update(time, delta) {
    totalTime += Clock(delta);
    if (!pause) {
      timeToEndGame += Clock(delta);
      timeEndText.setText(txtGameEnd + (120 - parseInt(timeToEndGame)));
      if (TimerOff(timeToEndGame, finalTimeToEndGame)) {
        gameOver = true;
        endGame = 2;
      }
      Move(delta);
      SetPotatoGravity(true);
      SetPlayerGravity(true);
      if (GetSpawnedRaven()) {
        if (!ravenStuned && follow) {
          VelocityRaven();
        }
        RavenStun(player);
        RavenMove();
      }
    } else {
      player.setVelocity(0);
      contin = StopRaven();
      player.anims.stop();
      SetPotatoGravity(false);
      SetPlayerGravity(false);
      SetPotatoVelocity(0);
    }
    //I like spaghetti codes
    if (canTalk) {
      pause = !InitDialog();
      MissilText.setVisible(true);
    }
    if (RavenText2()) {
      LoadDialogs(dialogsRaven2);
    }
    if (RavenText3()) {
      LoadDialogs(dialogsRaven3);
    }
    if (RavenText4()) {
      LoadDialogs(dialogsRaven4);
    }
    gameOver = GameOver(gameOver, this);
  }
}

function SetPlayerGravity(bool) {
  player.body.setAllowGravity(bool);
}
