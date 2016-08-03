"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  .react-tabs [role=tablist]: {\n    border-bottom: none;\n    background: #212121;\n    margin: 0;\n    display: flex;\n    whiteSpace: nowrap;\n    width: 100%;\n    overflow: auto;\n    WebkitOverflowScrolling: touch;\n  };\n\n  .react-tabs [role=tab]: {\n    border: none;\n    bottom: 0;\n    padding: 10px;\n    color: #ffffff;\n  };\n\n  .react-tabs [role=tab][aria-selected=true]: {\n    font-weight: bold;\n    border-radius: 0;\n  };\n\n  .current-previous-select: {\n    display: flex;\n    margin: 10px;\n    justify-content: center;\n  };\n\n  .current-previous-select div: {\n    margin-right: 10px;\n    flex: 1;\n    max-width: 45%;\n  };\n";