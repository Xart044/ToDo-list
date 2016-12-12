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


const paperStyle = {
    padding: '20px 40px',
    width: '32%',
    textAlign: 'center',
    position: 'relative',
    marginTop: 20,
    minWidth:350
};

const menuStyle = {
    position: 'absolute',
    right:0,
    top:0,
};

const badgeStyle = {
    position: 'absolute',
    right: 0,
    marginRight: 5,
    bottom:'-15px',

};


export default class Category extends Component {
    handleDelete = () => {
        this.props.deleteHandler(this.props.id);
    };

    handleEdit = () => {
        this.props.editHandler(this.props.id, this.props.name, this.props.description);
    };

    render() {
        return (
            <Paper style={paperStyle}>
                <IconMenu
                    style={menuStyle}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem onClick={this.handleEdit.bind(this)}><div className="category-menu-item"><EditIcon/>Edit</div></MenuItem>
                    <MenuItem onClick={this.handleDelete.bind(this)}><div className="category-menu-item"><DeleteIcon/> Delete</div></MenuItem>
                </IconMenu>
                <h1 className="category-header">{this.props.name}</h1>
                <p>{this.props.description}</p>
                <Badge

                    style={badgeStyle}
                    badgeContent={this.props.tasks}
                    primary={true}
                >
                    <TasksIcon />
                </Badge>
            </Paper>
        );
    }
}