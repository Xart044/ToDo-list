//base
import React from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadCategories,categoryCreate,categoryRemove} from '../actions/CategoryActions'
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/clear';
//styles

//components
import TextField from 'material-ui/TextField';

class TaskCategoriesLayout extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.loadCategories();
    }

    render() {

        return (
            <div>
                <FloatingActionButton onClick={()=>this.props.categoryCreate(this.refs.name.getValue(),this.refs.description.getValue())}>
                    <ContentAdd />
                </FloatingActionButton>
                <TextField
                           hintText="name"
                           floatingLabelText="name"
                           type="name"
                           ref="name"
                           floatingLabelFixed={false}
                           required={true}
                />
                <TextField
                           hintText="description"
                           floatingLabelText="description"
                           type="description"
                           ref="description"
                           floatingLabelFixed={false}
                           required={true}
                />
                <div>
                    {
                        this.props.category.categories.map((el,ind) => {
                            return <div>
                                <div key={el.id} data-catId={el.id}>{el.name} - {el.description} - {el.tasks} </div>
                                    <FloatingActionButton key={ind} mini={true} onClick={()=>this.props.categoryRemove(el.id)}>
                                        <ContentRemove />
                                    </FloatingActionButton>
                                </div>
                        })
                    }
                </div>
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
        categoryRemove: bindActionCreators(categoryRemove, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCategoriesLayout);
