agGrid.initialiseAgGridWithAngular1(angular);
agGrid.LicenseManager.setLicenseKey("Evaluation_License-_Not_For_Production_Valid_Until_25_April_2019__MTU1NjE0NjgwMDAwMA==5095db85700c871b2d29d9537cd451b3");
var module = angular.module('example', ['agGrid']);

module.controller('exampleCtrl', function ($scope, $http) {

    var columnDefs = [
        //rowGroup: true
        { headerName: "longitude", field: "longitude" },
        { headerName: "latitude", field: "latitude" },
        { headerName: "housing_median_age", field: "housing_median_age" },
        { headerName: "total_rooms", field: "total_rooms" },
        { headerName: "total_bedrooms", field: "total_bedrooms" },
        { headerName: "population", field: "population" }
    ];
    
    var rowData = [
        { longitude: '-122.03', latitude: 37.88, housing_median_age: 41.1, total_rooms: 880.1, total_bedrooms: 129.1, population: 322.1},
        { longitude: '-122.13', latitude: 31.08, housing_median_age: 41.2, total_rooms: 880.2, total_bedrooms: 129.2, population: 322.2},
        { longitude: '-122.23', latitude: 32.88, housing_median_age: 41.3, total_rooms: 880.3, total_bedrooms: 129.3, population: 322.3},
        { longitude: '-122.33', latitude: 37.32, housing_median_age: 41.4, total_rooms: 880.4, total_bedrooms: 129.4, population: 322.4},
        { longitude: '-122.43', latitude: 31.88, housing_median_age: 41.5, total_rooms: 880.5, total_bedrooms: 129.5, population: 322.5},
        { longitude: '-122.53', latitude: 30.28, housing_median_age: 41.6, total_rooms: 880.6, total_bedrooms: 129.6, population: 322.6},
        { longitude: '-122.63', latitude: 37.28, housing_median_age: 41.7, total_rooms: 880.7, total_bedrooms: 129.7, population: 322.7},
        { longitude: '-122.73', latitude: 12.98, housing_median_age: 41.8, total_rooms: 880.8, total_bedrooms: 129.8, population: 322.8},
        { longitude: '-122.83', latitude: 37.18, housing_median_age: 41.9, total_rooms: 880.9, total_bedrooms: 129.9, population: 322.9},
        { longitude: '-122.93', latitude: 96.18, housing_median_age: 41.0, total_rooms: 880.0, total_bedrooms: 129.0, population: 322.0}
    ];


    $scope.gridOptions = {
        angularCompileRows: true,
        defaultColDef: {
            resizable: true, sortable: true, editable: true, filter: true, width: 150, enableValue: true, enableRowGroup: true, enablePivot: true
        },
        columnDefs: columnDefs,
        rowData: rowData,
        enableRangeSelection: true,
        rowSelection: 'multiple',
        onCellValueChanged: onCellValueChanged,
        onPasteStart: onPasteStart,
        onPasteEnd: onPasteEnd,
        pagination: true,
        paginationPageSize: 20,
        alignedGrids: gridOptionsBottom,

        sideBar: {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                }
            ],
            defaultToolPanel: 'columns'
        }
    };

    var dataForBottomGrid = [
        {
            athlete: 'Total',
            age: '15 - 61',
            country: 'Ireland',
            year: '2020',
            date: '26/11/1970',
            sport: 'Synchronised Riding',
            gold: 55,
            silver: 65,
            bronze: 12
        }
    ];


    var gridOptionsBottom = {
        defaultColDef: {
            resizable: true
        },
        columnDefs: columnDefs,
        rowData: dataForBottomGrid,
        debug: true,
        rowClass: 'bold-row',
        headerHeight: 0,
        alignedGrids: $scope.gridOptions
    };

    function onCellValueChanged(params) {
        console.log("Callback onCellValueChanged:", params);
    }

    function onPasteStart(params) {
        console.log('Callback onPasteStart:', params);
    }

    function onPasteEnd(params) {
        console.log('Callback onPasteEnd:', params);
    }




    document.getElementById("exporter").addEventListener("click", function () {
        var fileNamer = prompt("File Name:");
        var sheetNamer = prompt("Sheet Name:");
        var params = {
            fileName: fileNamer,
            sheetName: sheetNamer
        };
        $scope.gridOptions.api.exportDataAsExcel(params);
    });
    document.getElementById("exportCSV").addEventListener("click", function () {
        var fileNamer = prompt("File Name:");
        var sheetNamer = prompt("Sheet Name:");
        var params = {
            fileName: fileNamer,
            sheetName: sheetNamer
        };
        $scope.gridOptions.api.exportDataAsCsv(params);
    });



    document.getElementById("submitCol").addEventListener("click", function (event) {
        var colName = document.getElementById('colName').value;
        columnDefs.push({ field: colName, headerName: colName, editable: true, resizable: true, sortable: true });
        $scope.gridOptions.api.setColumnDefs(columnDefs);
    });




    document.getElementById("addRow").addEventListener("click", function () {
        rowData.push({});
        $scope.gridOptions.api.setRowData(rowData);
    });

    document.getElementById("clearGrid").addEventListener("click", function () {
        columnDefs = [];
        rowData = [];
        $scope.gridOptions.api.setColumnDefs(columnDefs);
        $scope.gridOptions.api.setRowData(rowData);
    });


    document.getElementById("import").addEventListener("change", function (changeEvent) {
        columnDefs = [];
        rowData = [];
        $scope.gridOptions.api.setColumnDefs(columnDefs);
        $scope.gridOptions.api.setRowData(rowData);
        var reader = new FileReader();

        reader.onload = function (evt) {
            var data = evt.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            var headerNamesImport = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
            var importData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            console.log(importData);
            if (columnDefs.length < headerNamesImport.length) {
                var lengther = headerNamesImport.length - columnDefs.length;
                for (var i = 0; i < lengther; i++) {
                    columnDefs.push({ field: null, headerName: null, editable: true, resizable: true, sortable: true });
                    $scope.gridOptions.api.setColumnDefs(columnDefs);
                }
            }

            for (var i = 0; i < columnDefs.length; i++) {
                columnDefs[i] = { headerName: headerNamesImport[i], field: headerNamesImport[i] };
                $scope.gridOptions.api.setColumnDefs(columnDefs);
            }
            for (var i = 0; i < importData.length; i++) {
                rowData[i] = importData[i];
                $scope.gridOptions.api.setRowData(rowData);
            }

        }

        reader.readAsBinaryString(changeEvent.target.files[0]);
    });

});