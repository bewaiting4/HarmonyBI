
//echart Bar	
function renderBar(echartBar) {
	echartBar.setOption({
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
			  show: false
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
		  });
}

//echart Radar		  
function renderRadar(echartRadar) {
	echartRadar.setOption({
		title: {
		  text: 'Budget vs spending',
		  subtext: 'Subtitle'
		},
		 tooltip: {
			trigger: 'item'
		},
		legend: {
		  orient: 'vertical',
		  x: 'right',
		  y: 'bottom',
		  data: ['Allocated Budget', 'Actual Spending']
		},
		toolbox: {
		  show: true,
		  feature: {
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
		polar: [{
		  indicator: [{
			text: 'Sales',
			max: 6000
		  }, {
			text: 'Administration',
			max: 16000
		  }, {
			text: 'Information Techology',
			max: 30000
		  }, {
			text: 'Customer Support',
			max: 38000
		  }, {
			text: 'Development',
			max: 52000
		  }, {
			text: 'Marketing',
			max: 25000
		  }]
		}],
		calculable: true,
		series: [{
		  name: 'Budget vs spending',
		  type: 'radar',
		  data: [{
			value: [4300, 10000, 28000, 35000, 50000, 19000],
			name: 'Allocated Budget'
		  }, {
			value: [5000, 14000, 28000, 31000, 42000, 21000],
			name: 'Actual Spending'
		  }]
		}]
	  });


}			  

//echart Funnel			  
function renderFunnel(id) {
 	echartFunnel.setOption({
		title: {
		  text: 'Echart Pyramid Graph',
		  subtext: 'Subtitle'
		},
		tooltip: {
		  trigger: 'item',
		  formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
		  show: true,
		  feature: {
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
		legend: {
		  data: ['Something #1', 'Something #2', 'Something #3', 'Something #4', 'Something #5'],
		  orient: 'vertical',
		  x: 'left',
		  y: 'bottom'
		},
		calculable: true,
		series: [{
		  name: '漏斗图',
		  type: 'funnel',
		  width: '40%',
		  data: [{
			value: 60,
			name: 'Something #1'
		  }, {
			value: 40,
			name: 'Something #2'
		  }, {
			value: 20,
			name: 'Something #3'
		  }, {
			value: 80,
			name: 'Something #4'
		  }, {
			value: 100,
			name: 'Something #5'
		  }]
		}]
	});
}			  
			  
//echart Gauge
function renderGauge(echartGauge) {
	echartGauge.setOption({
		tooltip: {
		  formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
		  show: true,
		  feature: {
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
		series: [{
		  name: 'Performance',
		  type: 'gauge',
		  center: ['50%', '50%'],
		  startAngle: 140,
		  endAngle: -140,
		  min: 0,
		  max: 100,
		  precision: 0,
		  splitNumber: 10,
		  axisLine: {
			show: true,
			lineStyle: {
			  color: [
				[0.2, 'lightgreen'],
				[0.4, 'orange'],
				[0.8, 'skyblue'],
				[1, '#ff4500']
			  ],
			  width: 30
			}
		  },
		  axisTick: {
			show: true,
			splitNumber: 5,
			length: 8,
			lineStyle: {
			  color: '#eee',
			  width: 1,
			  type: 'solid'
			}
		  },
		  axisLabel: {
			show: true,
			formatter: function(v) {
			  switch (v + '') {
				case '10':
				  return 'a';
				case '30':
				  return 'b';
				case '60':
				  return 'c';
				case '90':
				  return 'd';
				default:
				  return '';
			  }
			},
			textStyle: {
			  color: '#333'
			}
		  },
		  splitLine: {
			show: true,
			length: 30,
			lineStyle: {
			  color: '#eee',
			  width: 2,
			  type: 'solid'
			}
		  },
		  pointer: {
			length: '80%',
			width: 8,
			color: 'auto'
		  },
		  title: {
			show: true,
			offsetCenter: ['-65%', -10],
			textStyle: {
			  color: '#333',
			  fontSize: 15
			}
		  },
		  detail: {
			show: true,
			backgroundColor: 'rgba(0,0,0,0)',
			borderWidth: 0,
			borderColor: '#ccc',
			width: 100,
			height: 40,
			offsetCenter: ['-60%', 10],
			formatter: '{value}%',
			textStyle: {
			  color: 'auto',
			  fontSize: 30
			}
		  },
		  data: [{
			value: 50,
			name: 'Performance'
		  }]
		}]
	  });

}				  

//echart Line
function renderLine(echartLine) {
			 
	echartLine.setOption({
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
			  });
}

function renderNetwork(echartNetwork) {
echartNetwork.setOption({
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
});

}			 

function renderMap(id) {

	var intervalId;


    //创建和初始化地图函数：
    function initMap(){
    	if (BMap) {
    		clearInterval(intervalId)
	        createMap();//创建地图
    	    setMapEvent();//设置地图事件
        	addMapControl();//向地图添加控件
    	}
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map(id);//在百度地图容器中创建一个地图
        var point = new BMap.Point(116.464406,39.989652);//定义一个中心点坐标
        map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	// var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	// map.addControl(ctrl_nav);
 //        //向地图中添加缩略图控件
	// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	// map.addControl(ctrl_ove);
 //        //向地图中添加比例尺控件
	// var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	// map.addControl(ctrl_sca);
    }
    
    
    intervalId = setInterval(initMap, 1000);//创建和初始化地图

                    
}

function renderPie(echartPie) {
				  echartPie.setOption({
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
			  });
}

function renderMap2(id) {

	var intervalId;
    //创建和初始化地图函数：
    function initMap(){
    	if (BMap) {
    		clearInterval(intervalId);
	        createMap();//创建地图
    	    setMapEvent();//设置地图事件
        	addMapControl();//向地图添加控件
    	}
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map(id);//在百度地图容器中创建一个地图
        var point = new BMap.Point(79.928877,37.120556);//定义一个中心点坐标
        map.centerAndZoom(point,13);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    
    
    intervalId = setInterval(initMap, 1000);//创建和初始化地图
                    
}

function renderTable(id) {
	$('#' + id).dataTable();
}


class EChartsWrapper {

	init_echarts() {
		
		if( typeof (echarts) === 'undefined'){ return; }


		this.theme = {
		  color: [
			  '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
			  '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
		  ],

		  title: {
			  itemGap: 8,
			  textStyle: {
				  fontWeight: 'normal',
				  color: '#408829'
			  }
		  },

		  dataRange: {
			  color: ['#1f610a', '#97b58d']
		  },

		  toolbox: {
			  color: ['#408829', '#408829', '#408829', '#408829']
		  },

		  tooltip: {
			  backgroundColor: 'rgba(0,0,0,0.5)',
			  axisPointer: {
				  type: 'line',
				  lineStyle: {
					  color: '#408829',
					  type: 'dashed'
				  },
				  crossStyle: {
					  color: '#408829'
				  },
				  shadowStyle: {
					  color: 'rgba(200,200,200,0.3)'
				  }
			  }
		  },

		  dataZoom: {
			  dataBackgroundColor: '#eee',
			  fillerColor: 'rgba(64,136,41,0.2)',
			  handleColor: '#408829'
		  },
		  grid: {
			  borderWidth: 0
		  },

		  categoryAxis: {
			  axisLine: {
				  lineStyle: {
					  color: '#408829'
				  }
			  },
			  splitLine: {
				  lineStyle: {
					  color: ['#eee']
				  }
			  }
		  },

		  valueAxis: {
			  axisLine: {
				  lineStyle: {
					  color: '#408829'
				  }
			  },
			  splitArea: {
				  show: true,
				  areaStyle: {
					  color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
				  }
			  },
			  splitLine: {
				  lineStyle: {
					  color: ['#eee']
				  }
			  }
		  },
		  timeline: {
			  lineStyle: {
				  color: '#408829'
			  },
			  controlStyle: {
				  normal: {color: '#408829'},
				  emphasis: {color: '#408829'}
			  }
		  },

		  k: {
			  itemStyle: {
				  normal: {
					  color: '#68a54a',
					  color0: '#a9cba2',
					  lineStyle: {
						  width: 1,
						  color: '#408829',
						  color0: '#86b379'
					  }
				  }
			  }
		  },
		  map: {
			  itemStyle: {
				  normal: {
					  areaStyle: {
						  color: '#ddd'
					  },
					  label: {
						  textStyle: {
							  color: '#c12e34'
						  }
					  }
				  },
				  emphasis: {
					  areaStyle: {
						  color: '#99d2dd'
					  },
					  label: {
						  textStyle: {
							  color: '#c12e34'
						  }
					  }
				  }
			  }
		  },
		  force: {
			  itemStyle: {
				  normal: {
					  linkStyle: {
						  strokeColor: '#408829'
					  }
				  }
			  }
		  },
		  chord: {
			  padding: 4,
			  itemStyle: {
				  normal: {
					  lineStyle: {
						  width: 1,
						  color: 'rgba(128, 128, 128, 0.5)'
					  },
					  chordStyle: {
						  lineStyle: {
							  width: 1,
							  color: 'rgba(128, 128, 128, 0.5)'
						  }
					  }
				  },
				  emphasis: {
					  lineStyle: {
						  width: 1,
						  color: 'rgba(128, 128, 128, 0.5)'
					  },
					  chordStyle: {
						  lineStyle: {
							  width: 1,
							  color: 'rgba(128, 128, 128, 0.5)'
						  }
					  }
				  }
			  }
		  },
		  gauge: {
			  startAngle: 225,
			  endAngle: -45,
			  axisLine: {
				  show: true,
				  lineStyle: {
					  color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
					  width: 8
				  }
			  },
			  axisTick: {
				  splitNumber: 10,
				  length: 12,
				  lineStyle: {
					  color: 'auto'
				  }
			  },
			  axisLabel: {
				  textStyle: {
					  color: 'auto'
				  }
			  },
			  splitLine: {
				  length: 18,
				  lineStyle: {
					  color: 'auto'
				  }
			  },
			  pointer: {
				  length: '90%',
				  color: 'auto'
			  },
			  title: {
				  textStyle: {
					  color: '#333'
				  }
			  },
			  detail: {
				  textStyle: {
					  color: 'auto'
				  }
			  }
		  },
		  textStyle: {
			  fontFamily: 'Arial, Verdana, sans-serif'
		  }
		}
	}

	renderChart(id, type) {
		this.init_echarts();

		var transformFn = {
			"bar": renderBar,
			"radar": renderRadar,
			"line": renderLine,
			"network": renderNetwork,
			"map": renderMap,
			"pie": renderPie,
			"table": renderTable
		};

		var echartChart;
		if (type === "table") {
			renderTable(id);
		} else if (type === "map") {
			renderMap(id);
		} else if (type === "map2") {
			renderMap2(id);
		} else if (type === "network") {
 			echartChart = echarts.init(document.getElementById(id));
			transformFn[type](echartChart);

		} else {
 			echartChart = echarts.init(document.getElementById(id), this.theme);
			transformFn[type](echartChart);
		}
	}

}			

var wrapper;

module.exports = function() {
	if (!wrapper) {
		wrapper = new EChartsWrapper();
	}

	return wrapper;
}			