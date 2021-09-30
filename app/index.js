const express = require('express')
const app = express()
const port = 3000

var get_bmi = function(w, h) {
	var bmi = w / Math.pow(h, 2)
	bmi = Math.round(bmi * 10) / 10
    return bmi
};

var get_bmi_label = function(bmi) {
	if (bmi < 18.5) {
		return 'underweight'
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'normal'
	} else if (bmi > 25) {
		return 'overweight'
	}
};

app.get('/', (req, res) => {
	// Example URL: http://localhost:3000/?height=170&weight=72
	res.setHeader('Content-Type', 'application/json');
	if (typeof req.query.height == 'undefined' || typeof req.query.weight == 'undefined') {
		res.end(JSON.stringify({ error: 'input required' }, null, 4) + '\n')
		return
	}
	var h = req.query.height / 100
	var w = req.query.weight
	var bmi = get_bmi(w, h)
	res.end(JSON.stringify({ bmi: bmi, label: get_bmi_label(bmi) }, null, 4) + '\n')
})

app.listen(port, () => {
  console.log('App started at http://localhost:' + port)
})

