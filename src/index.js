import React, { PropTypes, Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
Tabs.setUseDefaultStyles(false);
import JDP from 'jsondiffpatch';
import jsondiffpatchHtmlFormatter from 'jsondiffpatch/src/formatters/html';
import { ActionCreators } from 'redux-devtools';
import injectCSS from './injectCSS';

import diffStylesheet from './diffStylesheet';
import defaultStylesheet from './defaultStylesheet';

const jsondiffpatch = JDP.create();
const { jumpToState } = ActionCreators;

injectCSS(diffStylesheet);
injectCSS(defaultStylesheet);

export default class Monitor extends Component {
  static update = () => {};

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.object,
    actionsById: PropTypes.object,
    currentStateIndex: PropTypes.number,
    stagedActionIds: PropTypes.array,
    skippedActionIds: PropTypes.array,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      previous: 0,
    };
  }

  getVisibleTabs() {
    const { computedStates, currentStateIndex } = this.props;
    return Object.keys(computedStates[currentStateIndex].state).map(reducerName => {
      const current = computedStates[currentStateIndex].state[reducerName] || {};
      const previous = computedStates[this.state.previous].state[reducerName] || {};
      const delta = jsondiffpatch.diff(previous, current);
      const renderedDiff = jsondiffpatchHtmlFormatter.format(delta, current);
      return {
        diff: renderedDiff,
        reducer: reducerName,
        hasChanged: !!delta,
      };
    }).filter(x => x.hasChanged);
  }

  renderTabs(tabs) {
    return (
      <TabList>
        {tabs.map(tab => <Tab>{tab.reducer}</Tab>)}
      </TabList>
    );
  }

  renderPanels(tabs) {
    return tabs.map(tab => {
      return (
        <TabPanel key={tab.reducer}>
          <div dangerouslySetInnerHTML={{ __html: tab.diff }} />
        </TabPanel>
      );
    });
  }

  renderActions(selected, action) {
    const { actionsById } = this.props;
    return (
      <select value={selected} onChange={(evt) => action(evt.target.value)}>
        {Object.keys(actionsById).map(actionIndex => <option value={actionIndex}>{actionsById[actionIndex].action.type}</option>)}
      </select>
    );
  }

  render() {
    const tabs = this.getVisibleTabs();
    return (
      <div>
        <div className="current-previous-select">
          <div>
            <p> From action </p>
            {this.renderActions(this.state.previous, (previous) => this.setState({ previous }))}
          </div>
          <div>
            <p> To action </p>
            {this.renderActions(this.props.currentStateIndex, (index) => this.props.dispatch(jumpToState(+index)))}
          </div>
        </div>
        <Tabs sty>
        {this.renderTabs(tabs)}
        {this.renderPanels(tabs)}
        </Tabs>
      </div>
    );
  }
}
