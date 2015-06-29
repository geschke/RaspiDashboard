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
 

var RangeElementsWrapper = React.createClass({
    handleClick: function (rangeId) {
        this.props.handleClick(rangeId);
    },
    
    render: function() {
        var that = this;
        return ( <div className="btn-group" data-toggle="buttons">
                {this.props.rangeElements.map(function(range) {
                    return <RangeElement range={range} key={range.id} active={ range.active } handleClick={that.handleClick} />;
        })}
                </div>
                );
        
    }
    
    
});

module.exports = RangeElementsWrapper;
