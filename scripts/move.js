at = true;
timeCooldown = 5;
v = 250;
xt = 6;
function Move(delta) {
  if (cursors.left.isDown) {
    player.setVelocityX(-v);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(v);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
  if (canUse) {
    xt += Clock(delta);
    if (xt <= timeCooldown) {
      MissilText.setText(txtMissil + parseInt(timeCooldown + 1 - xt));
    } else {
      MissilText.setText(txtMissil + "Preparado.");
    }
    if (!at && TimerOff(totalTime, tmp)) {
      at = true;
    }
    if (keyX.isDown && at && RavenIsActive()) {
      console.log("a");
      magicMisil.enableBody(true, player.x, player.y, true, true);
      tmp = TimerOn(totalTime, timeCooldown);
      xt = 0;
      at = false;
    } else {
      MagicMissile(magicMisil, raven);
    }
  }
}

function ResetMov() {
  tmp = 0;
}
