# Redux DevTools – VDiff Monitor

This is a very simple redux monitor that allows you to view the difference in state that occurred between two actions.

![Imgur](http://i.imgur.com/vjTiMFU.png)

### Installation Examples

See the Redux Devtools [documentation](https://github.com/gaearon/redux-devtools#create-a-devtools-component)
for full details about how to use monitors.

#### Standalone Monitor

To use VDiff Monitor by itself along with Redux Devtools, simply pass it to the `createDevTools` function directly.

Install from npm: `npm install --save-dev redux-devtools redux-devtools-vdiff-monitor`

```javascript
import React from 'react';
import { createDevTools } from 'redux-devtools';
import VDiffMonitor from 'redux-devtools-vdiff-monitor';

export default createDevTools(
  <VDiffMonitor />
);
```

### Usage

- new actions are appended to the select dropdowns
- Choose a `to action` and a `from action` to select a range in which to view a diff
- only the changed state is shown

### Credi
