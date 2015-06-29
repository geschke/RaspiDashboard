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

var RangeElement = React.createClass({
     handleClick: function (e) {
      var currentChosen = this.props.range.id;
      this.props.handleClick(currentChosen);
    },
    
    render: function() {
        return (<label onClick={this.handleClick} data-order={this.props.range.id} className={ (this.props.active == true) ?  'btn btn-default active' : 'btn btn-default' }>
      <input type="radio" name="rangebuttons" autoComplete="off" data-order={this.props.range.id}/><span>{this.props.range.title}</span>
  </label>
  );
    }
    
    
});

module.exports = RangeElement;
