timer = 0;
function Clock(delta) {
  timer += delta;
  if (timer > 20) {
    timer -= 20;
    return 0.02;
  }
  return 0;
}

function TimerOn(actualTime, finalInSeconds) {
  return actualTime + finalInSeconds;
}
function TimerOff(actualTime, finalTime) {
  return actualTime >= finalTime;
}

function ResetClock() {
  timer = 0;
}
