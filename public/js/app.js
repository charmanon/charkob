(function($) {
	'use strict'; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
		if (
			location.pathname.replace(/^\//, '') ==
				this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate(
					{
						scrollTop: target.offset().top - 48
					},
					1000,
					'easeInOutExpo'
				);
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function() {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 54
	});

	// Collapse Navbar
	var navbarCollapse = function() {
		if ($('#mainNav').offset().top > 100) {
			$('#mainNav').addClass('navbar-shrink');
		} else {
			$('#mainNav').removeClass('navbar-shrink');
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

// Google Maps Scripts
var map = null;

// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// google.maps.event.addDomListener(window, 'resize', function() {
// 	map.setCenter(new google.maps.LatLng(34.434, -118.497));
// });

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 16,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(34.434, -118.497), // Five Knolls

		// Disables the default Google Maps UI components
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: true,

		// How you would like to style the map.
		// This is where you would paste any style found on Snazzy Maps.
		styles: [
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [
					{
						color: 'lavender'
					},
					{
						lightness: 17
					}
				]
			},
			{
				featureType: 'landscape',
				elementType: 'geometry',
				stylers: [
					{
						color: '#008080'
					},
					{
						lightness: 10
					}
				]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#E6E6FA'
					},
					{
						lightness: 17
					}
				]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [
					{
						color: '#E6E6FA'
					},
					{
						lightness: 29
					},
					{
						weight: 0.2
					}
				]
			},
			{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [
					{
						color: '#008080'
					},
					{
						lightness: 18
					}
				]
			},
			{
				featureType: 'road.local',
				elementType: 'geometry',
				stylers: [
					{
						color: '#008080'
					},
					{
						lightness: 16
					}
				]
			},
			{
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [
					{
						color: '#E6E6FA'
					},
					{
						lightness: 21
					}
				]
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [
					{
						visibility: 'on'
					},
					{
						color: 'teal'
					},
					{
						lightness: 16
					}
				]
			},
			{
				elementType: 'labels.text.fill',
				stylers: [
					{
						saturation: 36
					},
					{
						color: '#000000'
					},
					{
						lightness: 40
					}
				]
			},
			{
				elementType: 'labels.icon',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#008080'
					},
					{
						lightness: 20
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'geometry.stroke',
				stylers: [
					{
						visibility: 'off'
					},
					{
						color: '#000000'
					},
					{
						lightness: 17
					},
					{
						weight: 1.2
					}
				]
			}
		]
	};

	// Get the HTML DOM element that will contain your map
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	map = new google.maps.Map(mapElement, mapOptions);

	var parkingCoordinates1 = [
		{ lat: 34.43189, lng: -118.499265 },
		{ lat: 34.433415, lng: -118.497891 },
		{ lat: 34.433925, lng: -118.497201 }
	];
	var parkingCoordinates2 = [
		{ lat: 34.432882, lng: -118.499159 },
		{ lat: 34.432594, lng: -118.498627 }
	];

	var parkingPath1 = new google.maps.Polyline({
		path: parkingCoordinates1,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 0.5,
		strokeWeight: 15
	});

	var parkingPath2 = new google.maps.Polyline({
		path: parkingCoordinates2,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 0.5,
		strokeWeight: 15
	});

	parkingPath1.setMap(map);
	parkingPath2.setMap(map);

	// Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
	var image = '../img/portal.png';
	var myLatLng = new google.maps.LatLng(34.434, -118.497);

	var infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);

	service.getDetails(
		{
			placeId: 'ChIJjR4d7ueHwoAREN-AP-cton0'
		},
		function(place, status) {
			// console.log(place);
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				var marker = new google.maps.Marker({
					map: map,
					icon: image,
					position: place.geometry.location
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(
						'<div class="popup"><strong> The Club at Five Knolls</strong><br>' +
							'<br>' +
							place.formatted_address +
							'<br><br>' +
							'<a target="_blank" href="' +
							place.url +
							'">View on Google Maps</a>' +
							'</div>'
					);
					infowindow.open(map, this);
				});
			}
		}
	);
}

//countdown script
var deadline = 'March 31 2018 16:00:00 GMT-0800';

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
}
//
getTimeRemaining(deadline);

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	function updateClock() {
		var t = getTimeRemaining(endtime);
		daysSpan.innerHTML = ('0' + t.days).slice(-3);
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	updateClock(); // run function once at first to avoid delay
	var timeinterval = setInterval(updateClock, 1000);
}

initializeClock('clockdiv', deadline);

$(document).ready(function() {
	$('#contact_form')
		.bootstrapValidator({
			fields: {
				first_name: {
					validators: {
						stringLength: {
							min: 2
						},
						notEmpty: {
							message: 'Your name is missing!'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'Please supply your email address'
						},
						emailAddress: {
							message: 'Please supply a valid email address'
						}
					}
				},
				phone: {
					validators: {
						notEmpty: {
							message: 'Please supply your phone number'
						},
						phone: {
							country: 'US',
							message: 'Please supply a vaild phone number with area code'
						}
					}
				},
				comment: {
					validators: {
						notEmpty: {
							message: 'Please write the name(s) of your guest(s)'
						}
					}
				}
			}
		})
		.on('success.form.bv', function(e) {
			$('#success_message').slideDown({ opacity: 'show' }, 'slow'); // Do something ...
			$('#contact_form')
				.data('bootstrapValidator')
				.resetForm();

			// Prevent form submission
			e.preventDefault();

			// Get the form instance
			var $form = $(e.target);

			// Get the BootstrapValidator instance
			var bv = $form.data('bootstrapValidator');

			//On Click Send message
			// Get the inputted message using jquery
			var firstName = $('#first_name').val();
			var email = $('#email').val();
			var phone = $('#phone').val();
			var numGuest = $('#inputNumGuests').val();
			var nameGuest = $('#inputGuest').val();

			//push the new message object into Firebase using the reference variable
			firebase
				.database()
				.ref()
				.child('/rsvp')
				.push({
					Name: firstName,
					Email: email,
					Phone: phone,
					Number: numGuest,
					GuestNames: nameGuest
				});

			// Clear the input box
			$('#first_name').val('');
			$('#email').val('');
			$('#phone').val('');
			$('#inputNumGuests').val('');
			$('#inputGuest').val('');

			// return false in to stop page from reloading
			return false;
		});
});
