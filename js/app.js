var plotterApp = angular.module('plotterApp', ['chart.js']);


plotterApp.controller('pieChartCtrl', function ($scope, $http, plotterHelper){
	var pctrl = this;
	pctrl.resultData = [];
	
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.submit = function(){
		buildParams='getSymVol[]';
		$http.get( '/ipc?0!'+buildParams)
			 .success(function(data, status){
				$scope.resultData = deserialize(plotterHelper.getBuff(data));
				$scope.labels = _.pluck($scope.resultData, 'sym');
				$scope.data = _.pluck($scope.resultData, 'vol');
			});
	};	
});


plotterApp.controller('lineChartCtrl', function ($scope, $http, plotterHelper){
	var pctrl = this;
	pctrl.resultData = [];

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	
	$scope.submit = function(){

		buildParams='getMinuteVwap[]';
		$http({
		  method: 'GET',
		  url: '/ipc?0!'+buildParams
		}).success(function(data, status){

		$scope.resultData = deserialize(plotterHelper.getBuff(data));

		$scope.labels = _.pluck($scope.resultData, 'minute');
		$scope.series = ['Vwap', 'AvgPrice'];
		$scope.data = [_.pluck($scope.resultData, 'vwap'),_.pluck($scope.resultData, 'avg_px')];
		
        pctrl.resultData = $scope.resultData;
		});
	};	
});


plotterApp.factory('plotterHelper', function(){
    function ipcstr2arraybuffer(str){
      var buffer = new ArrayBuffer(str.length/2);
      var bufferView = new Uint8Array(buffer);
      for(var i = 0; i < buffer.byteLength; i++){
        bufferView[i] = parseInt("0x"+str.substr(2*i,2));
      };
      return buffer;
    };

    return{
        getBuff: ipcstr2arraybuffer
    };
});
