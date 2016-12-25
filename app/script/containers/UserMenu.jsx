//base
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {handleSignOut, loadPhoto} from '../actions/UserActions'
//styles
import './../styles/userMenu.scss';

//components
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SignOut from 'material-ui/svg-icons/action/power-settings-new';
import Settings from 'material-ui/svg-icons/action/settings';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    button: {
        margin: 12,
    },
    fileInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    iconBtn:{
        width: 40,
        height: 40,
        padding: 0
    },
    userMenuHeader:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    linearProgr:{
        width: '90%',
        margin: '0 auto'
    },
    menuItem:{
        paddingLeft: 60
    },
    dialogBody:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

};

class UserMenu extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    
    state = {
        file: '',
        openMenu: false,
        openDialog: false,
        tasksAll: '',
        tasksLeft: ''
    }

    handleTouchTap = (event) => {
        event.preventDefault();
        this.tasksCount();
        this.setState({
            openMenu: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            openMenu: false,
        });
    };

    tasksCount = () => {
        let tasks = this.props.categories.find((el) => {
            return el.id == 'all';
        });
        this.setState({tasksAll: tasks.allTasks, tasksLeft: tasks.tasks});
    };

    handleClose = () => {
        this.setState({
            openDialog: false,
        });
    }

    openAvatarAdd = () => {
        this.setState({
            openDialog: true,
            openMenu: false
        });
    }

    saveAvatar = () => {
        let file = this.refs.avatarImg.files[0];
        let preview = document.getElementById('img');
        if(file){
            let typeStr = file.type.substring(0, file.type.indexOf('/'));
            if (typeStr == 'image') {
                this.handleClose();
                this.props.loadPhoto(file);
            }
            else {
                preview.innerHTML = 'You can upload only images';
            }
        }
        else{
            preview.innerHTML = 'You haven\'t choosen any images';
        }
    }

    showPreview = (e) => {
        let file = e.target.files[0];
        let preview = document.getElementById('img');
        preview.innerHTML = '';
        let img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img);
        let reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }

    renderAvatar = (type) => {
        if (this.props.user.photo == 'no') {
            if (type == 'small') {
                return <Avatar>{this.props.user.name.charAt(0)}</Avatar>
            }
            else if (type == 'big') {
                return <Avatar size={50} className='avatar' onClick={() => {
                    this.openAvatarAdd()
                }}>{this.props.user.name.charAt(0)}</Avatar>
            }
        }
        else {
            if (type == 'small') {
                return <Avatar src={this.props.user.photo}/>
            }
            else if (type == 'big') {
                return <Avatar className='avatar' size={50} src={this.props.user.photo} onClick={() => {
                    this.openAvatarAdd()
                }}/>
            }
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {
                    this.handleClose()
                }}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {
                    this.saveAvatar()
                }}
            />,
        ];

        return (
            <div>
                <IconButton onTouchTap={this.handleTouchTap} style={styles.iconBtn}>
                    {this.renderAvatar('small')}
                </IconButton>
                <Popover
                    open={this.state.openMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <div style={styles.userMenuHeader}>
                        <div style={{padding: '10px 0 0 10px'}}>
                            {this.renderAvatar('big')}
                        </div>
                        <div style={{padding: 10}}>
                            <span style={{fontWeight: 'bold'}}>
                                {this.props.user.name} {this.props.user.surname}
                                </span><br/>
                            All tasks: {this.state.tasksAll}<br/> Unfinished tasks: {this.state.tasksLeft}
                        </div>
                    </div>
                    <LinearProgress
                        style={styles.linearProgr}
                        mode="determinate"
                        min={0}
                        max={+this.state.tasksAll}
                        value={this.state.tasksAll - this.state.tasksLeft}
                    />
                    <Divider style={{marginTop: '5px'}}/>
                    <Menu autoWidth={true}>
                        <Link to='/settings' style={{textDecoration: 'none'}}><MenuItem leftIcon={<Settings/>} primaryText="Settings" innerDivStyle={styles.menuItem}/></Link>
                        <MenuItem leftIcon={<SignOut/>} primaryText="Sign out" innerDivStyle={styles.menuItem} onClick={() => this.props.handleSignOut()}/>
                    </Menu>
                </Popover>
                <Dialog
                    title='Add avatar'
                    contentStyle={{width: '30%'}}
                    bodyStyle={styles.dialogBody}
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={() => this.handleClose()}>
                    <RaisedButton
                        label="Choose an Image"
                        primary={true}
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label"
                    >
                        <input style={styles.fileInput} type="file" ref="avatarImg" onChange={(e) => this.showPreview(e)}/>
                    </RaisedButton>
                    <div id="img"></div>
                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        categories: state.category.categories
    }
}


function mapDispatchToProps(dispatch) {
    return {
        handleSignOut: bindActionCreators(handleSignOut, dispatch),
        loadPhoto: bindActionCreators(loadPhoto, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);