function getTCommOption(data, subtype, filter, data2) {

	function renderItem(params, api) {
	    var start = api.coord([api.value(0), api.value(3)]);
	    var end = api.coord([api.value(1), api.value(2)]);
	    var size = api.size([hashTimeStamp[api.value(1)] - hashTimeStamp[api.value(0)], hashNumber[api.value(3)] - hashNumber[api.value(2)]]);
	    var style = api.style();

	    return {
	        type: 'rect',
	        shape: {
	            x: start[0],
	            y: start[1],
	            width: end[0] - start[0],
	            height: end[1] - start[1]
	        },
	        style: style
	    };
	}

	var hashNumber = {};
	var hashTimeStamp = {};
	var arrTimeStamp = [];
	var series = [];
	var idxNumber = 0;
	for (var i = data.length - 1; i >= 0; i--) {
		var datum = data[i],
			callStart = datum['call_start'],
			callEnd = datum['call_end'],
			date = datum['call_start'].split(' ')[0],
			time = datum['call_start'].split(' ')[1],
			duration = parseInt(datum['call_duration']),
			from = datum['f_number'],
			to = datum['t_number'];

		if (from && hashNumber[from] === undefined) {
			hashNumber[from] = idxNumber++;
		}

		if (to && hashNumber[to] === undefined) {
			hashNumber[to] = idxNumber++;
		}

		arrTimeStamp.push(callStart);
		
		if (!callEnd) {
			var dd = new Date(callStart);
			dd.setTime(dd.getTime() + (duration * 1000));
			arrTimeStamp.push(dd);
		}

		series.push([callStart, callEnd, from, to]);
	}

	arrTimeStamp.sort(function(a, b) {
		return (new Date(a)) - (new Date(b));
	})

	arrTimeStamp.forEach(function(t, idx) {
		hashTimeStamp[t] = idx;
	});

	var h1 = _.mapValues(hashNumber, function(o) {return true});
	var yTicks = [];

	for (var j = 0; j < data2.length; j++) {
		var nb = data2[j].number;
		if (h1[nb]) {
			yTicks.push(nb);
			h1[nb] = false;
		}
	}

	_.forEach(h1, function(value, key) {
		if (value) {
			yTicks.push(key);
			h1[key] = false;
		}
	});

	return {
	    tooltip: {
	    },
	    xAxis: {
	        type: 'time',
	        data: _.keys(hashTimeStamp),
	        splitLine: {
	        	show: false
	        }
	    },
	    yAxis: {
	    	type: 'category',
	    	data: yTicks,
	    	splitLine: {
	        	show: true
	        },
	        boundaryGap: false
	    },
		dataZoom: [
			{
				type: 'slider',
				show: true,
				start: 0,
				end: 6,
				handleSize: 20
			}
		],
		grid: {
			top: '20',
			left: '80',
			right: '20',
			bottom: '80'
		},
	    series: [{
	        type: 'custom',
	        renderItem: renderItem,
	        dimensions: ['call_start', 'call_end', 'f_number', 'to_number'],
	        encode: {
	            x: [0, 1],
	            y: [2, 3],
	            tooltip: [0, 1, 2, 3],
	            itemName: 2
	        },
	        data: series
	    }]
	};
}

module.exports = {
	getChartOption: getTCommOption
}