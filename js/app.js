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
		zoom: 15,
		styles: styles,
		mapTypeControl: false
	});
	
	// Create a GLOBAL variable for info windows
	infowindow = new google.maps.InfoWindow();
	
	// Creates markers from results of the nearbysearch
	// This function is a slightly modified version of a function from Udacity's course on the Google Maps API
	const createMarkers = function(data) {
		let results = data.response.venues;
		
		// Loop through results and create marker for each location
		for (let i = 0; i < results.length; i++) {
			let position = {lat: results[i].location.lat, lng: results[i].location.lng};
			let title = results[i].name;
			let address = results[i].location.formattedAddress;
			let id = results[i].id;			
			let icon = getMarkerIcon('c56565');
			
			let marker = new google.maps.Marker({
				position: position,
				map: map,
				title: title,
				address: address,
				icon: icon,
				animation: google.maps.Animation.DROP,
				id: id,
				display: ko.observable(true)
			})

			// Push the marker to our array of markers.
			markers.push(marker);

			// Create an onclick event to open the large infowindow at each marker.
			marker.addListener('click', function() {
				selectMarker(this);
			});
		}
	}
	
	// Search request to foursquare API for food venues within 1000 metres of Felixstowe centre
	const getMarkers = function() {
		fetch(`https://api.foursquare.com/v2/venues/search?v=20170801&near=felixstowe&radius=1000&limit=50&categoryId=4d4b7105d754a06374d81259&client_id=TN0JTVIT305N1K511XICDKXC5FEIGGX50SVSUUH0UM3ECCKK&client_secret=FUHNDVNZHHHHDUPFYCQ43GQEIOQUG2QBGENDB1L2QRKD1UET`)
		.then(response => response.json())
		.then(createMarkers)
		
		// Catch any errors
		.catch(e => requestError(e, 'food venues'));
	}()
}

// Function accepts a color in hex format and generates a custom marker of that colour
// This function is a slightly modified version of a function from Udacity's course on the Google Maps API
const getMarkerIcon = function(colour) {
	let icon = {
		url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${colour}|40|_|%E2%80%A2`,
		size: new google.maps.Size(21, 34),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(10, 34),
		scaledSize: new google.maps.Size(21, 34)
	};
	return icon;
}

// Function to highlight the currently selected marker
const highlightMarker = function(currentMarker) {
	
	// Unhighlight all other markers
	for (let marker of markers()) {
		marker.icon = getMarkerIcon('c56565');
		marker.setAnimation(google.maps.Animation.null);
	}
	
	currentMarker.icon = getMarkerIcon('e8e686');
	currentMarker.setAnimation(google.maps.Animation.BOUNCE);
}	

// Function to populate the infowindow when the marker is clicked. Only one
// infowindow can be opened at a time
const selectMarker = function(marker) {
	
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		
		// Highlight selected marker
		highlightMarker(marker);
		
		// Fetch request to find image of the venue
		fetch(`https://api.foursquare.com/v2/venues/${marker.id}/photos?v=20170801&l&limit=1&client_id=TN0JTVIT305N1K511XICDKXC5FEIGGX50SVSUUH0UM3ECCKK&client_secret=FUHNDVNZHHHHDUPFYCQ43GQEIOQUG2QBGENDB1L2QRKD1UET`)
		.then(response => response.json())
		.then(function(data) {
			
			// If there is no image, display an error message
			if (data.response.photos.items[0] && data.response.photos.items[0]) {
				marker.image = `<img src="${data.response.photos.items[0].prefix}300x300${data.response.photos.items[0].suffix}">`;
			} else {
				marker.image = `<p><em>Sorry no photos available for this venue</em></p>`;
			}
			
			// Populate the info window
			infowindow.marker = marker;		
			infowindow.setContent(
			`<h4>${marker.title}</h4>
			<p>${marker.address}</p>
			${marker.image}`);
			infowindow.open(map, marker);
		})
		
		// Catch any errors
		.catch(e => requestError(e, 'venue details'));
		
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			marker.icon = getMarkerIcon('c56565');
			marker.setAnimation(google.maps.Animation.null);
			infowindow.marker = null;
		});
	}
}

// Function to run when there is an error retrieving data from the API
// This function is a slightly modified version of a function of the same name from Udacity's course on AJAX
const requestError = function(e, item) {
	console.log(e);
	window.alert(`Sorry there was an error retrieving the ${item} from Foursquare`);
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
	
	// Tracks the input field in a Knockout observable
	this.searchInput = ko.observable();
	
	// Update marker list when search input is used
	this.updateMarkers = ko.computed(function() {
		
		// Only upate if search field is not empty
		if (self.searchInput()) {
			
			// Set search input to a regular expression and all lower case
			let re = new RegExp(self.searchInput().toLowerCase());
			
			// If the marker title matches the expression then show it on the list and map
			// Else hide it on the list and map
			for (let marker of markers()) {
				if (marker.title.toLowerCase().match(re)) {
					marker.display(true);
					marker.setMap(map);
				} else {
					marker.display(false);
					marker.setMap(null);
				}
			}
		} else {
			for (let marker of markers()) {
				marker.display(true);
				marker.setMap(map);
			}
		}
	});
	
}

ko.applyBindings(new ViewModel());