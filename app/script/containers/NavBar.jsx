// base
import React from 'react';
import {Link} from 'react-router';

//styles

//components
import UserMenu from './UserMenu';
import TaskMenu from './TaskMenu';
import AppBar from 'material-ui/AppBar';

export default class UserLayout extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>  
            <AppBar
                iconElementLeft={<TaskMenu/>}
                iconElementRight={<UserMenu/>}
            />
      </div>
    );
  }
}