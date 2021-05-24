var life = 3;
var timeRespawn = 5;
var spawned = false;

function KillPlayer() {
  gameOver = true;
  endGame = 0;
}

function StunRavenBorder() {
  if (life > 0) {
    if (ravenPana) {
      RavenDead();
    } else {
      ravenStuned = true;
      raven.setVelocity(0, 0);
    }
  }
}
x = 0;
function RavenMove() {
  if (ravenPana && ravenDontMove) {
    if (TimerOff(totalTime, timerRavenPana)) {
      raven.anims.play("ravenLeft", true);
      dead = false;
      raven.enableBody(true, 770, 60, true, true);
      VelocityRaven();
      ravenDontMove = false;
    }
  }
}
function AngryRaven() {
  magicMisil.disableBody(true, true);
  DropGoldPotato();
  ravenPana = false;
  life--;
  if (life <= 0) {
    RavenDead();
  }
  StunRavenBorder();
}
function DropGoldPotato() {
  if (ravenPana) {
    goldPotato.enableBody(true, raven.x, raven.y, true, true);
  }
}

follow = true;
speed = 3;
function RavenAtack(target) {
  if (follow) {
    raven.anims.play("ravenAtack", true);
    RotateSprite(target);
    const dx = CalculateVector(target.x, raven.x);
    const dy = CalculateVector(target.y, raven.y);
    raven.setVelocity(dx * speed, dy * speed);
    follow = false;
  }
}

t = 0;
function RavenStun(target) {
  if (ravenStuned) {
    if (t == 0) {
      t = TimerOn(totalTime, 2);
      raven.anims.play("ravenStuned", true);
    } else if (TimerOff(t, totalTime)) {
      raven.angle += speed;
    } else {
      ravenStuned = false;
      follow = true;
      t = 0;
      RavenAtack(target);
    }
  }
}

function RotateSprite(target) {
  raven.angle =
    (Phaser.Math.Angle.Between(raven.x, raven.y, target.x, target.y) * 180) /
    3.1415;
}
dead = false;
function RavenDead() {
  raven.disableBody(true, true);
  raven.angle = 0;
  timerRavenPana = TimerOn(totalTime, timeRespawn);
  ravenDontMove = true;
  ravenPana = true;
  ravenStuned = false;
  if (life <= 0) {
    dead = true;
  }
  life = 3;
  follow = true;
  SetSpawnedRaven(false);
  t = 0;
}

function RavenText2() {
  if (!canUse && raven.x <= 400) {
    canUse = true;
    return true;
  }
  return false;
}

function RavenText3() {
  if (!firstAtack && ravenStuned) {
    firstAtack = true;
    return true;
  }
  return false;
}

function RavenText4() {
  if (!firstDeadRaven && dead) {
    firstDeadRaven = true;
    return true;
  }
  return false;
}

function RavenIsActive() {
  return raven.body.enable;
}

function SetSpawnedRaven(spa) {
  spawned = spa;
}

function GetSpawnedRaven() {
  return spawned;
}

function StopRaven() {
  raven.setVelocity(0);
  if (!RavenIsActive() && !pause) {
    raven.enableBody(true, 770, 60, true, true);
  }
  raven.anims.stop();
  return true;
}

function VelocityRaven() {
  raven.setVelocity(-100, 0);
  raven.anims.play("ravenLeft", true);
  return false;
}
