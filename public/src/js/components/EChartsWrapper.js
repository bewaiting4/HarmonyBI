import _ from 'lodash';

/*
	"color": [
		"#26B99A",
		"#34495E",
		"#BDC3C7",
		"#3498DB",
		"#9B59B6",
		"#8abb6f",
		"#759c6a",
		"#bfd3b7"
	],

*/
var themeCfg = {
	"color": [
		"#1266D8",
		"#5085E3",
		"#515DA9",
		"#41A5C4",
		"#DE0CA3",
		"#088490",
		"#F996F1",
		"#8B56F0",
		"#C79FBE",
		"#BF4B9A"
	],
	"title": {
		"itemGap": 8,
		"textStyle": { "fontWeight": "normal", "color": "#408829" }
	},
	"dataRange": { "color": ["#1f610a", "#97b58d"] },
	"toolbox": { "color": ["#408829", "#408829", "#408829", "#408829"] },
	"tooltip": {
		"backgroundColor": "rgba(0,0,0,0.5)",
		"axisPointer": {
			"type": "line",
			"lineStyle": { "color": "#408829", "type": "dashed" },
			"crossStyle": { "color": "#408829" },
			"shadowStyle": { "color": "rgba(200,200,200,0.3)" }
		}
	},
	"dataZoom": {
		"dataBackgroundColor": "#eee",
		"fillerColor": "rgba(64,136,41,0.2)",
		"handleColor": "#408829"
	},
	"grid": { "borderWidth": 0 },
	"categoryAxis": {
		"axisLine": { "lineStyle": { "color": "#408829" } },
		"splitLine": { "lineStyle": { "color": ["#eee"] } }
	},
	"valueAxis": {
		"axisLine": { "lineStyle": { "color": "#408829" } },
		"splitArea": {
			"show": true,
			"areaStyle": {
				"color": ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]
			}
		},
		"splitLine": { "lineStyle": { "color": ["#eee"] } }
	},
	"timeline": {
		"lineStyle": { "color": "#408829" },
		"controlStyle": {
			"normal": { "color": "#408829" },
			"emphasis": { "color": "#408829" }
		}
	},
	"k": {
		"itemStyle": {
			"normal": {
				"color": "#68a54a",
				"color0": "#a9cba2",
				"lineStyle": {
					"width": 1,
					"color": "#408829",
					"color0": "#86b379"
				}
			}
		}
	},
	"map": {
		"itemStyle": {
			"normal": {
				"areaStyle": { "color": "#ddd" },
				"label": { "textStyle": { "color": "#c12e34" } }
			},
			"emphasis": {
				"areaStyle": { "color": "#99d2dd" },
				"label": { "textStyle": { "color": "#c12e34" } }
			}
		}
	},
	"force": {
		"itemStyle": { "normal": { "linkStyle": { "strokeColor": "#408829" } } }
	},
	"chord": {
		"padding": 4,
		"itemStyle": {
			"normal": {
				"lineStyle": {
					"width": 1,
					"color": "rgba(128, 128, 128, 0.5)"
				},
				"chordStyle": {
					"lineStyle": {
						"width": 1,
						"color": "rgba(128, 128, 128, 0.5)"
					}
				}
			},
			"emphasis": {
				"lineStyle": {
					"width": 1,
					"color": "rgba(128, 128, 128, 0.5)"
				},
				"chordStyle": {
					"lineStyle": {
						"width": 1,
						"color": "rgba(128, 128, 128, 0.5)"
					}
				}
			}
		}
	},
	"gauge": {
		"startAngle": 225,
		"endAngle": -45,
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": [[0.2, "#86b379"], [0.8, "#68a54a"], [1, "#408829"]],
				"width": 8
			}
		},
		"axisTick": {
			"splitNumber": 10,
			"length": 12,
			"lineStyle": { "color": "auto" }
		},
		"axisLabel": { "textStyle": { "color": "auto" } },
		"splitLine": { "length": 18, "lineStyle": { "color": "auto" } },
		"pointer": { "length": "90%", "color": "auto" },
		"title": { "textStyle": { "color": "#333" } },
		"detail": { "textStyle": { "color": "auto" } }
	},
	"textStyle": { "fontFamily": "Arial, Verdana, sans-serif" }
};

//echart Bar
function getBarOption() {
	var me = this;
	return {
		title: {
			text: 'Graph title',
			subtext: 'Graph Sub-text'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['sales', 'purchases']
		},
		toolbox: {
			show: true,
			orient: 'vertical',
			x: 'right',
			y: 'top',
			feature: {
				myResize: { // must start with "my"
					show: true,
					title: "最大化",
					icon: "path://M28,2h-6c-1.104,0-2,0.896-2,2s0.896,2,2,2h1.2l-4.6,4.601C18.28,10.921,18,11.344,18,12c0,1.094,0.859,2,2,2  c0.641,0,1.049-0.248,1.4-0.6L26,8.8V10c0,1.104,0.896,2,2,2s2-0.896,2-2V4C30,2.896,29.104,2,28,2z M12,18  c-0.641,0-1.049,0.248-1.4,0.6L6,23.2V22c0-1.104-0.896-2-2-2s-2,0.896-2,2v6c0,1.104,0.896,2,2,2h6c1.104,0,2-0.896,2-2  s-0.896-2-2-2H8.8l4.6-4.601C13.72,21.079,14,20.656,14,20C14,18.906,13.141,18,12,18z",
					//icon: "image://./images/maximize.png",
					onclick: function() {
						if (me.container) {
							me.container.resize();
						}
					}
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?', '9?', '10?', '11?', '12?']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: 'sales',
			type: 'bar',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			markPoint: {
				data: [{
					type: 'max',
					name: '???'
				}, {
					type: 'min',
					name: '???'
				}]
			},
			markLine: {
				data: [{
					type: 'average',
					name: '???'
				}]
			}
		}, {
			name: 'purchases',
			type: 'bar',
			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
			markPoint: {
				data: [{
					name: 'sales',
					value: 182.2,
					xAxis: 7,
					yAxis: 183,
				}, {
					name: 'purchases',
					value: 2.3,
					xAxis: 11,
					yAxis: 3
				}]
			},
			markLine: {
				data: [{
					type: 'average',
					name: '???'
				}]
			}
		}]
	};
}

//echart Line
function getComboOption(data) {

	function getBarInitialOption(number) {
		return {
			name: number,
			type: 'bar',
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

	function parseData(data) {
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
				durationSeries[number] = getBarInitialOption(number);
				// countSeries[number] = getLineInitialOption(number);

				for (var i in res) {
					var point = res[i][number];

					if (point && point.duration) {
						durationSeries[number].data.push(point.duration);
					} else {
						durationSeries[number].data.push(NaN);
					}

					// if (point && point.count) {
					// 	countSeries[number].data.push(point.count);
					// } else {
					// 	countSeries[number].data.push(NaN);
					// }

				}
			});

			// return _.concat(_.values(durationSeries), _.values(countSeries));
			return _.values(durationSeries);
		}

		return {
			axis: _.keys(res),
			legend: _.keys(hashNumber),
			series: generateSeries(res)
		}
	}

	var traces = parseData(data);

	return {
		tooltip: {
			trigger: 'item'
		},
		grid: {
			top: '10',
			left: '60',
			right: '60',
			bottom: '60'
		},
		dataZoom: [
			{
				type: 'slider',
				show: true,
				start: 0, 
				end: 10,
				handleSize: 8
			}
		],
		legend: {
			show: false,
			top: 'top',
			left: 'left',
			data: traces.legend
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: traces.axis
		}],
		yAxis: [{
			type: 'value'
		}, {
			type: 'value'
		}],
		series: traces.series
	};
}

function getNetworkOption() {
	return {
		title: {
			text: ''
		},
		tooltip: {},
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'quinticInOut',
		label: {
			normal: {
				show: true,
				textStyle: {
					fontSize: 12
				},
			}
		},
		legend: {
			x: "center",
			show: false,
			data: ["朋友", "战友", '亲戚']
		},
		series: [

			{
				type: 'graph',
				layout: 'force',
				symbolSize: 45,
				focusNodeAdjacency: true,
				roam: true,
				categories: [{
					name: '朋友',
					itemStyle: {
						normal: {
							color: "#009800",
						}
					}
				}, {
					name: '战友',
					itemStyle: {
						normal: {
							color: "#4592FF",
						}
					}
				}, {
					name: '亲戚',
					itemStyle: {
						normal: {
							color: "#3592F",
						}
					}
				}],
				label: {
					normal: {
						show: true,
						textStyle: {
							fontSize: 12
						},
					}
				},
				force: {
					repulsion: 1000
				},
				edgeSymbolSize: [4, 50],
				edgeLabel: {
					normal: {
						show: true,
						textStyle: {
							fontSize: 10
						},
						formatter: "{c}"
					}
				},
				data: [{
					name: '徐贱云',
					draggable: true,
				}, {
					name: '冯可梁',
					category: 1,
					draggable: true,
				}, {
					name: '邓志荣',
					category: 1,
					draggable: true,
				}, {
					name: '李荣庆',
					category: 1,
					draggable: true,
				}, {
					name: '郑志勇',
					category: 1,
					draggable: true,
				}, {
					name: '赵英杰',
					category: 1,
					draggable: true,
				}, {
					name: '王承军',
					category: 1,
					draggable: true,
				}, {
					name: '陈卫东',
					category: 1,
					draggable: true,
				}, {
					name: '邹劲松',
					category: 1,
					draggable: true,
				}, {
					name: '赵成',
					category: 1,
					draggable: true,
				}, {
					name: '陈现忠',
					category: 1,
					draggable: true,
				}, {
					name: '陶泳',
					category: 1,
					draggable: true,
				}, {
					name: '王德福',
					category: 1,
					draggable: true,
				}],
				links: [{
					source: 0,
					target: 1,
					category: 0,
					value: '朋友'
				}, {
					source: 0,
					target: 2,
					value: '战友'
				}, {
					source: 0,
					target: 3,
					value: '房东'
				}, {
					source: 0,
					target: 4,
					value: '朋友'
				}, {
					source: 1,
					target: 2,
					value: '表亲'
				}, {
					source: 0,
					target: 5,
					value: '朋友'
				}, {
					source: 4,
					target: 5,
					value: '姑姑'
				}, {
					source: 2,
					target: 8,
					value: '叔叔'
				}, {
					source: 0,
					target: 12,
					value: '朋友'
				}, {
					source: 6,
					target: 11,
					value: '爱人'
				}, {
					source: 6,
					target: 3,
					value: '朋友'
				}, {
					source: 7,
					target: 5,
					value: '朋友'
				}, {
					source: 9,
					target: 10,
					value: '朋友'
				}, {
					source: 3,
					target: 10,
					value: '朋友'
				}, {
					source: 2,
					target: 11,
					value: '同学'
				}],
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

function renderMap(id) {

	var intervalId;


	//创建和初始化地图函数：
	function initMap() {
		if (BMap) {
			clearInterval(intervalId)
			createMap(); //创建地图
			setMapEvent(); //设置地图事件
			addMapControl(); //向地图添加控件
		}
	}

	//创建地图函数：
	function createMap() {
		var map = new BMap.Map(id); //在百度地图容器中创建一个地图
		var point = new BMap.Point(116.464406, 39.989652); //定义一个中心点坐标
		map.centerAndZoom(point, 17); //设定地图的中心点和坐标并将地图显示在地图容器中
		window.map = map; //将map变量存储在全局
	}

	//地图事件设置函数：
	function setMapEvent() {
		map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		map.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		// var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		// map.addControl(ctrl_nav);
		//        //向地图中添加缩略图控件import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
		// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		// map.addControl(ctrl_ove);
		//        //向地图中添加比例尺控件
		// var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		// map.addControl(ctrl_sca);
	}


	intervalId = setInterval(initMap, 1000); //创建和初始化地图


}

function getPieOption(data) {

	function getPhoneTypeList(data) {
		var res = {},
			mapIMEI2PhoneType = function(imei) {
				// var map = {};

				// if (map[imei] !== undefined) {
				// 	return map[imei];
				// } else {
				// 	return 'else';
				// }

				return imei;
			},
			calc = function(imei, res) {
				var t = mapIMEI2PhoneType(imei);

				if (t === undefined || t === null) {
					return ;
				}
				
				if (res[t] !== undefined) {
					res[t]++;
				} else {
					res[t] = 1;
				}
			};

		for (var i = 0; i < data.length; i++) {
			var datum = data[i];

			calc(datum['f_IMEI'], res);
			calc(datum['t_IMEI'], res);
		}

		return res;
	}

	var phoneTypes = getPhoneTypeList(data);
	var attrElems = _.keys(phoneTypes);

	var labelOption = {
			normal: {
                    position: 'outside',
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    formatter: '{b}\n\n{c}'
			}
		};
	var chartData = _.map(phoneTypes, function(value, prop) {
		return {
			name: prop,
			value: value
			//label: labelOption
		};
	});

	return {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			show: false,
			x: 'left',
			y: 'bottom',
			data: attrElems
		},
		calculable: true,
		series: [{
			name: '手机型号',
			type: 'pie',
			radius: '55%',
			center: ['50%', '48%'],
			data: chartData
		}]
	};
}

function renderMap2(id) {

	var intervalId;
	//创建和初始化地图函数：
	function initMap() {
		if (BMap) {
			clearInterval(intervalId);
			createMap(); //创建地图
			setMapEvent(); //设置地图事件
			addMapControl(); //向地图添加控件
		}
	}

	//创建地图函数：
	function createMap() {
		var map = new BMap.Map(id); //在百度地图容器中创建一个地图
		var point = new BMap.Point(79.928877, 37.120556); //定义一个中心点坐标
		map.centerAndZoom(point, 13); //设定地图的中心点和坐标并将地图显示在地图容器中
		window.map = map; //将map变量存储在全局
	}

	//地图事件设置函数：
	function setMapEvent() {
		map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		map.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);
		//向地图中添加缩略图控件
		var ctrl_ove = new BMap.OverviewMapControl({
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			isOpen: 1
		});
		map.addControl(ctrl_ove);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrl_sca);
	}


	intervalId = setInterval(initMap, 1000); //创建和初始化地图

}

function renderTable(id) {
	$('#' + id).dataTable();
}


class EChartsWrapper {
	constructor(container) {
		this.container = container;
	}

	init_echarts() {
		if (typeof(echarts) === 'undefined') {
			return ;
		}

		this.theme = themeCfg;
	}

	renderChart(id, type, chartInstance, data) {
		this.init_echarts();

		if (type === "table") {
			renderTable(id);
		} else if (type === "map") {
			renderMap(id);
		} else if (type === "map2") {
			renderMap2(id);
		} else {
			if (!chartInstance) {
				chartInstance = echarts.init(document.getElementById(id), this.theme);	
			} 
			
			chartInstance.setOption(this.getChartOption(type, data));;
		}

		return chartInstance;
	}

	getChartOption(type, data) {
		var fn = {
			"bar": getBarOption,
			"network": getNetworkOption,
			"pie": getPieOption,
			"combo": getComboOption
		}
		return fn[type](data);
	}

	resizeChart(chartInstance) {
		if (chartInstance) {
			chartInstance.resize();	
		}
		
	}
}

module.exports = EChartsWrapper;