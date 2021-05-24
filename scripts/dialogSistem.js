speedOriginal = 0.08;
speedFast = 0;
actualSpeed = 0.08;
var dialogs;
var i = 0;
var initD = true;

function LoadDialogs(dialogsArray) {
  dialogs = dialogsArray;
  i = 0;
  tiempC = 0;
  delayDialog = 0;
  ResetText();
  val = 31;
}

function InitDialog() {
  if (keyF.isDown) {
    i = dialogs.length + 1;
  }
  if (i < dialogs.length && initD) {
    txt.setFontStyle(dialogs[i][1]);
    ShowDialog(dialogs[i][0]);
  }
  i += NextDialog();
  if (i >= dialogs.length) {
    DisableDialogBox();
    return true;
  }
  return false;
}

function ShowDialog(string) {
  SkipText();
  if (!txtInit) {
    EnableDialogBox();
    txtInit = true;
    index = 0;
  }
  var x = "";
  txt.alpha = 1;
  if (Shoot()) {
    if (index < string.length) {
      tiempC = TimerOn(totalTime, actualSpeed);
      timerOn = true;
      if (index == val) {
        if (string[index] == " ") {
          x = "\n";
        } else if (string[index + 1] == " ") {
          x = "\n";
          index++;
        } else {
          x = "-\n";
        }
        val += 31;
      }
      txt.setText(txt.text + string[index] + x);
      index++;
      return false;
    }
    ResetText();
    keyZSprite.setVisible(true);
    initD = false;
    return true;
  }
}
var index;
function Shoot() {
  if (tiempC >= totalTime) {
    return false;
  }
  timerOn = false;
  return true;
}
function ResetText() {
  val = 30;
  txtFin = false;
  initD = true;
  txtInit = false;
  skipingText = false;
  actualSpeed = speedOriginal;
  delayDialog = TimerOn(totalTime, 0.2);
  keyZSprite.setVisible(false);
}

function DisableDialogBox() {
  keyZSprite.setVisible(false);
  txt.alpha = 0;
  uiText.setVisible(false);
}

function EnableDialogBox() {
  txt.alpha = 1;
  txt.text = "";
  uiText.setVisible(true);
}

var delayDialog = 0;
var skipingText = false;
function SkipText() {
  if (keyZ.isDown && !skipingText) {
    actualSpeed = speedFast;
    skipingText = true;
  }
}

function NextDialog() {
  if (keyZ.isDown && !txtInit && TimerOff(totalTime, delayDialog)) {
    ResetText();
    initD = true;
    return 1;
  }
  return 0;
}
