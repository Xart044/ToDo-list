import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Badge from 'material-ui/Badge';

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

            <Link to={`/tasks/${this.props.path}`} style={{textDecoration: 'none'}}>
                <MenuItem onTouchTap={()=>{this.props.handleClose()}}>
                    {this.props.name}
                    <Badge
                        style={{padding: '0 0 0 5px'}}
                        badgeStyle={{position: 'static'}}
                        badgeContent={this.props.tasks}
                        primary={true}
                    />
                </MenuItem>
            </Link>

        );
    }
}
