export default (cssString) => {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  const head = document.getElementsByTagName('head')[0];
  head.insertBefore(style, head.firstChild);
  style.appendChild(document.createTextNode(cssString));
};
