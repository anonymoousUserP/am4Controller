sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	// Firebase-config retrieved from the Firebase-console
	const firebaseConfig = {
		apiKey: "AIzaSyAS2cPLDnRWkxxE-47elpbjASMiBRMqe2E",
		authDomain: "test1-4a843.firebaseapp.com",
		projectId: "test1-4a843",
		storageBucket: "test1-4a843.appspot.com",
		messagingSenderId: "343053890506",
		appId: "1:343053890506:web:54c3982e5081a25a1bd533",
		measurementId: "G-7KLY67JQQM",
		// apikey: process.env.API_KEY
	  };

	  

	return {

// exports.__esModule = true;
// Import stuff
// @amcharts/amcharts4/core
// var am4core = require("./node_modules/@amcharts/amcharts4/core");
// var am4charts = require("./node_modules/@amcharts/amcharts4/charts");
// Create chart instance
function createChart(){

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
}