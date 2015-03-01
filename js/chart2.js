$( document ).ready(function() {
	getChartdata();
});

function getChartdata() {
	var chartData = null;

	$.ajax({
  	url: "http://crimeanalytics.cloudapp.net/WebService/CrimeAnalyticsService.svc/GetReport_CrimesByCategory",
		dataType: 'json',
    	success: function (response) {
    		 displayChart(response.GetReport_CrimesByCategoryResult);
      },
      error: function (xhr, status, error) {
      	//TODO: Add the html to chart for error messages then update this to display any errors.
      }
  });
  return chartData;
}

function displayChart(chartData) {
	$('#chart').highcharts({
  	 chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Break down of crimes'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'crime rate',
            data: getPieChartData(chartData)
        }]
    });
}

function getPieChartData(chartData){
	var valyesForChart = [];
	total = 0;

	for (var i = chartData.length - 1; i >= 0; i--) {
		total += parseInt(chartData[i].Value);		
	};

	for (var i = chartData.length - 1; i >= 0; i--) {
		valyesForChart.push([chartData[i].Key, ( (parseInt(chartData[i].Value) / total) * 100 )])
	};

	return valyesForChart;
}