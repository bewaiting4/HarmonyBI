let TICK_COLOR = '#8494A5'; // grey

module.exports = {
	theme: {
		"color": [
			"#1266D8",
			"#DE0CA3",
			"#5085E3",
			"#088490",		
			"#515DA9",
			"#41A5C4",
			"#F996F1",
			"#8B56F0",
			"#C79FBE",
			"#BF4B9A"	
			// "#1266D8",
			// "#5085E3",
			// "#515DA9",
			// "#41A5C4",
			// "#DE0CA3",
			// "#088490",
			// "#F996F1",
			// "#8B56F0",
			// "#C79FBE",
			// "#BF4B9A"
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
			"axisLine": { "lineStyle": { "color": "#1266D8" } },
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
	},
	tickStyle: {
		axisLine: {
			lineStyle: {
				color: TICK_COLOR
			}
		},
		axisLabel: {
			color: TICK_COLOR
		}			
	},
	dataZoomStyle: {
		fillerColor: 'rgba(132, 148, 165, 0.25)',
		textStyle: {
			color: TICK_COLOR
		},
		handleColor: TICK_COLOR, // 设置handle颜色，与文档不符，疑库bug
        handleSize: '80%',		
	}
};