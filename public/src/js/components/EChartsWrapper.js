import _ from 'lodash';
import themeCfg from './EChartsThemeConfig';

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
function getComboOption(data, subType) {

	function getBarInitialOption(number) {
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

	var traces = parseData(data);

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
			boundaryGap: true,
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
				layout: 'circular',
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
						show: true,
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
						show: true,
						textStyle: {
							fontSize: 10
						},
						formatter: "{c}"
					}
				},
				data: traces.data,
				links: traces.links,
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

function renderMap(id, data) {

	var intervalId,
		myMap;


	//创建和初始化地图函数：
	function initMap() {
		if (BMap) {
			clearInterval(intervalId)
			createMap(); //创建地图
			addMarkers(data);
			setMapEvent(); //设置地图事件
			addMapControl(); //向地图添加控件
		}
	}

	//创建地图函数：
	function createMap() {
		var map = new BMap.Map(id); //在百度地图容器中创建一个地图
		var point = new BMap.Point("乌鲁木齐"); //定义一个中心点坐标
		map.centerAndZoom(point, 17); //设定地图的中心点和坐标并将地图显示在地图容器中
		myMap = window.map1 = map; //将map变量存储在全局
	}

	function addMarkers(data) {
		if (!data) {
			return ;
		}

		var bounds = null;
		var hashPTs = {};
		var points = [];

		function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}

		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
			myMap.openInfoWindow(infoWindow,point); //开启信息窗口
		}


		for (var i = 0; i < data.length; i++) {
			var datum = data[i];
			if (datum['f_long'] && datum['f_lat']) {
				var hkey = datum['f_long'] + ':' + datum['f_lat'];
				if (hashPTs[hkey]) {
					continue; 
				}

				var pt = new BMap.Point(
						datum['f_long'],
						datum['f_lat']
					);
				var marker = new BMap.Marker(pt);

				var scontent = "<p>主叫: " + datum['f_number'] + "</p>"
						+ "<p>被叫: " + datum['t_number'] + "</p>"
						+ "<p>时长: " + datum['call_duration'] + "</p>";

				addClickHandler(scontent, marker);

				myMap.addOverlay(marker);

				points.push(pt);

				hashPTs[hkey] = true;
			}
		}

		myMap.setViewport(points);
	}

	//地图事件设置函数：
	function setMapEvent() {
		myMap.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		myMap.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		myMap.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		myMap.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		myMap.addControl(ctrl_nav);
		//        //向地图中添加缩略图控件import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
		// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		// myMap.addControl(ctrl_ove);
		       //向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		myMap.addControl(ctrl_sca);
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
	        type: 'scroll',
	        orient: 'vertical',
	        right: 10,
	        top: 20,
	        bottom: 20,
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

function getTCommOption(data) {

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
	for (var i = 10; i >= 0; i--) {
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

	return {
	    title: {
	        text: '通话记录',
	        left: 'center'
	    },
	    tooltip: {
	    },
	    xAxis: {
	        type: 'time',
	        data: _.keys(hashTimeStamp),
	        axisline: {
	        	show: true
	        }
	    },
	    yAxis: {
	    	type: 'category',
	    	data: _.keys(hashNumber),
	    	axisline: {
	        	show: false
	        }
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

	renderChart(id, type, chartInstance, data, subType) {
		this.init_echarts();

		if (type === "table") {
			renderTable(id);
		} else if (type === "map") {
			renderMap(id, data);
		} else if (type === "map2") {
			renderMap2(id);
		} else {
			if (!chartInstance) {
				chartInstance = echarts.init(document.getElementById(id), this.theme);	
			} 
			
			chartInstance.setOption(this.getChartOption(type, data, subType));;
		}

		return chartInstance;
	}

	getChartOption(type, data, subType) {
		var fn = {
			"bar": getBarOption,
			"network": getNetworkOption,
			"pie": getPieOption,
			"combo": getComboOption,
			"tcomm": getTCommOption
		}
		return fn[type](data, subType);
	}

	resizeChart(chartInstance) {
		if (chartInstance) {
			chartInstance.resize();	
		}
		
	}
}

module.exports = EChartsWrapper;