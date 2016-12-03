//base
import React from 'react';
import {Link} from 'react-router';

//styles


//components
import NavBar from './NavBar';


export default class UserLayout extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>  
            <NavBar/>
            {this.props.children}
      </div>
    );
  }
}
