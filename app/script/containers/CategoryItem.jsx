import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';

export default class CategoryItem extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
	    /**
	   * fix: create category component where you can operate your tasks
	   * and then change route to <Link to={`/category/${el.id}`}> instead of <Link to={`/user/${el.id}`}>
	   */
      <Link to={`/user/${this.props.path}`}><MenuItem onTouchTap={this.handleClose}>{this.props.name}</MenuItem></Link>
    );
  }
}
