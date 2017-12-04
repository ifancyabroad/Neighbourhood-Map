let map;

// Array to store all the place markers
let markers = ko.observableArray([]);

function initMap() {
	// Styles array for custom map
	const styles = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff4400"
            },
            {
                "saturation": -68
            },
            {
                "lightness": -4
            },
            {
                "gamma": 0.72
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0077ff"
            },
            {
                "gamma": 3.1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00ccff"
            },
            {
                "gamma": 0.44
            },
            {
                "saturation": -33
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "hue": "#44ff00"
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "gamma": 0.77
            },
            {
                "saturation": 65
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 0.11
            },
            {
                "weight": 5.6
            },
            {
                "saturation": 99
            },
            {
                "hue": "#0091ff"
            },
            {
                "lightness": -86
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -48
            },
            {
                "hue": "#ff5e00"
            },
            {
                "gamma": 1.2
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -64
            },
            {
                "hue": "#ff9100"
            },
            {
                "lightness": 16
            },
            {
                "gamma": 0.47
            },
            {
                "weight": 2.7
            }
        ]
    }];

	// Constructor creates a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.96403089999999, lng: 1.3512195}, 
		zoom: 14,
		styles: styles,
		mapTypeControl: false
	});
	
	// Create variable for info windows
	const largeInfowindow = new google.maps.InfoWindow();
	
	// Creates markers from results of the nearbysearch
	const createMarkers = function(results, status, pagination) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			
			// Increases the results to a maximum of 60
			/*if (pagination.hasNextPage) {
				pagination.nextPage();
			}*/
			
			// Loop through results and create marker for each location
			for (let i = 0; i < results.length; i++) {
				let position = results[i].geometry.location;
				let title = results[i].name;
				let address = results[i].vicinity;
				
				let marker = new google.maps.Marker({
					position: position,
					map: map,
					title: title,
					address: address,
					animation: google.maps.Animation.DROP,
					id: i
				})
				
				// Push the marker to our array of markers.
				markers.push(marker);

				// Create an onclick event to open the large infowindow at each marker.
				marker.addListener('click', function() {
					populateInfoWindow(this, largeInfowindow);
				});
			}
		}
	}
	
	// Search request for restaurants within 2000 metres of Felixstowe centre
	const getMarkers = function() {
		const felixstowe = new google.maps.LatLng({lat: 51.961726, lng: 1.351255});
		const request = {
					location: felixstowe,
					radius: '2000',
					type: ['restaurant'],
					key: 'AIzaSyChGiQPjP2sWVf0rZpvoNKarXBNI5VzRpA'
					};
		
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, createMarkers);
	}()
}

// Function to populate the infowindow when the marker is clicked. Only one
// infowindow can be opened at a time
const populateInfoWindow = function(marker, infowindow) {
	
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		
		// Populate the info window
		infowindow.marker = marker;		
		infowindow.setContent(
		`<h4>${marker.title}</h4>
		<p>${marker.address}</p>`);
		infowindow.open(map, marker);
		
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});
	}
}

// ViewModel
const ViewModel = function() {
	const self = this;
	
	// Menu default state is visible
	this.menuHidden = ko.observable(false);
	
	// Toggle menu visibility when clicking the icon
	this.toggleMenu = function() {
		if (self.menuHidden() === true) {
			self.menuHidden(false);
		} else {
			self.menuHidden(true);
		}
	}
}

ko.applyBindings(new ViewModel());