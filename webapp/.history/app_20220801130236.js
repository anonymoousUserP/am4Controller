sap.ui.define([
], function (JSONModel) {
	"use strict";  

	return {

// exports.__esModule = true;
// Import stuff
// @amcharts/amcharts4/core
// var am4core = require("./node_modules/@amcharts/amcharts4/core");
// var am4charts = require("./node_modules/@amcharts/amcharts4/charts");
// Create chart instance
function createChart : (){

    var chart = am4core.create("chartdiv", am4charts.PieChart);
    // Create pie series
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    // Add data
    debugger;
    chart.data = [{
            "country": "Lithuania",
            "litres": 501.9
        }, {
            "country": "Czech Republic",
            "litres": 301.9
        }, {
            "country": "Ireland",
            "litres": 201.1
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "Austria",
            "litres": 128.3
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }, {
            "country": "The Netherlands",
            "litres": 50
        }];
    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();
    };
});