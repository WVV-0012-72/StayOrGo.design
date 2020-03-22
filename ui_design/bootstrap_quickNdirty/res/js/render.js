let fakeData = {
	"this": "succeeded",
	"by": "getting",
	"the": "dweets",
	"with": [{
		"thing": "pi-box-02",
		"created": "2020-03-22T12:36:16.301Z",
		"content": {
			"unixtime": 1584880570,
			"time": "12:36:10",
			"messages": 54499,
			"macs_sum": 117,
			"macs_area": 24,
			"ratio": 20,
			"cputemp": "46.2'C",
			"anzap": 17,
			"ma20s": 20,
			"match": "www",
			"errors": 0
		}
	}]
}



const fakeLocationData = {
	'pi-box-02': {
		label: 'Aldi Berlin-Kreuzberg',
		street: 'Oranienstraße 140-142',
		postal: '10969',
		city: 'Berlin',
		geoCoords: { lat: -25.344, lng: 131.036 }
	},
	'pi-box-04': {
		label: 'ALDI Berlin-Moabit',
		street: 'Huttenstraße 41 - 44',
		postal: '10553',
		city: 'Berlin',
		geoCoords: { lat: -25.344, lng: 131.036 }
	}
}


function renderSpinner(data) {
	let header = div('card-header', 'Lade Daten ...')
	let body = div('card-body text-center', '<img src="res/gfx/loading.gif" alt="Spinner"/>')
	let footer = div('card-footer text-right text-muted', '...')

	let card = div('card', header + body + footer)

	document.getElementById('cardTest').innerHTML = card
}

function renderLocationCard(data) {
	// document.getElementById('preformatted').innerHTML = JSON.stringify(data, null, '\t');


	let pos = data.with[0]
	let id = pos.thing

	let lastUpdate = timeConverter(pos.content.unixtime)

	let pin = div("col-sm-2", '<img src="res/gfx/positionsstift.svg" width="40px">')
	let location = div("col-sm-6", renderLocationBody(id))

	let crowd = '<h1 class="display-3" style="display: block;">' + pos.content.anzap + '</h1>'
	crowd += '<img src="res/gfx/Bimetrical_icon_person_black.svg">'.repeat(Math.min(7, pos.content.anzap))

	let persons = div("col-sm-4", crowd)

	let bodyRow = div('row', pin + location + persons)

	let header = div('card-header', pos.thing)
	let body = div('card-body', bodyRow)
	let footer = div('card-footer text-right text-muted', '<small>Aktualisierung: <b>' + lastUpdate + '</b> (' + pos.thing + ')</small>')

	let card = div('card', header + body + footer)

	document.getElementById('cardTest').innerHTML = card

	if (id in fakeLocationData) {
		document.getElementById('mapHolder').innerHTML = prepGoogleMaps(fakeLocationData[id])
	} else {
		document.getElementById('mapHolder').innerHTML = "Standort nicht gefunden: " + id
	}

	console.log(timeConverter(data.with[0].content.unixtime));
	console.log(div('testClass', 'Content'))
}



function renderLocationBody(id) {
	if (id in fakeLocationData) {
		let loc = fakeLocationData[id]
		let result = '<h4>' + loc.label + '</h4>'
		result += '<p>' + loc.street + '<br/>'
		result += loc.postal + ' ' + loc.city + '</p>'
		result += '<p class="text-muted text-right">' + id + '<p/>'

		return result
	} else {
		return div('text-danger', 'Standort nicht gefunden: ' + id)
	}
}




function div(divClass, content) {
	var template = Handlebars.compile('<div class="{{divClass}}">{{{content}}}</div>');
	return template({ divClass: divClass, content: content })
}




function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}
console.log(timeConverter(0));