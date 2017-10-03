import _ from 'lodash'
import ENUM from './Enums'

function getChartImage(id) {
	var chartNd = document.getElementById(id);
	var canvas = chartNd.getElementsByTagName("canvas")[0];
	var cvsWidth = canvas.width;
	var cvsHeight = canvas.height;
	// if (id === 'chart4' || id === 'chart4-2' || id === 'chart7') {
	// 	console.log(canvas.getContext("2d").getImageData(0, 0, cvsWidth, cvsHeight-80));
	// 	canvas.height = canvas.heigth - 80;
	// }
	var url = canvas.toDataURL("image/png");
	//canvas.height = cvsHeight;
	return url;	
}

class PDFExporter {

	export(config) {
		this.download(this.getConfig(config));
	}

	getConfig(config) {
		var sus = _.filter(config.suspectTable, ['type', ENUM.CATEGORY_KEY.SUSPECT]);
		var charts = [];

		_.forEach(config.charts, function(chart, idx){
			if (chart.category === 'echarts' && chart.type !== 'map') {
				charts[idx] = getChartImage(chart.id);
			}
		});

		return {
			title: config.title,
			susNumbers: _.map(sus, 'number'),
			susIdNumbers: null,//_.map(sus, 'idNubmer'),
			caseDate: config.caseTime.caseDate,
			preHours: config.caseTime.preHours,
			postHours: config.caseTime.postHours,
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
					'通话时长': p.callTime,
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

        var singleLineSpacing = 6;

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
                },
                {
                    image: 'data:image/png;base64,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',
                    width: 300,
                    height: 300,
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

                            res.push(['', '身份', '手机号码', '身份证号']);
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
                        widths: _.map(_.keys(suspectTable[0]), function(){return 'auto'}),
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
                        widths: _.map(_.keys(contactTable[0]), function(){return 'auto'}),
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
                    image: config.charts[0],
                    width: 250,
                    heigth: 250,
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph'
                }, {
                    image: config.charts[1],
                    width: 250,
                    heigth: 250,
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
                    image: 'data:image/png;base64,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',
                    width: 250,
                    height: 250,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing],
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph'
                }, {
                    image: 'data:image/png;base64,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',
                    width: 250,
                    height: 250,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing],
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
                }, {
                    image: 'data:image/png;base64,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',
                    width: 250,
                    height: 250,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing],
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph'
                }, {
                    image: 'data:image/png;base64,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',
                    width: 250,
                    height: 250,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing],
                    alignment: 'center'
                },

                // page 7
                {
                    text: '嫌疑人通话时长和次数变化趋势：',
                    style: 'titleStyle',
                    pageBreak: 'before'
                }, {
                    text: '案发前后：',
                    style: 'paragraph'
                }, {
                    image: config.charts[6],
                    width: 300,
                    heigth: 300,
                    alignment: 'center'
                }, {
                    text: '平时（案发前3个月）：',
                    style: 'paragraph'
                }, {
                    image: config.charts[7],
                    width: 300,
                    heigth: 300,
                    alignment: 'center'
                }, 

                // page 8
                {
                    text: '嫌疑人通讯特征：',
                    style: 'titleStyle',
                    pageBreak: 'before'
                }, {
                    image: config.charts[9],
                    width: 300,
                    heigth: 300,
                    alignment: 'center'
                }, {
                    text: '嫌疑人手机型号：',
                    style: 'titleStyle'
                }, {
                    image: config.charts[8],
                    width: 300,
                    heigth: 300,
                    alignment: 'center'
                }
            ],
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
                    margin: [0, singleLineSpacing, 0, singleLineSpacing]
                },

                titleCover: {
                    fontSize: 20,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing]
                },

                paragraph: {
                    fontSize: 14,
                    bold: false,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing]
                },

                underlineParagraph: {
                    decoration: 'underline',
                    fontSize: 14,
                    bold: false,
                    margin: [0, singleLineSpacing, 0, singleLineSpacing]
                },

                tableExample: {
                    alignment: 'center',
                    margin: [0, 5, 0, 15],
                    fontSize: 11
                }           
            },
            defaultStyle: {
                font: 'simsun',
                fontSize: 14,
                bold: false,
                margin: [0, singleLineSpacing, 0, singleLineSpacing]                
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

	// export() {
		// var doc = new jsPDF("p", "pt");
		// var chartNd = document.getElementById("chart1");
		// var canvas = chartNd.getElementsByTagName("canvas")[0];
		// var cvsWidth = canvas.width;
		// var cvsHeight = canvas.height;
		// var url = canvas.toDataURL("image/png");
		// var pdfWidth = doc.internal.pageSize.width;
		// var pdfHeight = doc.internal.pageSize.height;

		// // add title
		// doc.text("新疆和田地区皮山县2.11特大暴恐案件分析报告", 50, 30);

		// // add chart
		// doc.addImage(
		// 	url,
		// 	"JPEG",
		// 	pdfWidth / 4,
		// 	60,
		// 	pdfWidth / 2,
		// 	pdfWidth / 2 * cvsHeight / cvsWidth
		// );

		// // add table
		// var columns = ["f_number", "t_number", "call_start", "call_duration"];
		// var rows = [];
		// _.forEach(this.state.docData.vizData, function(row) {
		// 	var newRow = [];
		// 	_.forEach(columns, function(prop) {
		// 		newRow.push(row[prop]);
		// 	});
		// 	rows.push(newRow);
		// });
		// doc.autoTable(columns, rows, {
		// 	margin: { top: 60 + pdfWidth / 2 * cvsHeight / cvsWidth + 50 }
		// });

		// save document
		//doc.save('报告.pdf');
		// doc.output("dataurlnewwindow");
	// }
}

var expoter;

module.exports = function () {
    if (!expoter) {
        expoter = new PDFExporter();
    }

    return expoter;
};
