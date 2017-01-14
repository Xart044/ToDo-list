import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {taskCreate} from '../actions/TaskActions'

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';

import './../styles/addTask.scss';

const style = {
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#F7F7F7',
        padding: '0 10px',
        justifyContent: 'space-between'
    },


};

let DateTimeFormat;
DateTimeFormat = global.Intl.DateTimeFormat;


class AddTask extends Component {
    constructor(props) {
        super(props);

        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear());
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            autoOk: false,
            disableYearSelection: false,
            text: '',
            value: null,
            date: ''
        };
    }


    handleChange = (event, index, value) => {
        if (value == 'add') {
            this.props.handleCategoryAdd();
        }
        else {
            this.setState({value: value})
        }

    };

    handleDateChange = (e, date) => {
        console.log(date.toLocaleDateString());
        this.setState({date: date});
    };

    handleChangeText = (e) => {
        this.setState({text: e.target.value})
    };

    handleAddTaskBtn = () => {
        let date = new Date();
        if (this.state.date) {
            date = this.state.date;
        }
        if (this.refs.task.getValue().trim().length!==0 && this.props.cat !== 'all') {
            this.props.taskCreate(this.props.cat, this.refs.task.getValue(), date);
            this.setState({text: ' ', date: ''})
        }
        else if (this.refs.task.getValue().trim().length!==0 && this.props.cat == 'all') {
            if (this.state.value != null) {
                this.props.taskCreate(this.state.value, this.refs.task.getValue(), date);
                this.setState({text: ' ', date: ''})
            }
        }
    };

    render() {
        return (
            <Paper style={style.paper} className="add-task_container">
                <TextField
                    className="add-task_text"
                    fullWidth={true}
                    hintText="New task"
                    value={this.state.text}
                    onChange={this.handleChangeText.bind(this)}
                    onKeyDown={(e) => {
                        if (e.keyCode == 13 && this.props.cat != 'all') {
                            if (this.refs.task.getValue()) {
                                this.props.taskCreate(this.props.cat, this.refs.task.getValue());
                                this.setState({text: ' '})
                            }
                        }
                    }}
                    floatingLabelText="New task"
                    type="text"
                    ref="task"
                    floatingLabelFixed={false}
                    required={true}
                />
                <div className="add-task_row">
                    <DatePicker
                        className='add-task_date'
                        hintText="Due date"
                        DateTimeFormat={DateTimeFormat}
                        locale="ru-RU"
                        value={this.state.date}
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        style={{marginLeft: 20, marginTop: 24}}
                        onChange={this.handleDateChange.bind(this)}
                    />
                    <SelectField
                        className='add-task_category'
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        ref="category"
                        floatingLabelText="Category"
                        style={{marginLeft: 20, display: this.props.visibility}}
                        autoWidth={true}
                    >
                        {
                            this.props.categories.map((el, ind) => {
                                if (el.id != 'all')
                                    return <MenuItem key={el.id} value={el.id} primaryText={el.name}/>
                            })
                        }
                        <MenuItem leftIcon={<ContentAdd />} value='add' primaryText='Add category'/>
                    </SelectField>
                    <FloatingActionButton onClick={() => this.handleAddTaskBtn()}>
                        <ContentAdd />
                    </FloatingActionButton>
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
        taskCreate: bindActionCreators(taskCreate, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);

