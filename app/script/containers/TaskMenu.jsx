//base
import React from 'react';
import {Link} from 'react-router';

//styles



//components
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';

const style = {
	height: ''
};
const iconStyle = {
	color: '#ffffff'
};
const TaskIcon = () => (
  <SvgIcon style={iconStyle}>
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0
     1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1
      .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </SvgIcon>
);
export default class TaskMenu extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
		<IconButton 
			onTouchTap={this.handleToggle.bind(this)}
			tooltip="Your Task Categories"
	      	tooltipPosition="bottom-right"
		>
			<TaskIcon />
		</IconButton>

        <Drawer
			docked={false}
			width={200}
			open={this.state.open}
			onRequestChange={(open) => this.setState({open})}
        >
			<MenuItem onTouchTap={this.handleClose}>Task Category</MenuItem>
			<MenuItem onTouchTap={this.handleClose}>Task Category 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
