sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, UIComponent,JSONModel) {
        "use strict";
        return Controller.extend("sap.m.sample.Menu.controller.BaseController", {

            onInit: async function () {
                // console.log("Oninit");
                debugger;
                var oMydata = new JSONModel(); 
				await oMydata.loadData("./Data/chartData.json"); 
                this.getView().setModel(oMydata,'chartDataModel');

                // sap.ui.getCore().setModel(this.getView().getModel('oModel').getData(),'oModel');
            },
            // some basic functionalities just this.getRouter() ...
            getRouter: function () {
                // ... instead of
                return UIComponent.getRouterFor(this);
            },
            
            // just this.getModel() ...
            getModel: function (sName) {
                // ... instead of
                return this.getView().getModel(sName);
            },

            // just this.setModel() ...
            setModel: function (oModel, sName) {
                // ... instead of
                return this.getView().setModel(oModel, sName);
            },

            // just this.getResoureBundle() ...
            getResourceBundle: function () {
                // ... instead of
                console.log("Base Controller is working!");
                return ;
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            // calculate something
            randomCalculations: function (fValue1, fValue2) {
                // do some calculations
                return fValue1 + fValue2;
            }
        });
    }
);
