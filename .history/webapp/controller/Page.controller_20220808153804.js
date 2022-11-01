sap.ui.define(
    [
        'sap/ui/core/library',
        "sap/m/MessageToast",
        "./PieChart",
        "./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/odata/v2/ODataModel",
        "sap/ui/core/Fragment",
        'sap/ui/unified/ColorPickerPopover',
        'sap/ui/unified/library',
    ],
    function (coreLibrary,MessageToast, PieChart, BaseController, JSONModel, ODataModel, Fragment,ColorPickerPopover,unified) {
        "use strict";

        return BaseController.extend("sap.m.sample.Menu.controller.Page", {
            onSave: function () {
                console.log("save Pressed");
            },
            handleUploadComplete: function (oEvent) {
                debugger;
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;

                if (sResponse) {
                    sMessage =
                        iHttpStatusCode === 200 ?
                        sResponse + " (Upload Success)" :
                        sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },
            onAfterRendering: function () {
                // var oMydata = new sap.ui.model.json.JSONModel();
                // oMydata.loadData("../Data/chartData.json",false);
                // console.log(JSON.stringify(oMydata.getData()));
                // Disabling the FrameText before chart rendering.
                // debugger;
            },

            openDefaultModeSample: function (oEvent) {
                debugger;
                let num = oEvent.getSource().getId().split('-')[4];
                this.inputId = oEvent.getSource().getId();
                this.num = num;
                if(!this.oColorPickerPopover){
                    this.oColorPickerPopover = [];
                }
                if (!this.oColorPickerPopover[Number(num)]) {
                    this.oColorPickerPopover[Number(num)] = new ColorPickerPopover("oColorPickerPopover"+num, {
                        colorString: "blue",
                        mode: unified.ColorPickerMode.HSL,
                        change: this.handleChange.bind(this)
                    });
                }
                this.oColorPickerPopover[Number(num)].openBy(oEvent.getSource());
            },

            handleChange: function (oEvent) {
                var oView = this.getView(),
                oInput = sap.ui.getCore().byId(this.inputId);
                let color = oEvent.getParameter("colorString");

                // Setting the color data in the configure model;
                this.getView().getModel('configureModel').getData().chartData[Number(this.num)].color = color;

                const id = '__input0-__xmlview0--table-'+ this.num +'-vhi';
                const myTimeout = setTimeout(myGreeting, 250);

                function myGreeting() {
                    document.getElementById(id).style.backgroundColor = color;
                    document.getElementById(id).style.color = color;
                    document.getElementById(id).style.removeClass('hover');
                }
                // $('#'+id).removeClass('hover');

                oInput.setValue(color);
                oInput.setValueState(coreLibrary.ValueState.None);
                this.inputId = "";
                MessageToast.show("Chosen color string: " + color);
            },

            strokePress : function(){
                // create dialog for the stroke
                // if (!this.strokeDialog) {
                //     this.strokeDialog = sap.ui.xmlfragment("sap.m.sample.Menu.view.stroke",this);
                // } 
                // this.strokeDialog.open();

                if (!this.strokeDialog) {
                    this.strokeDialog = this.loadFragment({
                        name: "sap.m.sample.Menu.view.stroke"
                    });
                } 
                this.strokeDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },

            strokeCancelPress : function(){
                debugger;
                // this.strokeDialog.close();

                this.strokeDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },
            strokeSavePress : function(){
                
                // this.strokeDialog.close();
                this.strokeDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },

            editDataPress : function(){

                let oData = this.getView().getModel('configureModel').getData().chartData;
                let cat = this.getView().getModel('configureModel').getData().category;
                let val = this.getView().getModel('configureModel')

                let selCatValList = []
                for(let i = 0; i<oData.length ;i++){
                    selCatValList.push({
                        'Cat':oData[i][cat],
                        'Val' : ''
                    });
                }
                this.getView().getModel('oModel').getData().selCatValList = selCatValList;

                if (!this.editDataDialog) {
                    this.editDataDialog = this.loadFragment({
                        name: "sap.m.sample.Menu.view.editData"
                    });
                } 
                this.editDataDialog.then(function(oDialog) {
                    oDialog.open();
                });
                
            },

            editDataSavePress : function(){

                this.editDataDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },

            editDataCancelPress : function(){

                this.editDataDialog.then(function(oDialog) {
                    oDialog.close();
                });

            },

            tipsTricksPress : function(){


                if (!this.tipsDialog) {
                    this.tipsDialog = this.loadFragment({
                        name: "sap.m.sample.Menu.view.ticksLabel"
                    });
                } 
                this.tipsDialog.then(function(oDialog) {
                    oDialog.open();
                });

                

                const myTimeout = setInterval(myGreeting, 50,this);

                function myGreeting(that){
                    if(that.getView().byId("ticks") == undefined || that.done === 1)
                    return;
                    that.done = 1 ;
                    // console.log(1);

                    that.getView().getModel('configureModel').getData().ticks = false;
                    that.getView().getModel('configureModel').getData().labels = false;
                    that.getView().getModel('configureModel').getData().Tooltip = true;
                    // In the tick combo box we have selected as true for the ticks.
                    var oSelect = that.getView().byId("ticks");
                    var newItem = new sap.ui.core.Item({ key: "true", text: "true"});
                    oSelect.setSelectedItem(newItem);
                    

                    // In the tick combo box we have selected as true for the ticks.
                    var oSelect = that.getView().byId("labels");
                    var newItem = new sap.ui.core.Item({ key: "true", text: "true"});
                    oSelect.setSelectedItem(newItem);
                    

                    // In the tool tip text combo box we have selected as true for the ticks.
                    var oSelect = that.getView().byId("toolTips");
                    var newItem = new sap.ui.core.Item({ key: "true", text: "true"});
                    oSelect.setSelectedItem(newItem);
                    clearTimeout(myTimeout);
                }
                

                // create dialog for the stroke
                // if (!this.tipsDialog) {
                //     this.tipsDialog = sap.ui.xmlfragment("sap.m.sample.Menu.view.ticksLabel",this);
                // } 
                // this.tipsDialog.open();
            },

            tipsCancelPress : function(){
                debugger;
                // this.tipsDialog.close();

                this.tipsDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },
            tipsSavePress : function(){

                this.tipsDialog.then(function(oDialog) {
                    oDialog.close();
                });
                // this.tipsDialog.close();
            }, 

            sliceColorPress : function(){
                // debugger;
                
                let oData = this.getView().getModel('configureModel').getData().chartData;
                let cat = this.getView().getModel('configureModel').getData().category;
                
                let selColList = []
                for(let i = 0; i<oData.length ;i++){
                    selColList.push({'Name':oData[i][cat]});
                }
                this.getView().getModel('oModel').getData().selColList = selColList;

                if (!this.sliceColorDialog) {
                    this.sliceColorDialog = this.loadFragment({
                        name: "sap.m.sample.Menu.view.PieChartColor"
                    });
                } 
                this.sliceColorDialog.then(function(oDialog) {
                    oDialog.open();
                });

                const myTimeout = setInterval(myGreeting, 50,this);

                function myGreeting(that) {
                    if(that.getView().byId('table') == undefined)
                    return;
                    // console.log(1);
                    that.getView().byId('table').getModel('oModel').refresh(true);
                    clearTimeout(myTimeout);
                }

                
                // if (!this.sliceColorDialog) {
                //     this.sliceColorDialog = sap.ui.xmlfragment("sap.m.sample.Menu.view.PieChartColor",this);
                // } 
                // this.sliceColorDialog.open();
                    
                
                // sap.ui.getCore().byId('table').getModel('oModel').refresh(true);
                
            },
            sliceColorCancelPress : function(){
                debugger;
                this.sliceColorDialog.then(function(oDialog) {
                    oDialog.close();
                });
                // this.sliceColorDialog.close();
            },
            sliceColorSavePress : function(){
                // this.sliceColorDialog.close();

                this.getView().getModel('configureModel').getData().defaultColor = false;

                this.sliceColorDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },

                       
            cancelPress: function () {
                console.log("Cancel Pressed..!!");
                this.getResourceBundle();
            },

            // Function to select the pie chart.
            chartPress: function(oEvent){
                this.getView().getModel('configureModel').getData().chart = this.getView().byId('chart').getSelectedKey();
            },

            // Function to set the category.
            categoryPress: function(oEvent){
                debugger;
                this.getView().getModel('configureModel').getData().category = this.getView().byId('category').getSelectedKey();
                // this.getView().getModel('configureModel').setProperty('/category',this.getView().byId('category').getSelectedKey())
            },

            // Function to set the value.
            valuePress: function(oEvent){
                this.getView().getModel('configureModel').getData().value = this.getView().byId('value').getSelectedKey();
            },

            // Function to set the innerRadius percent.
            innerRadiusPress : function(oEvent){
                this.getView().getModel('configureModel').getData().innerRadius = Number( this.getView().byId('percent').getValue());
            },

            // Functio to set the inncerRadius percent.
            outerRadiusPress : function(oEvent){
                this.getView().getModel('configureModel').getData().outerRadius = Number( this.getView().byId('outerRadius').getValue());
            },

            // Function to set the strokeColor.
            strokeColourPress : function(oEvent){
                this.getView().getModel('configureModel').getData().strokeColour = this.getView().byId('strokeColour').getValue(); 
            },

            // Function to set the stroke width.
            strokeWidthPress : function(oEvent){
                this.getView().getModel('configureModel').getData().strokeWidth = Number(this.getView().byId('strokeWidth').getValue());
            },

            // Function to set the stroke opacity.
            strokeOpacityPress: function(oEvent){
                this.getView().getModel('configureModel').getData().strokeOpacity = Number( this.getView().byId('strokeOpacity').getValue())
            },

            // Function to change the visibility of labels.
            labelsPress : function(oEvent){
                // debugger;
                this.getView().getModel('configureModel').getData().labels = this.getView().byId('labels').getSelectedKey() == 'true' ? false: true;
            },
            
            ticksPress : function(oEvent){
                this.getView().getModel('configureModel').getData().ticks = this.getView().byId('ticks').getSelectedKey() == 'true' ? false: true;
            },
            
            toolTipsPress : function(oEvent){
                this.getView().getModel('configureModel').getData().Tooltip = this.getView().byId('toolTips').getSelectedKey() == 'true' ? true:false;
            },

            themePress : function(oEvent){
                this.getView().getModel('configureModel').getData().themName =  this.getView().byId('theme').getValue();
            },
            dimensionPress : function(oEvent){
                this.getView().getModel('configureModel').getData().dim =  this.getView().byId('dimension').getValue();
            },
            
            Generate: function () {
                debugger;
                this.getView().byId("frameText").setVisible(false);

                
                
                var oConfigureModelData = this.getView().getModel('configureModel').getData();
                if( oConfigureModelData.chart === "Pie Chart")
                PieChart.createChart(oConfigureModelData);

                // return;
                // var oFileUploader = this.byId("fileUploader");
                // oFileUploader.checkFileReadable().then(
                //     function (e) {
                //         PieChart.createChart();
                //         console.log(e);
                //     },
                //     function (error) {
                //         MessageToast.show("The file cannot be read. It may have changed.");
                //     }
                // );
            },

            // FUnction to set the preselect values of combo box.
            preSelect : function() {

                //  In the value combo box we have first item of the value columns as selected item.
                var oSelectValue = this.getView().byId("value");
                var t1 = this.getView().getModel('oModel').getData().valueCols[0].name;
                var newItem = new sap.ui.core.Item({ key: t1, text: t1});
                oSelectValue.setSelectedItem(newItem);
                this.getView().getModel('configureModel').getData().value = this.getView().byId('value').getSelectedKey();

                // In the categorical combo box we have the first item of the categorical columns as selected item.
                var oSelectCategory = this.getView().byId("category");
                var t2 = this.getView().getModel('oModel').getData().categoryCols[0].name;
                var newItem = new sap.ui.core.Item({ key: t2, text: t2});
                oSelectCategory.setSelectedItem(newItem);
                this.getView().getModel('configureModel').getData().category = this.getView().byId('category').getSelectedKey();

                

                

                // In the chart combo box we have selected item as first item of the chart list.
                var oSelect = this.getView().byId("chart");
                var newItem = new sap.ui.core.Item({ key: "Pie Chart", text: "Pie Chart"});
                oSelect.setSelectedItem(newItem);
                this.getView().getModel('configureModel').getData().chart = this.getView().getModel('oModel').getData().ChartType[0].Chart;  

                


                // In the dimension combo box we have selected as 2D for the ticks.
                var oSelect = this.getView().byId("dimension");
                var newItem = new sap.ui.core.Item({ key: "2D", text: "2D"});
                oSelect.setSelectedItem(newItem);
                this.getView().getModel('configureModel').getData().dim = "2D";
            },

            // Function that will be called once the file is uploaded from the ui side.
            onChange : function() {
                // debugger;                               

                // Setting the confiuration model for the the armchart.
                var oData = {
                    dataDiscription:'Data about the configuration of the map'
                }
                var oModel1 = new JSONModel(oData);
                this.getView().setModel(oModel1,'configureModel');
                this.getView().getModel('configureModel').getData().chartData =  this.getView().getModel('chartDataModel').getData();
                
                var data = this.getView().getModel('chartDataModel').getData();
                // setting the chart info to the model data.
                this.getView().getModel('oModel').getData().chartInfo = PieChart.DetaInfo(data);
                
                
                // debugger;
                // console.log(this.getView().getModel('oModel').getData());
                // console.log("onChange");

                let temp = this.getView().getModel('oModel').getData().chartInfo;

                let valArray = [];
                let catArray = [];

                for(let i=0;i<temp.length;i++){
                    if(temp[i].type === 'number')
                        valArray.push(temp[i])
                    else
                        catArray.push(temp[i])
                }

                this.getView().getModel('oModel').getData().categoryCols = catArray;
                this.getView().getModel('oModel').getData().valueCols = valArray;
                this.getView().byId('value').getModel('oModel').refresh(true);
                this.getView().byId('category').getModel('oModel').refresh(true);

                this.preSelect(); 
            },

            onChange1: async function (oEvent) {
                debugger;

                // var that = this;
                var reader = new FileReader();
                var file = oEvent.oSource.oFileUpload.files[0];
                // var file = this.byId('fileUploader');

                reader.readAsBinaryString(file);

                

                reader.onload = function() {
                    console.log(reader.result);
                };
                
                    reader.onerror = function() {
                    console.log(reader.error);
                };

                await reader.readAsDataURL(file);

                console.log("gekko");

                reader.close();



                /* let file = oEvent.getParameter("value");
        this._oBusyDialog = this._oBusyDialog || new sap.m.BusyDialog({ text: "Uploading..." });
        this._oBusyDialog.open(); */
                // try {
                //     reader.onload = (oEvent) => {
                //         debugger;
                //         // let data = oEvent.target :  oEvent.target? oEvent.result;
                //         console.log(oEvent);
                //         /* this._prepareJSONfromXlsx.call(this, data); */
                //     };
                //     // reader.readAsBinaryString(file);
                // } 
                // catch (e) {
                //     console.log(e); /*this._oBusyDialog && this._oBusyDialog.close();*/
                // }

                // var path = URL.createObjectURL(file);

                // reader.onload = function(oEvent){
                // 	debugger;
                // }

                // reader.readAsBinaryString(file);

                // var oModel = new ODataModel(path);

                // var oMydata = new sap.ui.model.json.JSONModel();
                // await oMydata.loadData(path);
                // console.log(JSON.stringify(oMydata.getData()));

                // reader.onload = function(e) {
                // 	var raw = e.target.result;
                // 	sap.m.MessageToast.show("binary string: " + raw);
                // };

                // reader.onerror = function(e) {
                // 	sap.m.MessageToast.show("error");
                // };
                // reader.readAsArrayBuffer(file);
            },
        });
    }
);