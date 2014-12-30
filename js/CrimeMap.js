var map;

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

        return coordinates;
    }

    var drawingManager = new google.maps.drawing.DrawingManager({
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

        var coordinates = getCoordinates(rectangle);
        AddCrimesToMap(coordinates);
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        console.log(getCoordinates(circle));

        var coordinates = getCoordinates(circle);
        AddCrimesToMap(coordinates);
    });
    drawingManager.setMap(map);
}

function AddCrimesToMap(coordinates) {
    $.ajax({
        url: "http://104.40.193.115/WebService/Service1.svc/GetAllCrimesInBoundary",
        dataType: 'json',
        data: { coordinates: JSON.stringify(coordinates) },
        success: function (response) {
            for (var i = 0; i < response.GetAllCrimesInBoundaryResult.length; i++) {
                var crime = response.GetAllCrimesInBoundaryResult[i];
                var googleLatAndLong =
                new google.maps.LatLng(crime.Latitude,
                                       crime.Longitude);

                var title = crime.Location + ' ' + crime.Context + ' ' + crime.CategoryName; 

                addMarker(map, googleLatAndLong, title, title, crime); 
            }
        },
        error: function (xhr, status, error) {
            alert(status + '; ' + error);
        }
    }); 
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

    marker.setMap(map);
}

window.onload = showMap

google.maps.event.addDomListener(window, 'load', showMap);