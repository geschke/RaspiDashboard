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


var DiagramComponent = React.createClass({
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
                    .axisLabel('Events')
                    // .tickFormat(d3.format(',.2f'))
                    ;

            $("#chart1").html("");
            d3.select('#chart1').append('svg')
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
        var data = Array();
        d3.json("http://" + appconfig.database.host + ':' +  appconfig.database.port + '/query?u=' + appconfig.database.user + '&p=' + appconfig.database.password + "&q=select%20count(value)%20from%20pir%20where%20time%20%3E%20%27" + startDate + "%27%20and%20time%20%3C%20%27" + endDate + "%27%20group%20by%20time(10m)&db=pir_sensors", function (error, result) {

            if (typeof result.results[0].series == 'undefined') {
                that.props.onDiagramError("Could not load values from database.");
                return false;
            }
            that.props.onDiagramError(false);
       
            result = result.results[0].series[0].values;
                
            var parsedResult = {};
            result.forEach(function (d) {
                parsedResult = {};
                parsedResult.series = 0;
                parsedResult.x = parseDate(d[0]);
                parsedResult.y = +d[1];
                data.push(parsedResult);
            });

            var resultData = [{
                    values: data,
                    key: "Motion detected",
                    color: "#b51c1c"
                }];


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
                <div id = "chart1">
                </div>
                );
    }
});



module.exports = DiagramComponent;