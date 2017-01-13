import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TasksIcon from 'material-ui/svg-icons/notification/event-note';
import {Link} from 'react-router';

const style = {
    paper: {
        padding: '20px 40px',
        width: '32%',
        textAlign: 'center',
        position: 'relative',
        marginTop: 20,
        minWidth: 320
    },
    badge: {
        position: 'absolute',
        right: 0,
        marginRight: 5,
        bottom: '-15px',
    },
    link: {
        textDecoration: 'none',
        width: '100%',
        color: 'black',
        display: 'block',
        height: '100%'
    }
}


export default class Category extends Component {
    handleDelete = () => {
        this.props.deleteHandler(this.props.id);
    };

    handleEdit = () => {
        this.props.editHandler(this.props.id, this.props.name, this.props.description);
    };

    render() {
        return (

            <Paper style={style.paper}>
                <IconMenu
                    style={{position: 'absolute', right: 0, top: 0, visibility: this.props.visibility}}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem onClick={this.handleEdit.bind(this)}>
                        <div className="category-menu-item"><EditIcon/> Edit</div>
                    </MenuItem>
                    <MenuItem onClick={this.handleDelete.bind(this)}>
                        <div className="category-menu-item"><DeleteIcon/> Delete</div>
                    </MenuItem>
                </IconMenu>
                <Link
                    to={`/tasks/${this.props.id}`}
                    style={style.link}
                    activeStyle={{color: 'black'}}
                >
                    <h1 className="category-header">{this.props.name}</h1>
                    <p>{this.props.description}</p>
                    <Badge
                        style={style.badge}
                        badgeContent={this.props.tasks}
                        primary={true}
                    >
                        <TasksIcon />
                    </Badge>
                </Link>
            </Paper>

        );
    }
}