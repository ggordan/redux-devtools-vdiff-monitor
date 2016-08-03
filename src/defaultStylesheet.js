export default `
.react-tabs [role=tablist] {
  border-bottom: none;
  background: #212121;
  margin: 0;
  display: flex;
  white-space: nowrap;
  width: 100%;
  overflow: auto;
  padding: 0;
  -webkit-overflow-scrolling: touch;
}

.react-tabs [role=tab] {
  background: #323232;
  color: #fff;
  display: inline-block;
  margin: 3px;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;
}

.react-tabs [role=tab][aria-selected=true] {
  border-color: #aaa;
}

.react-tabs [role=tab][aria-disabled=true] {
  color: GrayText;
  cursor: default;
}

.current-previous-select {
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;

}

.current-previous-select > div {
  margin-right: 10px;
  flex: 1;
  width: 50%;
}

`;
