var themeCfg = require('./EChartsTheme.json');

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
function getLineOption() {
	return {
		title: {
			text: 'Line Graph',
			subtext: 'Subtitle'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			x: 220,
			y: 40,
			data: ['Intent', 'Pre-order', 'Deal']
		},
		toolbox: {
			show: true,
			feature: {
				magicType: {
					show: true,
					title: {
						line: 'Line',
						bar: 'Bar',
						stack: 'Stack',
						tiled: 'Tiled'
					},
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: true,
					title: "Restore"
				},
				saveAsImage: {
					show: true,
					title: "Save Image"
				}
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: 'Deal',
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					}
				}
			},
			data: [10, 12, 21, 54, 260, 830, 710]
		}, {
			name: 'Pre-order',
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					}
				}
			},
			data: [30, 182, 434, 791, 390, 30, 10]
		}, {
			name: 'Intent',
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					}
				}
			},
			data: [1320, 1132, 601, 234, 120, 90, 20]
		}]
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

function getPieOption() {
	return {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x: 'center',
			y: 'bottom',
			data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
		},
		toolbox: {
			show: true,
			feature: {
				magicType: {
					show: true,
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore: {
					show: true,
					title: "Restore"
				},
				saveAsImage: {
					show: true,
					title: "Save Image"
				}
			}
		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '48%'],
			data: [{
				value: 335,
				name: 'Direct Access'
			}, {
				value: 310,
				name: 'E-mail Marketing'
			}, {
				value: 234,
				name: 'Union Ad'
			}, {
				value: 135,
				name: 'Video Ads'
			}, {
				value: 1548,
				name: 'Search Engine'
			}]
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
			return;
		}


		this.theme = themeCfg;
	}

	renderChart(id, type, chartInstance) {
		this.init_echarts();

		// var transformFn = {
		// 	"bar": renderBar.bind(this),
		// 	"line": renderLine,
		// 	"network": renderNetwork,
		// 	"map": renderMap,
		// 	"pie": renderPie,
		// 	"table": renderTable
		// };

		if (type === "table") {
			renderTable(id);
		} else if (type === "map") {
			renderMap(id);
		} else if (type === "map2") {
			renderMap2(id);
		} else {
			if (!chartInstance) {
				chartInstance = echarts.init(document.getElementById(id), type !== "network" && this.theme);	
			} 
			
			chartInstance.setOption(this.getChartOption(type));;
		}

		return chartInstance;
	}

	getChartOption(type) {
		var fn = {
			"bar": getBarOption,
			"network": getNetworkOption,
			"line": getLineOption,
			"pie": getPieOption
		}
		return fn[type]();
	}

	resizeChart(chartInstance) {
		chartInstance.resize();
	}
}

module.exports = EChartsWrapper;