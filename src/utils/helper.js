export const copyText = (txt) => {
  var textField = document.createElement("textarea");
  textField.innerText = txt;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};
