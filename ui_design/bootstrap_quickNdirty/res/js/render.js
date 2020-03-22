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


function renderLocationCard(data) {
	// document.getElementById('preformatted').innerHTML = JSON.stringify(data, null, '\t');


	let pos = data.with[0]

	let lastUpdate = timeConverter(pos.content.unixtime)

	let pin = div("col-sm-2", '<img src="res/gfx/positionsstift.svg" width="40px">')
	let location = div("col-sm-6", pos.thing)

	let crowd = '<h2 style="display: block;">' + pos.content.anzap + '</h2>'
    crowd += '<img src="res/gfx/Bimetrical_icon_person_black.svg">'.repeat(Math.min(7, pos.content.anzap))
    
	let persons = div("col-sm-4", crowd)

	let bodyRow = div('row', pin + location + persons)

	let header = div('card-header', pos.thing)
	let body = div('card-body', bodyRow)
	let footer = div('card-footer text-right text-muted', '<small>Aktualisierung; <b>' + lastUpdate + '</b></small>')

	let card = div('card', header + body + footer)

	document.getElementById('cardTest').innerHTML = card


	console.log(timeConverter(data.with[0].content.unixtime));
	console.log(div('testClass', 'Content'))
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