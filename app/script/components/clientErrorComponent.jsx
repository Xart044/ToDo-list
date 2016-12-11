import React from 'react';

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
      <div>404 error, wrong route</div>
    );
  }
}
