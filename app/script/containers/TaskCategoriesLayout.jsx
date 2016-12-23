//base
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadCategories, categoryRemove} from '../actions/CategoryActions'
//styles
import './../styles/categoryLayout.scss';
//components
import Category from '../components/Category'
import AddCategoryDialog from '../components/AddCategoryDialog'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const style = {
    addBtnStyle:{
        position: 'fixed',
        right: 10,
        bottom: 10,
        zIndex: 100,
    },
    noCategoryCont:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

};


class TaskCategoriesLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        dialog: '',
        id: '',
        name: '',
        description: '',
        title: ''
    };

    drawCategoryItem = () => {
        let categories = this.props.category.categories;
        if (categories.length > 1) {
            return categories.map((el, ind) => {
                let visible = el.id == 'all' ? 'hidden' : 'visible';
                return <Category
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    description={el.description}
                    tasks={el.tasks}
                    visibility={visible}
                    deleteHandler={this.props.categoryRemove}
                    editHandler={this.handleOpenEdit}/>
            })
        }
        else if (categories.length == 0) {
            return <div><img src="app/images/ring.svg"/></div>;
        }
        else if (categories.length == 1) {
            return <div style={style.noCategoryCont}>
                <Category
                    id={categories[0].id}
                    name={categories[0].name}
                    description={categories[0].description}
                    tasks={categories[0].tasks} visibility='hidden'
                    deleteHandler={this.props.categoryRemove}
                    editHandler={this.handleOpenEdit}/>
                <div>There is no categories here yet. Please, click <ContentAdd /> to add new category)</div>
            </div>;
        }
    };

    handleOpenAdd = () => {
        this.setState({open: true, dialog: 'add', title: 'Add category'});
    };

    handleOpenEdit = (id, name, description) => {
        this.setState({open: true, dialog: 'edit', id: id, name: name, description: description, title: 'Edit category'});
    };

    handleClose = () => {
        this.setState({open: false, dialog: '', id: '', name: '', description: ''});
    };

    componentWillMount() {
        this.props.loadCategories();
    }

    render() {
        return (
            <div className="category-layout-wrapper">
                <FloatingActionButton
                    style={style.addBtnStyle}
                    onClick={this.handleOpenAdd}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <div className="category-list-container">
                    {
                        this.drawCategoryItem()
                    }
                </div>
                <AddCategoryDialog
                    id={this.state.id}
                    open={this.state.open}
                    dialog={this.state.dialog}
                    title={this.state.title}
                    name={this.state.name}
                    description={this.state.description}
                    handleClose={this.handleClose.bind(this)}/>
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
        loadCategories: bindActionCreators(loadCategories, dispatch),
        categoryRemove: bindActionCreators(categoryRemove, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCategoriesLayout);
