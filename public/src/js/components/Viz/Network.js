function getNetworkOption(data) {

	function parseData(data) {
		var mapping = {}

		function setupData(from, to, duration) {
			mapping[from] = mapping[from] || {};
			mapping[from][to] = mapping[from][to] || {duration: 0, count: 0};
			if (!isNaN(duration)) {
				mapping[from][to].duration += duration;
			}
			mapping[from][to].count++;
		}

		for (var i = 0; i < data.length; i++) {
			var datum = data[i],
				from = datum['f_number'],
				to = datum['t_number'],
				duration = parseInt(datum['call_duration']);

			if (!from || !to) {
				continue ;
			}

			if (mapping[from] || !mapping[to]) {
				setupData(from, to, duration);
			} else {
				setupData(to, from, duration);
			}
		}

		var nodes = {},
			links = [];

		function getNodeInitialOption(name) {
			return {name: name, value: 0, draggable: true}
		}

		for (var from in mapping) {
			for (var to in mapping[from]) {
				nodes[from] = nodes[from] || getNodeInitialOption(from);
				nodes[to] = nodes[to] || getNodeInitialOption(to);

				nodes[from].value += mapping[from][to].duration;
				nodes[to].value += mapping[from][to].duration;

				links.push({source: from, target: to, value: mapping[from][to].count});
			}
		}

		return {
			data: _.map(nodes, function(node, key) {return {name: key, value: node.value}}),
			links: links
		}
	}

	var traces = parseData(data);

	return {
		title: {
			text: ''
		},
		tooltip: {},
		animationDurationUpdate: 50,
		animationEasingUpdate: 'quinticInOut',
		label: {
			normal: {
				show: false,
				textStyle: {
					fontSize: 12
				},
			}
		},
		brush: {
	        outOfBrush: {
	            color: '#abc'
	        },
	        brushStyle: {
	            borderWidth: 2,
	            color: 'rgba(0,0,0,0.2)',
	            borderColor: 'rgba(0,0,0,0.5)',
	        },
	        seriesIndex: [0, 1],
	        throttleType: 'debounce',
	        throttleDelay: 300,
	        geoIndex: 0
    	},
		// legend: {
		// 	x: "center",
		// 	show: false,
		// 	data: ["朋友", "战友", '亲戚']
		// },
		series: [

			{
				type: 'graph',
				layout: traces.data.length < 10 ? 'force' : 'circular',
				symbolSize: 15,
				focusNodeAdjacency: true,
				roam: true,
				edgeLength: [5, 30],
				// categories: [{
				// 	name: '朋友',
				// 	itemStyle: {
				// 		normal: {
				// 			color: "#009800",
				// 		}
				// 	}
				// }, {
				// 	name: '战友',
				// 	itemStyle: {
				// 		normal: {
				// 			color: "#4592FF",
				// 		}
				// 	}
				// }, {
				// 	name: '亲戚',
				// 	itemStyle: {
				// 		normal: {
				// 			color: "#3592F",
				// 		}
				// 	}
				// }],
				label: {
					normal: {
						show: false,
						textStyle: {
							fontSize: 12
						},
					}
				},
				force: {
					repulsion: 50
				},
				edgeSymbolSize: [4, 50],
				edgeLabel: {
					normal: {
						show: false,
						textStyle: {
							fontSize: 10
						},
						formatter: "{c}"
					}
				},
				data: traces.data,
				links: traces.links,
				itemStyle: {
					normal: {
						color: 'grey'
					},
					emphasis: {
						color: 'blue'
					}
				},
				lineStyle: {
					normal: {
						opacity: 0.9,
						width: 1,
						curveness: 0
					}
				}
			}
		]
	};
}

module.exports = {
	getChartOption: getNetworkOption
}