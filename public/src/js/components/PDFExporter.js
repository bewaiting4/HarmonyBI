import _ from 'lodash'
import ENUM from './Enums'

function getChartImage(id) {
	var chartNd = document.getElementById(id);
	var canvas = chartNd.getElementsByTagName("canvas")[0];
	var cvsWidth = canvas.width;
	var cvsHeight = canvas.height;
	var url = canvas.toDataURL("image/png");
    var ratio = Math.max(cvsWidth/250, cvsHeight/250) || 1;

	return {
        image: url,
        width: cvsWidth / ratio,
        height: cvsHeight / ratio
    };
}

function getMapImage(id) {
    var image = window.mapData[id];
    var ratio = Math.max(image.width/250, image.height/250) || 1;

    return {
        image: image.image,
        width: image.width / ratio,
        height: image.height / ratio
    };
}

function getNetworkImage(id) {
    var svg = d3.select('#' + id);
    var serializer = new XMLSerializer();
    var svgStr = serializer.serializeToString(svg.select("svg").node());
    var canvas = document.createElement('canvas');

    canvg(canvas, svgStr);

    return window.network[id] = {
        image: canvas.toDataURL(),
        width: canvas.width,
        height: canvas.height
    };
}

class PDFExporter {

	export(config) {
		this.download(this.getConfig(config));
	}

	getConfig(config) {
		var sus = _.filter(config.suspectTable, ['type', ENUM.CATEGORY_KEY.SUSPECT]);
		var charts = [];

		_.forEach(config.charts, function(chart, idx){
			if (chart.category === 'echarts' && chart.type !== 'map' && chart.type !== 'network') {
				charts[idx] = getChartImage(chart.id);
			} else if (chart.type === 'map') {
				charts[idx] = getMapImage(chart.id);
			} else if (chart.type === 'network') {
                charts[idx] = getNetworkImage(chart.id);
            }
		});

		var res = {
			title: config.title,
			susNumbers: _.map(sus, 'number'),
			susIdNumbers: null,//_.map(sus, 'idNubmer'),
			caseCI: config.filter.ci_from,
			charts: charts,
			contactTable: _.map(config.contactTable, function(p, idx) {
				return {
					'序号': idx+1,
					'身份判别': ENUM.CATEGORY_MAP[p.type] || "",
					'电话号码': p.number,
					'身份证号': "",
					'电话号码归属地': p.district || "",
					'语种': p.lang || "",
					'电话机型': ENUM.SERVICE_TYPE_MAP[p.IMEI] || "",
					'通话次数': p.callCount,
					'通话时长(分钟)': p.callTime,
					'紧密度': ENUM.CONNECTION_MAP[p.closeScore] || "",
//					'备注': p.notes|| "",				};
				};
			}),
			suspectTable: _.map(config.suspectTable, function(p, idx) {
				return {
					'序号': idx+1,
					'身份判别': ENUM.CATEGORY_MAP[p.type] || "",
					'电话号码': p.number,
					'身份证号': "",
					'电话号码归属地': p.district || "",
					'语种': p.lang || "",
					'续网能力': ENUM.SERVICE_TYPE_MAP[p.serviceType] || "",
					'靓号度': p.isSpecialNumber && ((p.isSpecialNumber === ENUM.SPECIAL_NUMBER_KEY.NOT) ? ENUM.SPECIAL_NUMBER_MAP[0] : ENUM.SPECIAL_NUMBER_MAP[1]) || "",					
					'案发前后紧密度': ENUM.CLOSE_MAP[p.closeScore] || "",
					'案发前后联系状况': ENUM.CONNECTION_MAP[p.connectionStatus] || "",
					'案发前后活动轨迹': ENUM.INTERSECT_MAP[p.isIntersect] || "",
					'案发前后是否在场': ENUM.PRESENT_MAP[p.isPresent] || ""
//					'备注': p.notes || "",				
				};
			}),
			filterSuspects: config.filterSuspects || []
		};

		if (config.timeFilter) {
			res.caseDate = config.timeFilter.caseDate;
			res.preHours = config.timeFilter.preHours;
			res.postHours = config.timeFilter.postHours;
		} else {
			res.caseDate = config.date_to;
			res.preHours = 48;
			res.postHours = 24;
		}		

		return res;
	}

    download(config) {
        config.title = config.title || '皮山县2017年2.14暴恐案件话单分析报告';
        var susNumbers = config.susNumbers;
        var caseDate = new moment(config.caseDate);
        var preHours = config.preHours;
        var postHours = config.postHours;
        var caseCI = config.caseCI;
        var caseLoc = config.caseLoc || '和田（0903）皮山农科所（皮山农科所）';
        var caseLat = 78.274895;
        var caseLong = 37.617298;
        var contactTable = config.contactTable;
        var suspectTable = config.suspectTable;
        var filterSuspects = config.filterSuspects;
        var charts = config.charts;

        var singleLineSpacing = 6;
        var susTableWidth = [];
        var ddd = new Date();

        function getImageBlock(index) {
            return {
                image: charts[index].image,
                width: charts[index].width || 250,
                height: charts[index].height || 250,
                margin: [0, singleLineSpacing, 0, singleLineSpacing],
                alignment: 'center'
            };
        }


        var tableWidths = [20, 40, 70, 90, 80, 30, 40, 35, 40, 40, 40, 40];
        var contactTableWidths = [20, 40, 70, 90, 80, 30, 40, 40, 40, 40];
        var MARGIN_SINGLELINE = [0, singleLineSpacing, 0, singleLineSpacing];

        function getImageTitleMargin(height) {
            var res = MARGIN_SINGLELINE.slice();

            res[1] = 300 - height;
            return res;
        }


        var dd = {
            // a string or { width: number, height: number }
            pageSize: 'A4', //[595.28, 841.89]

            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'portrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [ 72, 96, 72, 96 ],

            content: [
                // cover
                {
                    text: config.title,
                    style: 'header'
                }, {
                    text: '',
                    style: 'largetext'
                }, {
                    text: '案件简介：',
                    style: 'titleCover'
                }, {
                    text: '________________________________________________________________',
                    style: 'largetext'
                }, {
                    text: '________________________________________________________________',
                    style: 'largetext'
                }, {
                    text: '________________________________________________________________',
                    style: 'largetext'
                }, {
                    text: '________________________________________________________________',
                    style: 'largetext'
                }, {
                    text: '________________________________________________________________',
                    style: 'largetext'
                }, {
                    text: '报告单位：_________________________________',
                    style: 'titleCover',
                    absolutePosition: {
                        x: 72,
                        y: 670
                    }

                }, {
                    text: [
                        '报告日期：', {
                            text: '_________',
                            style: 'titleCover'
                        },
                        '年', {
                            text: '_________',
                            style: 'titleCover'
                        },
                        '月', {
                            text: '_________',
                            style: 'titleCover'
                        },
                        '日'
                    ],
                    style: 'titleCover',
                    absolutePosition: {
                        x: 72,
                        y: 720
                    },
                    pageBreak: 'after'                   
                },


                // page 1
                {
                    text: '案发时间:',
                    style: 'titleCover'
                }, {
                    text: [{
                            text: caseDate.year(),
                            style: 'underlineParagraph'
                        },
                        '年', {
                            text: caseDate.month() + 1,
                            style: 'underlineParagraph'
                        },
                        '月', {
                            text: caseDate.date(),
                            style: 'underlineParagraph'
                        },
                        '日', {
                            text: caseDate.hour(),
                            style: 'underlineParagraph'
                        },
                        '点', {
                            text: caseDate.minute(),
                            style: 'underlineParagraph'
                        },
                        '分'
                    ],
                    style: 'paragraph'
                }, {
                    text: [
                        '案发前', {
                            text: preHours,
                            style: 'underlineParagraph'
                        },
                        '小时至案发后', {
                            text: postHours,
                            style: 'underlineParagraph'
                        },
                        '小时'
                    ],
                    style: 'paragraph'
                }, {
                	text: '  ',
                	style: 'paragraph'
                }, {
                    text: '案发地点:',
                    style: 'titleCover'
                }, {
                    text: caseLoc,
                    style: 'underlineParagraph'
                },{
                    text: [
                        'CI:', 
                        {
                            text: caseCI,
                            style: 'underlineParagraph'
                        }
                    ],
                    style: 'paragraph'
                },{
                    text: [
                        '经纬度:', 
                        {
                            text: caseLat,
                            style: 'underlineParagraph'
                        },
                        '，',
                        {
                            text: caseLong,
                            style: 'underlineParagraph'
                        }
                    ],
                    style: 'paragraph'
                }, {
                    image: window.mapData['locMap'].image,
                    width: window.mapData['locMap'].width || 300,
                    height: window.mapData['locMap'].width || 300,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing]
                }, {
                    text: '   ',
                    style: 'paragraph'
                }, {
                    text: '案件相关人员',
                    style: 'titleCover'
                }, {
                    style: 'tableExample',
                    table: {
                        widths: [36, 72, 108, 144],
                        body: function(){                            
                            var res = [];

                            res.push(['序号', '身份', '手机号码', '身份证号']);
                            _.forEach(filterSuspects, function(o, idx) {
                                res.push([idx+1, ENUM.CATEGORY_MAP[o.type] || "", o.number || "", o.idNumber|| ""]);
                            });

                            return res;
                        }()
                    },                    
                },               

                // page 2
                {
                    text: '关联嫌疑人名单：',
                    style: 'titleStyle',
                    pageBreak: 'before',
                    pageOrientation: 'landscape',
                }, {
                    style: 'tableExample',
                    table: {
                        widths: tableWidths,
                        body: function(){
                            var res = [_.keys(suspectTable[0])];

                            _.forEach(suspectTable, function(o) {
                                res = _.concat(res, [_.values(o)]);
                            });

                            return res;
                        }()
                    }
                },

                // page 3
                {
                    text: '紧密联系人名单：',
                    style: 'titleStyle',
                    pageBreak: 'before'
                }, {
                    style: 'tableExample',
                    table: {
                        widths: contactTableWidths,
                        body: function(){
                            var res = [_.keys(contactTable[0])];

                            _.forEach(contactTable, function(o) {
                                res = _.concat(res, [_.values(o)]);
                            });

                            return res;
                        }()
                    }
                },

                // page 4
                {
                    text: '嫌疑人社会关系：',
                    style: 'titleStyle',
                    pageBreak: 'before',
                    pageOrientation: 'portrait',
                }, {
                    text: '案发前后：',
                    style: 'paragraph'
                }, {
                    image: window.network["chart1"].image,
                    width: window.network["chart1"].width || 250,
                    heigth: window.network["chart1"].height || 250,
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph',
                    margin: getImageTitleMargin(window.network["chart1"].height)
                }, {
                    image: window.network["chart1-2"].image,
                    width: window.network["chart1-2"].width || 250,
                    heigth: window.network["chart1-2"].height || 250,
                    alignment: 'center'
                }, 

                // page 5
                {
                    text: '嫌疑人社会关系地理分布：',
                    pageBreak: 'before',
                    style: 'titleStyle'
                }, {
                    text: '案发前后：',
                    style: 'paragraph'
                }, {
                    image: charts[2].image,
                    width: charts[2].width || 250,
                    height: charts[2].height || 250,
                    margin: MARGIN_SINGLELINE,
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph',
                    margin: getImageTitleMargin(charts[2].height)
                }, {
                    image: charts[3].image,
                    width: charts[3].width || 250,
                    height: charts[3].height || 250,
                    margin: MARGIN_SINGLELINE,
                    alignment: 'center'
                },

                // page 6
                {
                    text: '嫌疑人活动轨迹：',
                    pageBreak: 'before',
                    style: 'titleStyle'
                }, {
                    text: '案发前后：',
                    style: 'paragraph'
                },
                getImageBlock(4),
                {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph',
                    margin: getImageTitleMargin(getImageBlock(4).height)
                },
                getImageBlock(5),

                // page 7
                {
                    text: '嫌疑人通话时长和次数变化趋势：',
                    style: 'titleStyle',
                    pageBreak: 'before'
                }, {
                    text: '案发前后：',
                    style: 'paragraph'
                }, 
                getImageBlock(6),
                {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph',
                    margin: getImageTitleMargin(getImageBlock(6).height)
                }, 
                getImageBlock(7),

                // page 8
                {
                    text: '嫌疑人通讯特征：',
                    style: 'titleStyle',
                    pageBreak: 'before'
                }, 
                getImageBlock(9),
                {
                    text: '嫌疑人手机型号：',
                    style: 'titleStyle',
                    margin: getImageTitleMargin(getImageBlock(9).height)
                }, 
                getImageBlock(8)
            ],
            footer: function(page, pages) {
                if (page > 1) {
                    return { 
                        columns: [ 
                            ddd.toLocaleDateString() + " " + ddd.toLocaleTimeString() + " " + window.appConfig.user,
                            { 
                                alignment: 'right',
                                text: [
                                    { text: "第"},
                                    { text: page.toString(), italics: true },
                                    '/',
                                    { text: pages.toString(), italics: true },
                                    { text: "页"}
                                ]
                            }
                        ],
                        margin: [ 72, 60, 72, 0 ],
                        fontSize: 10
                    };                    
                }
            },
            styles: {
                largetext: {
                    fontSize: 14,
                    margin: [0, 24, 0, 24]
                },
                header: {
                    alignment: 'center',
                    fontSize: 26,
                    margin: [60,0,60,24],
                },

                titleStyle: {
                    fontSize: 20,
                    margin: MARGIN_SINGLELINE
                },

                titleCover: {
                    fontSize: 20,
                    margin: MARGIN_SINGLELINE
                },

                paragraph: {
                    fontSize: 14,
                    bold: false,
                    margin: MARGIN_SINGLELINE
                },

                underlineParagraph: {
                    decoration: 'underline',
                    fontSize: 14,
                    bold: false,
                    margin: MARGIN_SINGLELINE
                },

                tableExample: {
                    alignment: 'center',
                    margin: [0, 5, 0, 15],
                    fontSize: 10
                }           
            },
            defaultStyle: {
                font: 'simsun',
                fontSize: 14,
                bold: false,
                margin: MARGIN_SINGLELINE
            }
        };
        pdfMake.fonts = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            },
            simsun: {
                normal: ['simsun.ttc', 'SimSun', 'NSimSun'],
                bold: ['simsun.ttc', 'SimSun', 'NSimSun'],
                italics: ['simsun.ttc', 'SimSun', 'NSimSun'],
                bolditalics: ['simsun.ttc', 'SimSun', 'NSimSun'],
            }
        };
        pdfMake.createPdf(dd).open();
    }
}

var expoter;

module.exports = function () {
    if (!expoter) {
        expoter = new PDFExporter();
    }

    return expoter;
};
