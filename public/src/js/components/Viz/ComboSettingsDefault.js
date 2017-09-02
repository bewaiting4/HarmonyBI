module.exports = {
	getDefaultSettings: function() {
		return {
			tooltip: {
				trigger: 'item'
			},
			grid: {
				top: '10',
				left: '80',
				right: '40',
				bottom: '60'
			},
			dataZoom: [
				{
					type: 'slider',
					show: true,
					start: 0, 
					end: 10,
					handleSize: 10
				}
			],
			legend: {
				show: false,
				top: 'top',
				left: 'left',
				data: []
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: true,
				data: []
			}],
			yAxis: [{
				type: 'value'
			}, {
				type: 'value'
			}],
			series: []
		};
	}
}