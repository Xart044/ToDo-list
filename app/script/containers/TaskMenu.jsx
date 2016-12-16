//base
import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadCategories} from '../actions/CategoryActions'
import {loadTasks} from '../actions/TaskActions'
//styles


//components
import CategoryItem from './CategoryItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

const style = {
    height: ''
};
const iconStyle = {
    color: '#ffffff'
};
const TaskIcon = () => (
    <SvgIcon style={iconStyle}>
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0
     1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1
      .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </SvgIcon>
);
class TaskMenu extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    componentDidMount() {
        this.props.loadCategories();
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <IconButton
                    onTouchTap={this.handleToggle.bind(this)}
                    tooltip="Your Task Categories"
                    tooltipPosition="bottom-right"
                >
                    <TaskIcon />
                </IconButton>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar title="Categories" showMenuIconButton={false}/>
                    {
                        this.props.category.categories.map((el, ind) => {
                            if (el.id != 'default') {
                                return <CategoryItem
                                    key={el.id}
                                    path={el.id}
                                    name={el.name}
                                    tasks={el.tasks}
                                    handleClose={this.handleClose.bind(this)}
                                />
                            }
                        })
                    }
                </Drawer>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        category: state.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCategories: bindActionCreators(loadCategories, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskMenu);
