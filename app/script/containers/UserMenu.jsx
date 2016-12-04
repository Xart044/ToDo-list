//base
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleSignOut} from '../actions/UserActions'

//styles


//components
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SvgIcon from 'material-ui/SvgIcon';

const styles ={
	color: 'white'
};

const iconStyle = {
	color: '#ffffff'
};

class UserMenu extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
		<IconMenu
		iconButtonElement={
				<IconButton iconStyle={iconStyle}>
					<SvgIcon>
						<path 
							d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17
							5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5
							9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" 
						/>
					</SvgIcon>
				</IconButton>
			}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		>
			<MenuItem primaryText="Settings" />
			<MenuItem primaryText="Sign out" onClick={()=>this.props.handleSignOut()}/>
		</IconMenu>
    );
  }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}


function mapDispatchToProps(dispatch) {
    return {
        handleSignOut: bindActionCreators(handleSignOut, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);