$( document ).ready(function() {

	$('#anti-social').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#drugs').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#robbery').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#pow').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#shoplifting').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#burglary').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#bicycle-theft').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#other-theft').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#public-order').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#vehicle-crime').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#cd-and-arson').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#violence-and-so').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#theft-from-person').on("click", function() {
  		sendFormRequest($(this).val());
	});

	$('#other-crime').on("click", function() {
  		sendFormRequest($(this).val());
	});

	function sendFormRequest(formValue){
		console.log(formValue)
		AddCrimesToMap();
	}
});