import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TaskList from '../containers/tasks-list'
import './Layout.sass';

injectTapEventPlugin();

export default class Layout extends React.Component {
  render() {
    return (
<div><TaskList/></div>
    );
  }
}


