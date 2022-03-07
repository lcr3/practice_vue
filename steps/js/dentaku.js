let displayMultiply = "×";
let multiply = "*";
let displayDivision = "÷";
let division = "/";
let equal = "=";
let clear = "C";

/**
 * 入力されたボタンの処理を実行し、結果を表示する
 * @type{button_object}
*/
function button_tapped(btn) {
  if (btn.value == equal) {
    document.dentaku.display.value = safeEval(document.dentaku.display.value);
  } else if (btn.value == clear) {
    document.dentaku.display.value = "";
  } else {
    if (btn.value == displayMultiply) {
      btn.value = multiply;
    } else if (btn.value == displayDivision) {
      btn.value = division;
    }
    document.dentaku.display.value += btn.value;
    document.dentaku.multi_btn.value = displayMultiply;
    document.dentaku.div_btn.value = displayDivision;
  }
}

/**
 * コマンドを文字列から生成して実行する
 * eval()非推奨なのでFunctionを使う
 * @type {string}
*/
function safeEval(val) {
  return Function('"use strict";return (' + val + ')')();
}