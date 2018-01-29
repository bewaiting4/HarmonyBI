import _ from 'lodash';
import DefaultSetting from './ComboSettingsDefault';
import EChartsConfig from './EChartsConfig';

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

function parseData(data, subType, filter, data2) {
	var res = {},
		hashNumber = {},
		dateRange = {};

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
		from = datum['f_number'],
			to = datum['t_number'];

		if (filter && (!filter[from] && !filter[to])) {
			continue;
		}

		var date = datum['call_start'].split(' ')[0],
			time = datum['call_start'].split(' ')[1],
			duration = parseInt(datum['call_duration']);

		res[date] = res[date] || {};

		if (from && filter[from]) {
			hashData(date, from, duration);
		}

		if (to && from !== to && filter[to]) {
			hashData(date, to, duration);
		}

		var dateObj = new Date(date);
		if (dateRange.min === undefined ||  dateObj < dateRange.min) {
			dateRange.min = dateObj;
		}
		if (dateRange.max === undefined || dateObj > dateRange.max) {
			dateRange.max = dateObj;
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
					durationSeries[number].data.push(0);
				}

				if (point && point.count) {
					countSeries[number].data.push(point.count);
				} else {
					countSeries[number].data.push(0);
				}

			}
		});

		return _.concat(_.values(durationSeries), _.values(countSeries));
	}


	var rangeStart = 100 - 86400000 * 100 /(dateRange.max - dateRange.min + 86400000);
	if (rangeStart >= 100) {
		rangeStart = 90;
	}
	return {
		axis: _.keys(res),
		legend: _.keys(hashNumber),
		series: generateSeries(res),
		zoomRange: {
			start: 0,//rangeStart,
			end: 100
		}
	}
}

function getComboOption(data, subType, filter) {
	var traces = parseData(data, subType, filter),
		tickStyle = EChartsConfig.tickStyle,
		dataZoomStyle = EChartsConfig.dataZoomStyle; 

	return _.defaultsDeep({
		legend:[{
			show: true,
			top: 'top',
			left: 'left',
			data: traces.legend
		}, {
			show: true,
			bottom: 'top',
			left: 'center',
			data: getLegend1Data()
		}],
		xAxis: [_.assign({
			data: traces.axis,
		}, _.defaultsDeep({}, tickStyle))],
		yAxis: [
			_.defaultsDeep({}, tickStyle),
			_.defaultsDeep({}, tickStyle)
		],
		dataZoom: [
			_.defaultsDeep({
				start: traces.zoomRange.start, 
				end: traces.zoomRange.end
			}, _.defaultsDeep({}, dataZoomStyle))
		],
		series: traces.series
	}, DefaultSetting.getDefaultSettings());
}

module.exports = {
	getChartOption: getComboOption
}