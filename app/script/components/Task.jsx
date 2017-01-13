import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {taskEdit, taskRemove} from '../actions/TaskActions';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import './../styles/taskItem.scss';

const style = {
    taskItem: {
        padding: '20px',
        marginTop: '10px',
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
};


class Task extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        depth: 1,
        scale: 'scale(1,1)',
        opacity: 0.6,
        color: 'black'
    };

    paperOnMouseOver = () => this.setState({depth: 2});
    paperOnMouseOut = () => this.setState({depth: 1});

    iconOnMouseOver = () => this.setState({scale: 'scale(1.3,1.3)', opacity: 1});
    iconOnMouseOut = () => this.setState({scale: 'scale(1,1)', opacity: 0.6});

    componentDidMount() {
        if (new Date(this.props.date).toLocaleDateString() < new Date().toLocaleDateString() && !this.props.checked) {
            this.setState({color: 'red'});
        }
        else {
            this.setState({color: 'black'});
        }
    }

    handleCheck = (e, isChecked, catId) => {
        this.props.taskEdit(catId, e.target.id, isChecked);
    };

    handleDelete = (catId, id) => {
        this.props.taskRemove(catId, id);
    };


    render() {
        return (
            <Paper
                style={style.taskItem}
                zDepth={this.state.depth}
                onMouseOver={this.paperOnMouseOver.bind(this)}
                onMouseOut={this.paperOnMouseOut.bind(this)}
            >
                <div style={{width: '100%'}}>
                    <Checkbox
                        className="task-item-checkbox"
                        id={this.props.id}
                        label={this.props.text}
                        checked={this.props.checked}
                        labelStyle={{textDecoration: this.props.decoration}}
                        onCheck={(e, isChecked) => this.handleCheck(e, isChecked, this.props.catId)}
                    />
                </div>
                <div className="task-item-info">
                    <div style={{color: this.state.color}}>{new Date(this.props.date).toLocaleDateString()}</div>
                    <DeleteIcon
                        style={{transform: this.state.scale, opacity: this.state.opacity}}
                        onClick={() => {
                            this.handleDelete(this.props.catId, this.props.id)
                        }}
                        onMouseOver={this.iconOnMouseOver.bind(this)}
                        onMouseOut={this.iconOnMouseOut.bind(this)}
                    />
                </div>
            </Paper>
        );
    }
}


function mapStateToProps(state) {
    return {
        some: ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskEdit: bindActionCreators(taskEdit, dispatch),
        taskRemove: bindActionCreators(taskRemove, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
