module.exports = {
	getDefaultSettings: function() {
		return {
			tooltip: {
				trigger: 'item'
			},
			grid: {
				top: '50',
				left: '80',
				right: '40',
				bottom: '60'
			},
			// dataZoom: [
			// 	{
			// 		type: 'slider',
			// 		show: true,
			// 		start: 0, 
			// 		end: 100,
			// 		handleSize: 20
			// 	}
			// ],
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: true,
				data: []
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}秒'
				}
			}, {
				type: 'value',
				axisLabel: {
					formatter: '{value}次'
				}				
			}],
			series: []
		};
	}
}