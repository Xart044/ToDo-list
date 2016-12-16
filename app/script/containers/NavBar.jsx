// base
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

//styles

//components
import UserMenu from './UserMenu';
import TaskMenu from './TaskMenu';
import AppBar from 'material-ui/AppBar';

class UserLayout extends React.Component {
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
                title={this.props.user.name + '`s tasks'}
                iconElementLeft={<TaskMenu/>}
                iconElementRight={<UserMenu/>}
            />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);

