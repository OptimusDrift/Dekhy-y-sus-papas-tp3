function GameOver(gameOver, game) {
  if (gameOver) {
    ResetMov();
    ResetClock();
    RavenDead();
    resetPoints();
    game.scene.start("gameOver");
  }
  return false;
}
