//base
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTasks, taskCreate, taskEdit, taskRemove} from '../actions/TaskActions'
//styles
import './../styles/categoryLayout.scss';
//components
import Task from '../components/Task'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';


class TasksListLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        text: ''
    };


    componentWillMount() {
        this.props.loadTasks(this.props.params.catId);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.catId != newProps.params.catId) {
            this.props.loadTasks(newProps.params.catId);
        }
    }

    renderTasks = (finished) => {
        if (finished) {
            if (this.props.task.tasks.length == 0) {
                return <div><img src="app/images/ring.svg"/></div>;
            }
            else if (this.props.task.tasks.length == 1) {
                return <div>There is no tasks here yet. Add some)</div>;
            }
            else if (this.props.task.tasks.length > 1) {
                return this.props.task.tasks.map((el, ind) => {
                    if (el.id != 'default') {
                        if (el.done == true) {
                            return <Task
                                key={el.id}
                                id={el.id}
                                text={el.text}
                                checked={el.done}
                                decoration="line-through"
                                handleCheck={this.handleCheck.bind(this)}
                                handleDelete={this.handleDelete.bind(this)}
                            />
                        }

                    }
                })
            }
        }
        else if (!finished) {
            return this.props.task.tasks.map((el, ind) => {
                if (el.id != 'default') {
                    if (el.done == false) {
                        return <Task
                            key={el.id}
                            id={el.id}
                            text={el.text}
                            checked={el.done}
                            decoration="none"
                            handleCheck={this.handleCheck.bind(this)}
                            handleDelete={this.handleDelete.bind(this)}
                        />
                    }
                }
            })
        }
    };


    handleChangeText = (e) => {
        this.setState({text: e.target.value})
    };

    handleCheck = (e, isChecked) => {
        this.props.taskEdit(this.props.params.catId, e.target.id, isChecked);
    };

    handleDelete = (id) => {
        console.log(this.props.params.catId);
        console.log(id);

        this.props.taskRemove(this.props.params.catId, id);
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', margin: '0 auto', padding: '0 10px'}}>
                <Paper style={{display: 'flex', alignItems: 'center', width: '100%', margin: '0 auto', backgroundColor: '#F7F7F7', padding: '0 10px'}}>
                    <TextField
                        hintText="New task"
                        value={this.state.text}
                        onChange={this.handleChangeText.bind(this)}
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                if (this.refs.task.getValue()) {
                                    this.props.taskCreate(this.props.params.catId, this.refs.task.getValue());
                                    this.setState({text: ' '})
                                }
                            }
                        }}
                        fullWidth={true}
                        floatingLabelText="New task"
                        type="text"
                        ref="task"
                        floatingLabelFixed={false}
                        required={true}
                    />
                    <FloatingActionButton
                        onClick={() => {
                            if (this.refs.task.getValue()) {
                                this.props.taskCreate(this.props.params.catId, this.refs.task.getValue());
                                this.setState({text: ' '})
                            }
                        }}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </Paper>
                {
                    this.renderTasks(false)
                }

                <Divider
                    inset={false}
                    style={{width: '100%', marginTop: 30, marginBottom: 20}}
                />

                {
                    this.renderTasks(true)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        task: state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTasks: bindActionCreators(loadTasks, dispatch),
        taskCreate: bindActionCreators(taskCreate, dispatch),
        taskEdit: bindActionCreators(taskEdit, dispatch),
        taskRemove: bindActionCreators(taskRemove, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListLayout);
