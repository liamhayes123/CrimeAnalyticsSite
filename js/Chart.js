$( document ).ready(function() {
$('#Test').on("click", function() {
	$.ajax({
            url: "http://crimeanalytics.cloudapp.net/WebService/CrimeAnalyticsService.svc/GetReport_CrimesByCategory",
            //url: "http://192.168.1.236/CrimeAnalyticsWS/CrimeAnalyticsService.svc/GetReport_CrimesByCategory",
			dataType: 'json',
            success: function (response) {
                for (var i = 0; i < response.GetReport_CrimesByCategoryResult.length; i++) {
					var crime = response.GetReport_CrimesByCategoryResult[i];
					alert(crime.Key + ': ' + crime.Value);
                }
            },
            error: function (xhr, status, error) {
				alert(error);
            }
        });
    });
});