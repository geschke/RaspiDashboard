
//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
//var MainSection = require('./MainSection.react');
var React = require('react');
var DiagramStore = require('../stores/DiagramStore');
var RangeChooser = require('./rangechooser.jsx');
var rangeElements = require('./rangeelements.jsx');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getDiagramState() {
      console.log("in getDiagramState");
  return {
      startDate: DiagramStore.getStartDate(),
      endDate: DiagramStore.getEndDate()
  };
}

var DiagramApp = React.createClass({

  getInitialState: function() {
        console.log("in getInitialState");
    return getDiagramState();
  },

  componentDidMount: function() {
    DiagramStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DiagramStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
        console.log("in render");
  	return (
                 <div>
        <RangeChooser startDate={this.state.startDate} endDate={this.state.endDate} rangeElements={rangeElements}/>
      </div>
                
  	);
  },

  /**
   * Event handler for 'change' events coming from the DiagramStore
   */
  _onChange: function() {
      console.log("in _onChange");
    this.setState(getDiagramState());
  }

});

module.exports = DiagramApp;
