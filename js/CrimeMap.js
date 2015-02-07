var map;
var g_coordinates;
var drawingManager;
var gmarkers = [];

function showMap() {
    var googleLatAndLong =
        new google.maps.LatLng(52.206749,
                               0.121802);

    var mapOptions = {
        zoom: 12,
        center: googleLatAndLong,
        mapTypeID: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var getCoordinates = function (shape) {
        var ne = shape.getBounds().getNorthEast();
        var sw = shape.getBounds().getSouthWest();
        var coordinates = [ne, sw];
		g_coordinates = coordinates;
        return coordinates;
    }
	
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE
            ]
        },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 0.5,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        }
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (poly) {
        var coordinates = (poly.getPath().getArray());
        console.log(JSON.stringify(coordinates));
    });

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
        console.log(rectangle.constructor.toString());
        console.log(getCoordinates(rectangle));

        getCoordinates(rectangle);
        AddCrimesToMap();
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        console.log(getCoordinates(circle));

        getCoordinates(circle);
    });
    drawingManager.setMap(map);
}

function getSelected() {
	var selected = [];
	$('#crime-categories input:checked').each(function() {
		selected.push($(this).attr('Value'));
	});

     return selected;

}

function removeMarkers(){
    for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

function AddCrimesToMap() {
	console.log(g_coordinates);
	
	var selected = getSelected();
    if(selected.length !== 0){
        $.ajax({
            url: "http://crimeanalytics.cloudapp.net/WebService/Service1.svc/GetAllCrimesInBoundaryByCategory",
            //url: "http://localhost/CrimeAnalyticsWS/Service1.svc/GetAllCrimesInBoundaryByCategory",
			dataType: 'json',
            data: { coordinates: JSON.stringify(g_coordinates), 
					selectedCategories: JSON.stringify(selected), 
					fromDate: JSON.stringify($('#from-date').val()),
					toDate: JSON.stringify($('#to-date').val()),					
			},
            success: function (response) {
				removeMarkers();
                for (var i = 0; i < response.GetAllCrimesInBoundaryByCategoryResult.length; i++) {
                    var crime = response.GetAllCrimesInBoundaryByCategoryResult[i];
                    var googleLatAndLong =
                    new google.maps.LatLng(crime.Latitude,
                                           crime.Longitude);

                    var title = crime.Location + ' ' + crime.Context + ' ' + crime.CategoryName; 

                    addMarker(map, googleLatAndLong, title, title, crime); 
                }
            },
            error: function (xhr, status, error) {
                $("#error").removeClass("hidden");
            }
        }); 
    }else{
		 removeMarkers();
         $('#warning').removeClass("hidden");
    }
   
}

function addMarker(map, latlong, title, content, crime) {
    var marker = new google.maps.Marker({
        position: latlong,
        title: title,
        icon: 'http://maps.google.com/mapfiles/ms/icons/' + crime.Icon + '.png'
    });

    var infowindow = new google.maps.InfoWindow({
        content: content
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
	gmarkers.push(marker);
    marker.setMap(map);
}

window.onload = showMap

google.maps.event.addDomListener(window, 'load', showMap);