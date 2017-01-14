import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {categoryCreate, categoryEdit} from '../actions/CategoryActions'


class AddCategoryDialog extends Component {

    state = {
        name: '',
        description: '',
        title: ''
    };

    componentWillReceiveProps(newProps) {
        this.setState({name: newProps.name, description: newProps.description})
    }


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

    handleCloseAndSave = () => {
        if (this.props.dialog == 'add' && this.refs.name.getValue().length!==0) {
            this.props.categoryCreate(this.refs.name.getValue(), this.refs.description.getValue());
            this.props.handleClose();
        }
        else if (this.props.dialog == 'edit' && this.refs.name.getValue().length!==0) {
            this.props.categoryEdit(this.props.id, this.refs.name.getValue(), this.refs.description.getValue());
            this.props.handleClose();
        }
    };


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.props.handleClose()}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCloseAndSave}
            />,
        ];

        return (
            <Dialog
                title={this.props.title}
                contentStyle={{width: '30%'}}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => this.props.handleClose()}
            >
                <div className="category-add-form">
                    <TextField
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
        categoryCreate: bindActionCreators(categoryCreate, dispatch),
        categoryEdit: bindActionCreators(categoryEdit, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryDialog);