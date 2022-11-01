sap.ui.define([
], function () {
	"use strict";    

	return {
    DetaInfo :  function (data){
        data = data[0];
            
        var res = [] 
        for(var key in data){
            res.push({
            name : key,
            type : typeof data[key],
            })
        }
        return res;
    },
    createChart :  async  function(data){
        // var info = DetaInfo();
        // Creating chart instance.
        // am4themes_animated,
        am4core.unuseAllThemes()
        if(data.themName === 'amchartsdark') 
        am4core.useTheme(am4themes_amchartsdark);
        else if(data.themName === 'amchartsdark')
        am4core.useTheme(am4themes_amchartsdark);
        else if(data.themName === 'dark')
        am4core.useTheme(am4themes_dark);
        else if(data.themName === 'dataviz')
        am4core.useTheme(am4themes_dataviz);
        else if(data.themName === 'frozen')
        am4core.useTheme(am4themes_frozen);
        else if(data.themName === 'kelly')
        am4core.useTheme(am4themes_kelly);
        else if(data.themName === 'material')
        am4core.useTheme(am4themes_material);
        else if(data.themName === 'microchart')
        am4core.useTheme(am4themes_microchart);
        else if(data.themName === 'moonrisekingdom')
        am4core.useTheme(am4themes_moonrisekingdom);
        else if(data.themName === 'patterns')
        am4core.useTheme(am4themes_patterns);
        else if(data.themName === 'spiritedaway')
        am4core.useTheme(am4themes_spiritedaway);
        

        if(data.dim === '3D'){
            var chart = am4core.create("chartdiv", am4charts.PieChart3D);
            // Create pie series
            var series = chart.series.push(new am4charts.PieSeries3D());
        }
        else{
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            // Create pie series
            var series = chart.series.push(new am4charts.PieSeries());
        }
        
        // chart.dataSource.url = "./Data/chartData.json"

        // Setting dataFields.
        series.dataFields.value = data.value;
        series.dataFields.category = data.category;
        if(data.innerRadius) chart.innerRadius = am4core.percent(data.innerRadius);
        if(data.outerRadius) chart.radius = am4core.percent(data.outerRadius);
        
        if(data.strokeColour) series.slices.template.stroke = am4core.color(data.strokeColour);
        if(data.strokeWidth) series.slices.template.strokeWidth = data.strokeWidth;
        if(data.strokeOpacity) series.slices.template.strokeOpacity = data.strokeOpacity;

        if(data.labels) series.labels.template.disabled = data.labels;
        if(data.ticks) series.ticks.template.disabled = data.ticks;

        // To disable the tooltip which appears on slice hover, simply reset tooltipText on its template:
        if(data.Tooltip === false && data.Tooltip != undefined)
        pieSeries.slices.template.tooltipText = "";

        // var hs = series.slices.template.states.getKey("hover");
        // hs.properties.scale = 1;
        
        // Loading data from external source.
        chart.dataSource.url = "./Data/chartData.json"


        // // var json = require('./data.json'); //with path
        // var oMydata = new sap.ui.model.json.JSONModel(); 
		// await oMydata.loadData("./Data/chartData.json"); 
		// console.log(JSON.stringify(oMydata.getData()));
        // chart.data = this.getView().getModel('chartData').getData().oData;

        // console.log(chart.data);
        
        // And, for a good measure, let's add a legend
        chart.legend = new am4charts.Legend();
        debugger;
    }
}
});