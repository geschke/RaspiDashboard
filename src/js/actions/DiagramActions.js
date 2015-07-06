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
 * DiagramActions
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiagramConstants = require('../constants/DiagramConstants');

var DiagramActions = {

  /**
   * @param  {string} text
   */
  showDiagram: function(dateField) {
        console.log("in showDiagram");
    AppDispatcher.dispatch({
      actionType: DiagramConstants.DIAGRAM_SHOW,
      dateField: dateField
    });
  },
  setStartDate: function(startDate) {
      console.log("in Actions: setDateStart");
      AppDispatcher.dispatch({
          actionType: DiagramConstants.DIAGRAM_DATE_START_CHANGE,
          startDate: startDate
      });
  },
  
  rangeChosen: function(range) {
      console.log("in Actions: rangeChosen");
      AppDispatcher.dispatch({
          actionType: DiagramConstants.DIAGRAM_RANGE_CHOSEN,
          range: range
      });
  }

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
 /* updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },
*/
  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
 /* toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },
*/
  /**
   * Mark all ToDos as complete
   */
  /*
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },
*/
  /**
   * @param  {string} id
   */
  /*
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },
*/
  /**
   * Delete all the completed ToDos
   */
  /*
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }
*/
};

module.exports = DiagramActions;
