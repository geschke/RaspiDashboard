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
var DiagramActions = require('../actions/DiagramActions.js');


var DatetimeChooser = React.createClass({
    
    componentDidUpdate: function(prevProps, prevState) {
        console.log("in componentDidUpdate of DatetimeChooser");
        /*  var options = this.props.datetimeOptions;
        if (typeof options.locale == 'undefined') {
            options.locale = 'de';  // set default, configure by whatever
        }
        if ($('#datetimepicker2').length) {
            var dtp1 = $('#datetimepicker1');
            var dtp2 = $('#datetimepicker2');
            
            dtp2.datetimepicker(options);
             dtp1.on("dp.change", function (e) {
                dtp2.data("DateTimePicker").minDate(e.date);
        });
            dtp2.on("dp.change", function (e) {
            dtp1.data("DateTimePicker").maxDate(e.date);
        });
            
        }*/
    },
    
    componentDidMount: function() {
    //return {liked: false};
    
        var options = this.props.datetimeOptions;
        if (typeof options.locale == 'undefined') {
            options.locale = 'de';  // set default, configure by whatever
        }
      
             
        var that = this;
        options.defaultDate = new Date();
        options.defaultDate.setMinutes(0);
        options.defaultDate.setHours(0);
        options.defaultDate.setSeconds(0);
        options.format = 'LL';
        var dtp1 = $('#datetimepicker1');
        dtp1.datetimepicker(options);
         dtp1.on("dp.change", function (e) {
            console.log("Date changed!, call corresponding function!");
             var startDate = dtp1.data("DateTimePicker").date().format('YYYY-MM-DD'); 
       
            that._onChangeStartDate(e, startDate)
        });
               // return null;
      //  if ($('#datetimepicker2')) {
            var dtp2 = $('#datetimepicker2');
            dtp2.datetimepicker(options);
      //  }
    },
    
    render: function(){
        var dateComponentId = 'datetimepicker1';
    
        var dateComponent = <div className='col-sm-6'>
            <div className="form-group">
                <div className='input-group date' id={ dateComponentId }>
                    <input type='text' className="form-control" />
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
        </div>;

        var dateComponent2 = '';
        if (this.props.datetimeType == 'range') {
            dateComponentId = 'datetimepicker2';
            dateComponent2 = <div className='col-sm-6'>
                <div className="form-group">
                    <div className='input-group date' id={ dateComponentId }>
                        <input type='text' className="form-control" />
                        <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>;
        }
    
    return ( 
        <div className="row">
        { dateComponent }
        { dateComponent2 }
        </div>
        );
    },
    
    
     _onChangeStartDate: function(event, startDate) {
      console.log("in onChangeStartDate");
      console.log(event);
      console.log(startDate);
      DiagramActions.setStartDate(startDate);
    //this.setState({isEditing: false});
  },
    
});


module.exports = DatetimeChooser;