import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {taskClick} from '../actions/task-click-action';

class TaskList extends Component{
    showTasks(){
        return this.props.tasks.map((elem) => {
            return <li onClick={() => this.props.taskClick(elem)} key={elem.id}>{elem.description}</li>;
        });
    }
    render(){
        return (
            <ul>
                {this.showTasks()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({taskClick: taskClick}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskList);
