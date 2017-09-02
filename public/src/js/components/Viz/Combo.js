import _ from 'lodash';
import DefaultSetting from './ComboSettingsDefault';

function getBarInitialOption(number, subType) {
	return {
		name: number,
		type: 'bar',
		stack: subType === 2 ? "时长" : null, 
		data: []
	};
}

function getLineInitialOption(number) {
	return {
		name: number,
		type: 'line',
		yAxisIndex: 1,
		data: []
	};
}

function getLegend1Data() {
	return ["通话时长", "通话次数"];
}

function getLegend2Data() {
	return [];
}

function parseData(data, subType) {
	var res = {},
		hashNumber = {};

	function hashData(date, number, duration) {
		hashNumber[number] = true;

		res[date][number] = res[date][number] || {duration: 0, count: 0};

		if (!isNaN(duration)) {
			res[date][number].duration += duration;
		}

		res[date][number].count++;
	}

	for (var i = 0; i < data.length; i++) {
		var datum = data[i],
			date = datum['call_start'].split(' ')[0],
			time = datum['call_start'].split(' ')[1],
			duration = parseInt(datum['call_duration']),
			from = datum['f_number'],
			to = datum['t_number'];

		res[date] = res[date] || {};

		// if ((from === "15199289734" || to === "15199289734")) {
		// 	console.log(date + ' ' + duration);
		// 	// continue;
		// }



		if (from) {
			hashData(date, from, duration);
		}

		if (!!to && from !== to) {
			hashData(date, to, duration);
		}
	}

	function generateSeries(res) {
		var durationSeries = {},
			countSeries = {};

		_.forEach(hashNumber, function(value, number) {
			durationSeries[number] = getBarInitialOption(number, subType);
			countSeries[number] = getLineInitialOption(number);

			for (var i in res) {
				var point = res[i][number];

				if (point && point.duration) {
					durationSeries[number].data.push(point.duration);
				} else {
					durationSeries[number].data.push(NaN);
				}

				if (point && point.count) {
					countSeries[number].data.push(point.count);
				} else {
					countSeries[number].data.push(NaN);
				}

			}
		});

		return _.concat(_.values(durationSeries), _.values(countSeries));
	//			return _.values(durationSeries);
	}

	return {
		axis: _.keys(res),
		legend: _.keys(hashNumber),
		series: generateSeries(res)
	}
}

function getComboOption(data, subType) {
	var traces = parseData(data, subType);

	return _.defaultsDeep({
		legend: {
			data: traces.legend
		},
		xAxis: [{
			data: traces.axis
		}],
		series: traces.series
	}, DefaultSetting.getDefaultSettings());
}

module.exports = {
	getChartOption: getComboOption
}