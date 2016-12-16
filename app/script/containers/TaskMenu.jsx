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
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';

const style = {
    height: ''
};
const iconStyle = {
    color: '#ffffff'
};
const TaskIcon = () => (
    <NavMenuIcon style={iconStyle}/>
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
