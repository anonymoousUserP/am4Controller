sap.ui.define([
], function () {
	"use strict";  

	return {
    createChart : function(){

        
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        // Create pie series
        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "litres";
        series.dataFields.category = "country";
        
        // Loading data from external source.
        chart.dataSource.url = "Data/chartData.json"
        // And, for a good measure, let's add a legend
        chart.legend = new am4charts.Legend();
    }
}
});