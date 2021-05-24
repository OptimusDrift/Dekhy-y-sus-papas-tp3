var speedMagicMissile = 3;

function CalculateVector(x, y) {
  return x - y;
}

function MagicMissile(proyectil, target) {
  const dx = CalculateVector(target.x, proyectil.x);
  const dy = CalculateVector(target.y, proyectil.y);
  proyectil.setVelocity(dx * speedMagicMissile * 3, dy * speedMagicMissile * 3);
}
