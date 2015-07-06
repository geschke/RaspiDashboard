
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
      var dateRange = DiagramStore.getStartEndDate();
      
  var diagramObject = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      range: DiagramStore.getRange(),
      datetimeType: DiagramStore.getDatetimeType()
  };
  console.log(diagramObject);
  return diagramObject;
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
        <RangeChooser startDate={this.state.startDate} endDate={this.state.endDate} range={ this.state.range } datetimeType={this.state.datetimeType } rangeElements={rangeElements}/>
      </div>
                
  	);
  },

  /**
   * Event handler for 'change' events coming from the DiagramStore
   */
  _onChange: function() {
      console.log("in _onChange");
      var diagramState = getDiagramState();
      console.log(diagramState);
    this.setState(diagramState);
  }

});

module.exports = DiagramApp;
