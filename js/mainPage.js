$( document ).ready(function() {
	$('#container').children('#charts').click(function(e) {
		window.location.href = '/Website/chart.html';		
	});
	
	$('#container').children('#statistics').click(function(e) {  
		window.location.href = '/Website/statistics.html';	
	});
	
	$('#container').children('#contacts').click(function(e) {  
		window.location.href = '/Website/contacts.html';	
	});
	
	$( "#to-date" ).datepicker().datepicker("setDate", new Date());
	$( "#from-date" ).datepicker().datepicker("setDate", new Date());
});