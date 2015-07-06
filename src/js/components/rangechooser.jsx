/*
 * (C) Copyright 2015 Ralf Geschke <ralf@kuerbis.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var React = require('react');

var RangeElement = require('./rangeelement.jsx');
var RangeElementsWrapper = require('./rangeelementswrapper.jsx');
var DiagramComponent = require('./diagramcomponent.jsx');
var DiagramComponent2 = require('./diagramcomponent2.jsx');
var DatetimeChooser = require('./datetimechooser.jsx');
var rangeElements = require('./rangeelements.jsx');
var DiagramError = require('./diagramerror.jsx');
var DiagramChartNote = require('./diagramchartnote.jsx');
var DiagramActions = require('../actions/DiagramActions.js');



var RangeChooser = React.createClass({
    getInitialState: function(){
        var rangeList = this.props.rangeElements.map(function(range, i){
            range.active = (i == 0) ? true : false;
            range.id = i;
            return range;
        });
        return {rangeElements:rangeList, 
            datetimeOptions: { locale: 'de' },
            datetimeType: this.props.datetimeType,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            drawDiagram: true,
            diagramError: false
        };
    },    
    
    handleDiagramDrawn: function(drawn) {
        //this.setState({drawDiagram: drawn});
    },
    
    handleErrorClose: function() {
        this.setState({
            diagramError: false
            
        });
    },
    
    getRangeList: function(rangeChosen) {
        var rangeList = this.state.rangeElements.map(function(range, i){
            range.active = (i == rangeChosen) ? true : false;
            return range;
        });
        return rangeList;
    },
    
    handleDiagramError: function(error) {
        
        if (error != false) {
            var rangeChosen = 0; // set to current day in error case
    
            var rangeList = this.getRangeList(rangeChosen);
            
            error = new Date();
            var startDate = moment();
            this.setState({
                rangeElements: rangeList,
                rangeChosen: rangeChosen,
                diagramError: error,
                datetimeType: 'simple',
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: startDate.clone().add(1,'days').format('YYYY-MM-DD')
            });
             var dtp1 = $('#datetimepicker1');
            dtp1.data("DateTimePicker").date(startDate);
            
        } 
    },
    
  /*  getStartEndDate: function(rangeChosen) {
        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        startDate = $("#datetimepicker1").data("DateTimePicker").date().format('YYYY-MM-DD'); 
                
        switch (rangeChosen) {
    
            case 3: // range
                endDatePicker = $("#datetimepicker2");
                if (endDatePicker.length) {
                    endDate = endDatePicker.data("DateTimePicker").date().format('YYYY-MM-DD');
                } 
                if (endDate <= startDate) {
                    endDate = moment(startDate).add(1,'days').format('YYYY-MM-DD');
                    endDatePicker.data("DateTimePicker").date(moment(startDate).add(1,'days'));
            
                }
                break;
            case 2: // month
                
                $("#datetimepicker1").data("DateTimePicker").maxDate(false);
                startDate = moment(startDate).startOf('month').format('YYYY-MM-DD');
                endDate = moment(startDate).endOf('month').add(1,'days').format('YYYY-MM-DD');
                break;
            case 1: // week
                $("#datetimepicker1").data("DateTimePicker").maxDate(false);
                startDate = moment(startDate).startOf('isoWeek').format('YYYY-MM-DD');
                endDate = moment(startDate).endOf('isoWeek').add(1,'days').format('YYYY-MM-DD');
                
                break;
            case 0: // day
                $("#datetimepicker1").data("DateTimePicker").maxDate(false);
                endDate = moment(startDate).add(1,'days').format('YYYY-MM-DD');
      
                break;
        }
        return {startDate: startDate, endDate: endDate};
    },*/
    
    whenClicked: function(rangeElement){
        var rangeChosen = parseInt(rangeElement,10);
        console.log("in whenClicked on a range element");
        this._onRangeChosen(rangeChosen);
        /*
        var datetimeType = 'simple';
        if (parseInt(rangeElement,10) == 3 ) {
            datetimeType = 'range';
        }*/
        
        /*
        var dateRange = this.getStartEndDate(rangeChosen);
        var rangeElements = this.getRangeList(rangeChosen);
        this.setState({
            rangeElements: rangeElements,
            rangeChosen: rangeChosen,
            datetimeType: datetimeType,
            startDate: dateRange.startDate, 
            endDate: dateRange.endDate,
            diagramError: false
        });
        */
        return;
    },
     
    showDiagram: function(e) {
        var rangeChosen;
        if (typeof this.state.rangeChosen == 'undefined') {
            rangeChosen = 0;
        }
        else {
            rangeChosen = this.state.rangeChosen;
        }
        // 0 = day, 1 = week, 2 = month, 3 = range
        var dateRange = this.getStartEndDate(rangeChosen);

        this.setState({drawDiagram: true,
            rangeChosen: rangeChosen,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            diagramError: false
            
        });
       
     },
     
    handleClick: function(e) {
        e.preventDefault();
        return;
    },
    render: function(){
        var that = this;
        return ( 
             <div className="row">
              <div className="col-sm-8">
             <DiagramError onErrorClose={ this.handleErrorClose } diagramError={ this.state.diagramError } />
     
        <div className="chart-wrapper">
          <div className="chart-title">
            PIR Sensor Events 
          </div>
          <div className="chart-stage">
            <div idName="grid-1-1">
        <DiagramComponent onDiagramDrawn={ this.handleDiagramDrawn } onDiagramError={ this.handleDiagramError } drawDiagram={ this.state.drawDiagram } startDate={ this.props.startDate } endDate={ this.props.endDate } />
                </div>
          </div>
          <div className="chart-notes">
            <DiagramChartNote startDate={ this.props.startDate } endDate={ this.props.endDate } />
          </div>
        </div>

<div className="chart-wrapper">
          <div className="chart-title">
            Temperatur / Feuchtigkeit 
          </div>
          <div className="chart-stage">
            <div idName="grid-1-1">
        <DiagramComponent2 onDiagramDrawn={ this.handleDiagramDrawn } onDiagramError={ this.handleDiagramError } drawDiagram={ this.state.drawDiagram } startDate={ this.props.startDate } endDate={ this.props.endDate } />
                </div>
          </div>
          <div className="chart-notes">
            <DiagramChartNote startDate={ this.props.startDate } endDate={ this.props.endDate } />
          </div>
        </div>


      </div>
      <div className="col-sm-4">
        <div className="chart-wrapper">
          <div className="chart-title">
            Options
          </div>
          <div className="chart-stage">
            <div className="form-group">
                <RangeElementsWrapper rangeElements={ this.state.rangeElements } rangeChosen={ this.state.rangeChosen } handleClick={ that.whenClicked }/>
               
            </div>
            <div className="form-group">
              <DatetimeChooser datetimeType={ this.state.datetimeType } datetimeOptions={ this.state.datetimeOptions} />
            </div>
            <div className="form-group">
                <button type="button" onClick={ this._onShowDiagram } className="btn btn-primary" autoComplete="off">Zeige Daten</button>
            </div>
        
          </div>
          <div className="chart-notes">
           &nbsp;
          </div>
        </div>
      </div>
    </div>
            
            
           

    );
  },
  
  _onShowDiagram: function(event, startDate) {
      console.log("in onshowdiagram");
      console.log(event);
      console.log(startDate);
    DiagramActions.showDiagram(startDate);
    //this.setState({isEditing: false});
  },
    
    
  _onRangeChosen: function(range) {
      console.log("in onRangeChosen");
      console.log(range);
      DiagramActions.rangeChosen(range);
  }
        
});
      

module.exports = RangeChooser;

