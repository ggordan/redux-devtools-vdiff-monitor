import React from 'react';
import { createDevTools } from 'redux-devtools';
import VDiffMonitor from 'redux-devtools-vdiff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <VDiffMonitor />
  </DockMonitor>
);
