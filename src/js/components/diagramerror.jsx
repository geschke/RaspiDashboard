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


var DiagramError = React.createClass({
    
    errorClose: function() {
        this.props.onErrorClose();
    },
    
    render: function() {
        if (this.props.diagramError ) {
            
        return (<div><div className="alert alert-danger  fade in" role="alert">
      <button type="button" onClick={ this.errorClose } className="close"  aria-label="Schließen"><span aria-hidden="true">×</span></button>
      <strong>Fehler!</strong> Beim Laden der Daten ist ein Fehler aufgetreten. Die Anzeige wurde auf das aktuelle Datum zurück gesetzt. 
      </div>
                </div>
  );
        }
        else {
            return (<div></div>);
        }
    }
});

module.exports = DiagramError;
