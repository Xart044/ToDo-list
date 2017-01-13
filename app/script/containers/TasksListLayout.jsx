//base
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTasks, offTaskListener, clearTasks} from '../actions/TaskActions'
import {setFilter} from '../actions/visibilityFilter'
//styles
import './../styles/categoryLayout.scss';
//components
import Task from '../components/Task'
import AddTask from '../components/AddTask'
import Divider from 'material-ui/Divider';
import AddCategoryDialog from '../components/AddCategoryDialog'
import FlatButton from 'material-ui/FlatButton';

const style = {
    taskContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        margin: '0 auto',
        padding: '0 10px',
        marginBottom: '30px0'
    },
    divider: {
        width: '100%',
        marginTop: 30,
        marginBottom: 20
    },
};

class TasksListLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        text: '',
        visibility: 'none'
    };


    componentWillMount() {
        if (this.props.params.catId == 'all') {
            this.setState({visibility: 'block'})
        }
        this.props.loadTasks(this.props.params.catId);

    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.catId != newProps.params.catId) {
            if (newProps.params.catId == 'all') {
                this.setState({visibility: 'block'})
            }
            else {
                this.setState({visibility: 'none'})
            }
            this.props.offTaskListener(this.props.params.catId);
            this.props.setFilter('ALL');
            this.props.loadTasks(newProps.params.catId);
        }
    }

    componentWillUnmount() {
        this.props.clearTasks();
    }

    renderTasks = () => {
        if (this.props.taskLength == 0) {
            return <div><img src="app/images/ring.svg"/></div>;
        }
        else if (this.props.taskLength == 1) {
            return <div>There is no tasks here yet. Add some)</div>;
        }
        else if (this.props.taskLength > 1) {
            return <div style={{width: '100%'}}>
                {
                    this.props.unfinishedTasks.map((el, ind) => {
                        if (el.id != 'default') {
                            return <Task
                                key={el.id}
                                id={el.id}

                                catId={el.catId ? el.catId : this.props.params.catId}
                                text={el.text}
                                date={el.date}
                                checked={el.done}
                                decoration="none"
                            />
                        }
                    })
                }
                <Divider
                    inset={false}
                    style={style.divider}
                />
                {
                    this.props.finishedTasks.map((el, ind) => {
                        if (el.id != 'default') {
                            return <Task
                                key={el.id}
                                id={el.id}
                                catId={el.catId ? el.catId : this.props.params.catId}
                                text={el.text}
                                date={el.date}
                                checked={el.done}
                                decoration="line-through"

                            />
                        }
                    })
                }
            </div>
        }
    };


    handleClose = () => {
        this.setState({open: false});
    };

    handleCategoryAdd = () => {
        this.setState({open: true});
    };

    handleFilterBtn = (e, filter) => {
        this.props.setFilter(filter);
    };

    render() {
        return (
            <div style={style.taskContainer} className="task-layout-container">
                <AddTask
                    categories={this.props.categories}
                    visibility={this.state.visibility}
                    cat={this.props.params.catId}
                    handleCategoryAdd={this.handleCategoryAdd.bind(this)}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}>
                    <FlatButton className="filterBtn" onClick={(e) => {
                        this.handleFilterBtn(e, 'ALL');
                    }} label="All"/>
                    <FlatButton className="filterBtn" onClick={(e) => {
                        this.handleFilterBtn(e, 'TODAY');
                    }} label="Today"/>
                    <FlatButton className="filterBtn" onClick={(e) => {
                        this.handleFilterBtn(e, 'TOMORROW');
                    }} label="Tomorrow"/>
                    <FlatButton className="filterBtn" onClick={(e) => {
                        this.handleFilterBtn(e, 'WEEK');
                    }} label="Week"/>
                </div>
                {
                    this.renderTasks()
                }
                <AddCategoryDialog
                    id=''
                    open={this.state.open}
                    dialog='add'
                    title='Add category'
                    name=''
                    description=''
                    handleClose={this.handleClose.bind(this)}/>
            </div>
        );
    }
}

function filterTasks(tasks, filter) {
    let filteredTasks = [];
    let sortedTasks = {};
    let today = new Date();
    switch (filter) {
        case 'ALL':
            filteredTasks = tasks
                .sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
            break;
        case 'TODAY':
            filteredTasks = tasks
                .filter((e) => {
                    return new Date(e.date).toLocaleDateString() == new Date().toLocaleDateString();
                });
            break;
        case 'TOMORROW':
            today = new Date();
            let tomorrow = today.setDate(today.getDate() + 1);
            filteredTasks = tasks
                .filter((e) => {
                    return new Date(e.date).toLocaleDateString() == new Date(tomorrow).toLocaleDateString();
                });
            break;
        case 'WEEK':
            today = new Date();
            let weekstart = today.getDate() - today.getDay() + 1;
            let weekend = weekstart + 6;
            let sunday = new Date(today.setDate(weekend));
            today = new Date();
            filteredTasks = tasks
                .filter((e) => {
                    return new Date(e.date).toLocaleDateString() <= sunday.toLocaleDateString()
                        && new Date(e.date).toLocaleDateString() >= today.toLocaleDateString();
                }).sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
            break;
    }
    sortedTasks.unfinished = filteredTasks
        .filter((el) => {
            return !el.done
        });
    sortedTasks.finished = filteredTasks
        .filter((el) => {
            return !!el.done
        });
    return sortedTasks;
}

function mapStateToProps(state) {
    let tasksArr = state.tasks.tasks;
    let filterType = state.visibilityFilter.filterType;
    let filteredTasks = filterTasks(tasksArr, filterType);
    let finishedTasks = filteredTasks.finished;
    let unfTasks = filteredTasks.unfinished;

    return {
        finishedTasks: finishedTasks,
        unfinishedTasks: unfTasks,
        taskLength: tasksArr.length,
        categories: state.category.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTasks: bindActionCreators(loadTasks, dispatch),
        offTaskListener: bindActionCreators(offTaskListener, dispatch),
        clearTasks: bindActionCreators(clearTasks, dispatch),
        setFilter: bindActionCreators(setFilter, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListLayout);
