//base
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadCategories, categoryCreate, categoryRemove, categoryEdit} from '../actions/CategoryActions'
//styles
import './../styles/categoryLayout.scss';
//components
import TextField from 'material-ui/TextField';
import Category from '../components/Category'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const addBtnStyle = {
    position: 'fixed',
    right: 10,
    bottom: 10,
    zIndex:100,
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
        title:''
    };

    drawCategoryItem = () => {

        if (this.props.category.categories.length>1) {
            return this.props.category.categories.map((el, ind) => {
                if(el.id!='default'){
                    return <Category key={el.id} id={el.id} name={el.name} description={el.description} tasks={el.tasks} deleteHandler={this.props.categoryRemove} editHandler={this.handleOpenEdit}/>
                }
            })
        }
        else if(this.props.category.categories.length==0) {
            return <div><img src="app/images/ring.svg"/></div>;
        }
        else if(this.props.category.categories.length==1) {
            return <div>There is no categories here yet. Please, click <ContentAdd /> to add new category)</div>;
        }
    };

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
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

    handleCloseAndSave = () => {
        if (this.state.dialog == 'add') {
            this.props.categoryCreate(this.refs.name.getValue(), this.refs.description.getValue());
            this.handleClose();
        }
        else if (this.state.dialog == 'edit') {
            this.props.categoryEdit(this.state.id, this.refs.name.getValue(), this.refs.description.getValue());
            this.handleClose();
        }
    };



    componentWillMount() {
        this.props.loadCategories();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCloseAndSave}
            />,
        ];

        return (
            <div className="category-layout-wrapper">
                <FloatingActionButton
                    style={addBtnStyle}
                    onClick={this.handleOpenAdd}
                >
                    <ContentAdd />
                </FloatingActionButton>

                <div className="category-list-container">

                    {
                        this.drawCategoryItem()
                    }
                </div>

                <Dialog
                    title={this.state.title}
                    contentStyle={{width: '30%'}}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="category-add-form"><TextField
                        value={this.state.name}
                        onChange={this.handleChangeName.bind(this)}
                        hintText="Category name"
                        floatingLabelText="Category name"
                        type="name"
                        ref="name"
                        floatingLabelFixed={false}
                        required={true}
                    />
                        <TextField
                            value={this.state.description}
                            onChange={this.handleChangeDescription.bind(this)}
                            floatingLabelText="Category description"
                            type="description"
                            ref="description"
                            floatingLabelFixed={false}
                            required={true}
                            multiLine={true}
                            rows={2}
                        /></div>
                </Dialog>
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
        categoryCreate: bindActionCreators(categoryCreate, dispatch),
        categoryRemove: bindActionCreators(categoryRemove, dispatch),
        categoryEdit: bindActionCreators(categoryEdit, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCategoriesLayout);
