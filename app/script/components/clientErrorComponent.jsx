import React from 'react';

const errorMessag = `404 error \n wrong route`;
export default class clientErrorComponent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
    	/**
    	 * TODO: make more UXier :D
    	 */
      <div style={{'height':'100vh','display':'flex','flexDirection':'column','justifyContent':'center','alignItems':'center'}}>
        <div style={{'fontSize':'60px','lineHeight':'60px','textAlign':'center'}}>{errorMessag}</div>        
      </div>
    );
  }
}
