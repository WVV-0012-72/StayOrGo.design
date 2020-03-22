// data.js

function getRealtimeData(piHostname) {
	renderSpinner('cardTest')
	renderSpinner('mapHolder')
	$.get("https://dweet.io:443/get/latest/dweet/for/" + piHostname, function(data, status) {
		// alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
		renderLocationCard(data)
	})
}


function getLocations() {
	renderSpinner('linkList')

	let data = [{ location: 'Aldi Berlin-Kreuzberg', id: 'pi-box-02' },
		{ location: 'ALDI Berlin-Moabit', id: 'pi-box-02' }
	]

	// $.get("https://dweet.io:443/get/latest/dweet/for/" + piHostname, function(data, status) {
	// 	// alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
	// 	renderLocationCard(data)
	// })
	renderLinks(data)
}


function prepGoogleMaps(data) {
	let loc = [data.street, data.postal, data.city].join(' ')
	loc = loc.replace(' ', '%20')


	let link = 'https://maps.google.com/maps?q=' + loc + '&ie=UTF8&iwloc=&output=embed'
	let content = '<iframe height="600" id="gmap_canvas" class="z-depth-1-half map-container-5" frameborder="0" style="border:0" allowfullscreen src="' + link + '"></iframe>'

	return content
}