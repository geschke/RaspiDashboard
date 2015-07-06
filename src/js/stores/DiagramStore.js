/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DiagramConstants = require('../constants/DiagramConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _locale = 'de';
var _datetimeType = 'simple';
var _startDate = moment().format('YYYY-MM-DD');
var _endDate = moment().add(1,'days').format('YYYY-MM-DD');
var _drawDiagram =  true;
var _diagramError = false;
var _range = 0;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function changeStartDate(startDate) {
      console.log("in changeStartDate");
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  /*var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };*/
    _startDate = startDate;
    console.log(_startDate);
}


function changeEndDate(endDate) {
      console.log("in changeEndDate");
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  /*var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };*/
    _endDate = endDate;
    console.log(_endDate);
}

function changeRange(range) {
    console.log("in changeRange");
    _range = range;
}



function getRange() 
{
    return _range;
}

function getDatetimeType()
{
    return _datetimeType;
}




///////////////////////////////////////////////////////

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
/*
function update(id, updates) {
    
  _todos[id] = assign({}, _todos[id], updates);
}
*/
/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
/*
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}
*/
/**
 * Delete a TODO item.
 * @param  {string} id
 */
/*
function destroy(id) {
  delete _todos[id];
}
*/

/**
 * Delete all the completed TODO items.
 */
/*function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}
*/
var DiagramStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  /*
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },
*/

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getStartDate: function() {
        console.log("in getStartDAte");
    return _startDate;
  },

  getEndDate: function() {
        console.log("in getEndDate");
    return _endDate;
  },
  
  getStartEndDate: function()
{
    console.log("in getStartEndDate");
    var startDate = _startDate;
    var endDate = _endDate;
    switch (_range) {
            case 3: // range
                
                //endDatePicker = $("#datetimepicker2");
                //if (endDatePicker.length) {
                //    endDate = endDatePicker.data("DateTimePicker").date().format('YYYY-MM-DD');
                //} 
                if (endDate <= startDate) {
                    endDate = moment(startDate).add(1,'days').format('YYYY-MM-DD');
                    //endDatePicker.data("DateTimePicker").date(moment(startDate).add(1,'days'));
            
                }
                break;
            case 2: // month
                
                //$("#datetimepicker1").data("DateTimePicker").maxDate(false);
                startDate = moment(startDate).startOf('month').format('YYYY-MM-DD');
                endDate = moment(startDate).endOf('month').add(1,'days').format('YYYY-MM-DD');
                break;
            case 1: // week
                //$("#datetimepicker1").data("DateTimePicker").maxDate(false);
                startDate = moment(startDate).startOf('isoWeek').format('YYYY-MM-DD');
                endDate = moment(startDate).endOf('isoWeek').add(1,'days').format('YYYY-MM-DD');
                
                break;
            case 0: // day
                //$("#datetimepicker1").data("DateTimePicker").maxDate(false);
                endDate = moment(startDate).add(1,'days').format('YYYY-MM-DD');
      
                break;
        }
        return {startDate: startDate, endDate: endDate};
},

    getRange: function() {
        return _range;
    },
    
    getDatetimeType: function() {
      return _datetimeType;  
    },
    
    emitChange: function() {
          console.log("in emitChange");
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
      console.log("in addChangeListener");
      console.log(callback);
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var dateField;

  switch(action.actionType) {
    case DiagramConstants.DIAGRAM_SHOW:
        console.log("DIAGRAM SHOW");
        console.log(action);
        //dateField = action.dateField.trim();
        /*if (dateField !== '') {
            changeDate(dateField);
            DiagramStore.emitChange();
        }*/
        break;
    case DiagramConstants.DIAGRAM_DATE_START_CHANGE:
        console.log("DIAGRAM DATE_START_CHANGE");
        console.log(action);
        changeStartDate(action.startDate);
        //DiagramStore.emitChange(); // I think it's not necessary here, because only internal state should be changed, no event listener has to react
        break;
    case DiagramConstants.DIAGRAM_DATE_END_CHANGE:
        console.log("DIAGRAM DATE_END_CHANGE");
        console.log(action);
        changeEndDate(action.endDate);
        //DiagramStore.emitChange();
        break;
   case DiagramConstants.DIAGRAM_RANGE_CHOSEN:
        console.log("DIAGRAM RANGE CHOSEN");
        console.log(action);
        changeRange(action.range);
        DiagramStore.emitChange();
        break;

  /*  case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;
*/
    default:
      // no op
  }
});

module.exports = DiagramStore;
