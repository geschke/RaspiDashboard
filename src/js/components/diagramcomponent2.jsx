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

// todo here...
var appconfig = {
    database: { host: '192.168.10.249',
                port: '8086',
                user: 'root',
                password: 'root'
    }
};


var DiagramComponent2 = React.createClass({
    setupGraph: function (data)
    {

        nv.addGraph(function () {

            chart = nv.models.lineChart()
                    .options({
                        transitionDuration: 300,
                        useInteractiveGuideline: true
                    })
                    ;

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately

            chart.xAxis
                    .axisLabel("Zeit")
                    .tickFormat(function (d) {
                        return d3.time.format('%d.%m.%Y %X')(new Date(d))
                    })
                    .staggerLabels(true)
                    ;


            chart.yAxis
                    .axisLabel('Grad Celsius / %')
                     .tickFormat(d3.format('.02f'))
                    ;

            $("#chart2").html("");
            d3.select('#chart2').append('svg')
                    .datum(data)
                    .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });

    },
    initializeDiagram: function (startDate, endDate) {
        this.props.onDiagramDrawn(true);
        var chart;
        var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;
        var that = this;
        var dataTemp = Array();
        var dataHum = Array();
        d3.json("http://" + appconfig.database.host + ':' +  appconfig.database.port + '/query?u=' + appconfig.database.user + '&p=' + appconfig.database.password + "&q=select%20*%20from%20dht%20where%20time%20%3E%20%27" + startDate + "%27%20and%20time%20%3C%20%27" + endDate + "%27&db=dht22_sensors", function (error, result) {


            if (typeof result.results[0].series == 'undefined') {
                that.props.onDiagramError("Could not load values from database.");
                return false;
            }
            that.props.onDiagramError(false);
       
            result = result.results[0].series[0].values;
                
            var parsedResult = {};
            var parsedHum = {};
            result.forEach(function (d) {
                parsedResult = {};
                parsedHum = {};
                parsedResult.series = 0;
                var dbDate = d[0].slice(0,19) + 'Z';
                parsedResult.x = parseDate(dbDate);
                parsedResult.y = parseFloat(+d[2]);
                dataTemp.push(parsedResult);
                parsedHum.series = 1;
                parsedHum.x = parseDate(dbDate);
                
                parsedHum.y = parseFloat(+d[1]);
                dataHum.push(parsedHum);
            });

            var resultData = [{
                    values: dataTemp,
                    key: "Temperature",
                    color: "#b51c1c"
                },
                {
                    values: dataHum,
                    key: "Humidity",
                    color: "#331d9c"
                }
            ];


            that.setupGraph(resultData);
            //that.props.onHandleDiagramDrawn(true);
        });



    },
    componentDidMount: function () {
        this.initializeDiagram(this.props.startDate, this.props.endDate);
    },
    render: function () {
        if (this.props.drawDiagram) {
            this.initializeDiagram(this.props.startDate, this.props.endDate);

        }
       
        return (
                <div id = "chart2">
                </div>
                );
    }
});


module.exports = DiagramComponent2;