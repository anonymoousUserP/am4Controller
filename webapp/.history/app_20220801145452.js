sap.ui.define([
], function ( Data) {
	"use strict";  

	return {
    // exports.__esModule = true;
    // Import stuff
    // @amcharts/amcharts4/core
    // var am4core = require("./node_modules/@amcharts/amcharts4/core");
    // var am4charts = require("./node_modules/@amcharts/amcharts4/charts");
    // Create chart instance
    createChart : function(){

    var chart = am4core.create("chartdiv", am4charts.PieChart);
    // Create pie series
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    // Add data
    debugger;

    // console.log(Data)    
    // chart.data = Data;
    chart.dataSource.url = "Data/ch"
    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();
    }
}
});