var potatoPoints = 1;
var goldPotatoPoints = 5;
var score = 0;

function TriggerEvent() {
  if (!canTalk) {
    canTalk = true;
  }
  if (!RavenIsActive()) {
    SetSpawnedRaven(true);
  }
}

function collectPotato(player, potato) {
  potato.disableBody(true, true);
  AddPoints(potatoPoints);
  if (PotatoZero()) {
    SpawnPotato();
  }
}
function collectGoldPotato(player, goldPotato) {
  goldPotato.disableBody(true, true);
  AddPoints(goldPotatoPoints);
  PotatoZero();
}

function collectBigPotato(player, papasGrandes) {
  papasGrandes.disableBody(true, true);
  AddPoints(potatoPoints * 2);
  if (PotatoZero()) {
    SpawnPotato();
  }
}

function resetPoints() {
  score = 0;
}

function AddPoints(points) {
  score += points;
  scoreText.setText(txtScore + score);
}

function SpawnPotato() {
  TriggerEvent();
  papas.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
  });

  papasGrandes.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
  });
}

function PotatoZero() {
  if (score >= 50) {
    endGame = 1;
    gameOver = true;
  }
  return papas.countActive(true) === 0 && papasGrandes.countActive(true) == 0;
}

function SetPotatoGravity(bool) {
  papas.children.iterate(function (child) {
    child.body.setAllowGravity(bool);
  });
  papasGrandes.children.iterate(function (child) {
    child.body.setAllowGravity(bool);
  });
  goldPotato.body.setAllowGravity(bool);
}

function SetPotatoVelocity(x) {
  papas.children.iterate(function (child) {
    child.body.setVelocity(x);
  });
  papasGrandes.children.iterate(function (child) {
    child.body.setVelocity(x);
  });
  goldPotato.body.setVelocity(x);
}
