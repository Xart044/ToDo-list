import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui/svg-icons/content/clear';


export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        depth: 1,
        scale: 'scale(1,1)',
        opacity: 0.6
    };

    paperOnMouseOver = () => this.setState({depth: 2});
    paperOnMouseOut = () => this.setState({depth: 1});

    iconOnMouseOver = () => this.setState({scale: 'scale(1.3,1.3)', opacity: 1});
    iconOnMouseOut = () => this.setState({scale: 'scale(1,1)', opacity: 0.6});

    render() {
        return (
            <Paper
                style={{padding: '20px', marginTop: '10px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                zDepth={this.state.depth}
                onMouseOver={this.paperOnMouseOver.bind(this)}
                onMouseOut={this.paperOnMouseOut.bind(this)}
            >
                <Checkbox
                    id={this.props.id}
                    style={{width: '90%'}}
                    label={this.props.text}
                    checked={this.props.checked}
                    labelStyle={{textDecoration: this.props.decoration}}
                    onCheck={(e, isChecked) => this.props.handleCheck(e, isChecked)}
                />
                <DeleteIcon
                    style={{transform: this.state.scale, opacity: this.state.opacity}}
                    onClick={()=>{this.props.handleDelete(this.props.id)}}
                    onMouseOver={this.iconOnMouseOver.bind(this)}
                    onMouseOut={this.iconOnMouseOut.bind(this)}
                />
            </Paper>
        );
    }
}