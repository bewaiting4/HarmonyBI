import Theme from './EChartsThemeConfig'
import Enum from '../Enums'
import DataModel from '../../model/Model'

var dataModel = DataModel();
var staticUrl = "http://api.map.baidu.com/staticimage?";
window.mapData = window.mapData || {};

function addArrow(map, polyline, length, angleValue, color) { //绘制箭头的函数  
	var linePoint = polyline.getPath(); //线的坐标串  
	var arrowCount = linePoint.length;
	var arrows = [];
	for (var i = 1; i < arrowCount; i++) { //在拐点处绘制箭头  
		var pixelStart = map.pointToPixel(linePoint[i - 1]);
		var pixelEnd = map.pointToPixel(linePoint[i]);
		var angle = angleValue; //箭头和主线的夹角  
		var r = length; // r/Math.sin(angle)代表箭头长度  
		var delta = 0; //主线斜率，垂直时无斜率  
		var param = 0; //代码简洁考虑  
		var pixelTemX, pixelTemY; //临时点坐标  
		var pixelX, pixelY, pixelX1, pixelY1; //箭头两个点  
		if (pixelEnd.x - pixelStart.x == 0) { //斜率不存在是时  
			pixelTemX = pixelEnd.x;
			if (pixelEnd.y > pixelStart.y) {
				pixelTemY = pixelEnd.y - r;
			} else {
				pixelTemY = pixelEnd.y + r;
			}
			//已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
			pixelX = pixelTemX - r * Math.tan(angle);
			pixelX1 = pixelTemX + r * Math.tan(angle);
			pixelY = pixelY1 = pixelTemY;
		} else //斜率存在时  
		{
			delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
			param = Math.sqrt(delta * delta + 1);
			if ((pixelEnd.x - pixelStart.x) < 0) //第二、三象限  
			{
				pixelTemX = pixelEnd.x + r / param;
				pixelTemY = pixelEnd.y + delta * r / param;
			} else //第一、四象限  
			{
				pixelTemX = pixelEnd.x - r / param;
				pixelTemY = pixelEnd.y - delta * r / param;
			}
			//已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
			pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
			pixelY = pixelTemY - Math.tan(angle) * r / param;
			pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
			pixelY1 = pixelTemY + Math.tan(angle) * r / param;
		}
		var pointArrow = map.pixelToPoint(new BMap.Pixel(pixelX, pixelY));
		var pointArrow1 = map.pixelToPoint(new BMap.Pixel(pixelX1, pixelY1));
		var Arrow = new BMap.Polyline([
			pointArrow,
			linePoint[i],
			pointArrow1
		], {
			strokeColor: color,
			strokeWeight: 3,
			strokeOpacity: 0.5
		});
		map.addOverlay(Arrow);

		arrows.push(Arrow);
	}

	return arrows;
}

// function refinePolyLine(map, linePoint) {
// 	var delta = 2;
// 	var pixelStart = map.pointToPixel(linePoint[0]);
// 	var pixelEnd = map.pointToPixel(linePoint[1]);
// 	var pixelX, pixelY, pixelX1, pixelY1; 

// 	if (pixelEnd.x - pixelStart.x == 0) { //斜率不存在是时  
// 		pixelX = pixelStart.x;
// 		if (pixelEnd.y > pixelStart.y) {
// 			pixelY = pixelStart.y + r;
// 		} else {
// 			pixelY = pixelStart.y - r;
// 		}

// 		pixelX1 = pixelEnd.x;
// 		if (pixelEnd.y > pixelStart.y) {
// 			pixelY1 = pixelEnd.y - r;
// 		} else {
// 			pixelY1 = pixelEnd.y + r;
// 		}

// 		map.pixelToPoint(new BMap.Pixel(pixelTemX.x, pixelTemY))

// 	} else //斜率存在时  

// }

function createStaticMap(config, dots, lines) {

	if  (!config || !config.map || !config.id) {
		return ;
	}

	var myMap = config.map,
		id = config.id,
		viewCenter = myMap.getCenter(),
		viewZoom = myMap.getZoom() - 1,
		viewSize = myMap.getSize();

	// if (points.length > 0) {
	// 	markerUrl = '&markers=';
	// }
	// _.forEach(points, function(pt) {
	// 	markerUrl += '|' + pt.lng + ',' + pt.lat;
	// });

	var scale = 2,
		scaleUrl = '&scale=' + scale,
		dimUrl = 'width=' + viewSize.width + '&height=' + viewSize.height,
		centerUrl = '&center=' + viewCenter.lng + ',' + viewCenter.lat + '&zoom=' + viewZoom,
		markerUrl = "",
		imageUrl = staticUrl+dimUrl+centerUrl+markerUrl+scaleUrl;

	console.log(imageUrl);
	dataModel.getImageUrl(imageUrl, function(data) {
		window.mapData[id] = {
			image: data.dataUri,
			width: viewSize.width,
			height: viewSize.height
		};

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.onload = function() {
			ctx.drawImage(img,0,0); // Or at whatever offset you like
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			var clrIdx = 0,
				w1 = viewSize.width,
				h1 = viewSize.height,
				w2 = canvas.width,
				h2 = canvas.height;

			// transform from visualization size to PDF size
			function transform(pt) {
				pt.x = (pt.x - w1/2) * scale + w2 / 2;
				pt.y = (pt.y - h1/2) * scale + h2 / 2;
				return pt;
			}

			_.forEach(lines, function(path) {
				if (!path.pt1 || !path.pt2) {
					return ;
				}

				var px1 = transform(myMap.pointToPixel(path.pt1)),
					px2 = transform(myMap.pointToPixel(path.pt2));

				ctx.beginPath();
				ctx.strokeStyle = path.color || Theme.color[clrIdx++ % Theme.color.length];
				ctx.lineWidth = 2;
				ctx.moveTo(px1.x, px1.y);
				ctx.lineTo(px2.x, px2.y);
				ctx.stroke();		  
			});

			_.forEach(dots, function(dot) {
				if (!dot.pt) {
					return ;
				}
				var px = transform(myMap.pointToPixel(dot.pt));

				ctx.beginPath();
				ctx.arc(px.x, px.y, dot.raius, 0, Math.PI * 2, false);
				ctx.fillStyle = dot.color;
				ctx.fill();
			});

			window.mapData[id] = {
				image: canvas.toDataURL(),
				width: canvas.width,
				height: canvas.height
			};
		};

		img.src = data.dataUri;
	});
}

function renderMap(id, data, config, data2) {

	var intervalId,
		myMap,
		geoCoder = new BMap.Geocoder(),
		hashData2 = {},
		hashColor = {};

	var hGlobal = window.HarmonyGlobal;
	hGlobal.susPos = hGlobal.susPos || {};

	var centerUrl = "";
	var markerUrl = "";


	_.forEach(data2, function(o, idx) {
		hashData2[o.number] = o;
		hashColor[o.number] = Theme.color[idx];
	});

	function initMap() {
		if (BMap) {
			clearInterval(intervalId)
			createMap(); 
			addMarkers(data);
			setMapEvent(); 
			addMapControl(); 
		}
	}

	function createMap() {
		var map = new BMap.Map(id); 
		var zLv = 15;
		var point;
		if (config && config.mapCenter) {
			point = new BMap.Point(config.mapCenter.long, config.mapCenter.lat);
			map.centerAndZoom(point,17);
			centerUrl = '&center='+point.lng+','+point.lat+'&zoom=' + '17';
			markerUrl = '&markers=' + point.lng + ',' + point.lat;
		} else {
			point = new BMap.Point("乌鲁木齐");
			map.centerAndZoom(point,17);                     // 初始化地图,设置中心点坐标和地图级别。 
		}

		// if (config.subtype === 3) {
		// 	zLv = 11;
		// }

		// BMap.Convertor.translate(point, 0, function(point){ 
		//   var marker = new BMap.Marker (point);
		//   marker.setTitle ("This is a marker"); 
		//   map.addOverlay (marker); 

		//   map.enableScrollWheelZoom();                            //启用滚轮放大缩小 

		//   map.addEventListener('click', function(e){ 
		//     console.log(e.point);})
		// }); 
		//map.setViewport({center: point, zoom: 17});
		if (config.subtype === 3) {
			var lastCenter = point;
			var resetCnt = 0;
			var zoomHandler = setInterval(function() {
				var center = map.getCenter();
				if (!center.equals(lastCenter) || resetCnt > 15) {
					var scale = 2,
						dimUrl = 'width=' + (map.getSize().width || 300) + '&height=' + (map.getSize().height || 300),
						scaleUrl = '&scale=' + scale,
						centerUrl = '&center='+center.lng+','+center.lat+'&zoom=' + '14';

					var imageUrl = staticUrl+dimUrl+centerUrl+markerUrl;
					console.log(imageUrl);
					dataModel.getImageUrl(imageUrl, function(data) {
						window.mapData[id] = {
							image: data.dataUri,
							width: 300,
							height: 300
						};
					});
					clearInterval(zoomHandler);
				}
				map.centerAndZoom(point,14);
				resetCnt++;
			}, 1000);			
		}



		//map.setViewport([point]);

		if (config && config.lat !== undefined && config.long !== undefined) {
			var marker = new BMap.Marker(new BMap.Point(config.long, config.lat));
			map.addOverlay(marker);
		}

		myMap = window['map' + id]= map;
	}

	function addMarkers(data) {
		if (!data) {
			return ;
		}

		var bounds = null;
		var points = [];

		function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}

		function openInfo(content,e){
			var infoWindow = new BMap.InfoWindow(content); 
			myMap.openInfoWindow(infoWindow,e.point);
		}

		var hashPTs = {};
		var tracks = {};
		var connection = {};
		var clrIdx = hGlobal.clrIdx || 0;

		function generateObjects(datum, PREFIX) {
			if (datum[PREFIX + '_long'] && datum[PREFIX + '_lat'] && datum[PREFIX + '_long'] !== "0" && datum[PREFIX + '_lat'] !== "0") {
				var number = datum[PREFIX + '_number'];

				if (config.subtype === 1 && !config.filter[number]) {
					return ;
				}

				tracks[number] = tracks[number] || [];

				var hkey = datum[PREFIX + '_long'] + ':' + datum[PREFIX + '_lat'];

				var pt = new BMap.Point(
						datum[PREFIX + '_long'],
						datum[PREFIX + '_lat']
					);

				if (tracks[number].length === 0 || !pt.equals(tracks[number][tracks[number].length-1])) {
					tracks[number].push(pt);
				}

				if (hashPTs[hkey]) {
					return ; 
				}

				var clr,
					r,
					scontent;
				if (config.subtype === 2 && !config.filter[number]) {
					clr = 'grey';
					r = 10;
					scontent = "<h3>" + datum['f_number'] + "</h3>";
				} else {
					clr = hGlobal.susClr[number] || Theme.color[clrIdx++ % Theme.color.length];
					r = 25;
				    scontent = "<h3>" + datum['f_number'] + "</h3>"
						+ "<p>经过此地时间: " + datum['call_start'] + "</p>"
						+ "<p>身份证: " + datum['idNumber'] + "</p>";
				}
				var circle = new BMap.Circle(pt, r, {strokeColor: clr, fillColor: clr, strokeWeight:1, strokeOpacity:0.5});

				addClickHandler(scontent, circle);

				myMap.addOverlay(circle);

				points.push(pt);

				hashPTs[hkey] = true;
			}			
		}

		function generateConnection(datum) {
			if (datum['f_number'] && datum['t_number']) {
				var key1 = datum['f_number'] + ':' + datum['t_number'];
				var key2 = datum['t_number'] + ':' + datum['f_number'];

				if (connection[key1] || connection[key2]) {
					return ;
				}

				connection[key1] = true;

				// if (datum['f_long'] && datum['f_lat'] && datum['f_long'] !== "0" && datum['f_lat'] !== "0"
				// 	&& datum['f_long'] && datum['f_lat'] && datum['f_long'] !== "0" && datum['f_lat'] !== "0") {

				// 	connection[key1] = [
				// 		new BMap.Point(datum['f_long'], datum['f_lat']),
				// 		new BMap.Point(datum['t_long'], datum['t_lat'])
				// 	];
				// }

			}
		}


		var hashDistrict = {};
		for (var i = 0; i < data.length; i++) {
			var datum = data[i];
			generateObjects(datum, 'f');
			generateObjects(datum, 't');
			generateConnection(datum);

			if (!hashDistrict[datum['f_number']]) {
				hashDistrict[datum['f_number']] = datum['f_district'];
			}

			if (!hashDistrict[datum['t_number']]) {
				hashDistrict[datum['t_number']] = datum['t_district'];
			}
		}

		if (config.subtype === 1) {
			var lines = [];
			_.forEach(tracks, function(value, key) {
				if (value.length > 1) {
					var clr = hGlobal.susClr[key] || Theme.color[clrIdx++ % Theme.color.length];

					for (var i=0; i< value.length-1; i++) {
						var polyline = new BMap.Polyline([value[i],value[i+1]], {strokeColor:clr, fillColor: clr, strokeWeight:2, strokeOpacity:0.5});
						myMap.addOverlay(polyline);
						lines.push({
							type: 'line',							
							pt1: value[i],
							pt2: value[i+1],
							color: clr							
						});
						var arrows = addArrow(myMap, polyline, 15, Math.PI / 7, clr);

						arrows.forEach(function(arrow) {
							var p = arrow.getPath();

							lines.push({
								type: 'line',
								pt1: p[0],
								pt2: p[1],
								color: arrow.getStrokeColor()
							});

							lines.push({
								type: 'line',
								pt1: p[1],
								pt2: p[2],
								color: arrow.getStrokeColor()
							});
						});
					}			
				}
			});

			myMap.setViewport(points);

			createStaticMap({map: myMap, id: id}, points, lines);

			return ;

		} else if (config.subtype === 2) {
			var cntGeo = 0;
			var hashConnection = {};
			var mappingGeo = {};
			var dots = [];

			function handleDistrict(res, key) {
				var lat = res.lat;
				var long = res.lng;

				if(lat !== 0 && long !== 0) {
					while (hashConnection[lat + ':' + long]) {
						lat = lat + Math.random()*0.004-0.002;
						long = long + Math.random()*0.004-0.002;
					}
					hashConnection[lat + ':' + long] = true;
					mappingGeo[key] = new BMap.Point(long, lat);
					hGlobal.susPos[key] = mappingGeo[key];

					var clr = hashData2[key] && hashData2[key].type === Enum.CATEGORY_KEY.SUSPECT ? hGlobal.susClr[key] || hashColor[key] : 'grey',
						r = hashData2[key] && hashData2[key].type === Enum.CATEGORY_KEY.SUSPECT ? 15: 5,
						scontent = "<h3>" + key + "</h3>";

					var circle = new BMap.Circle(mappingGeo[key], r, {strokeColor: clr, fillColor: clr, strokeWeight:1, strokeOpacity:0.5});

					addClickHandler(scontent, circle);

					myMap.addOverlay(circle);

					dots.push({
						type: 'point',
						pt: mappingGeo[key],
						color: clr,
						radius: r
					});							
				}				
			}

			function drawConnection() {
				console.log('draw connections');
				var lines = [];
				_.forEach(connection, function(value, key) {
					var ks = key.split(':');
					if (mappingGeo[ks[0]] && mappingGeo[ks[1]]) {
						var clr = hGlobal.susClr[ks[0]] ||  hGlobal.susClr[ks[1]] || Theme.color[clrIdx++ % Theme.color.length];

						var path = [mappingGeo[ks[0]], mappingGeo[ks[1]]];						
						var polyline = new BMap.Polyline(path, {strokeColor:clr, fillColor: clr, strokeWeight:2, strokeOpacity:0.5});
						myMap.addOverlay(polyline);

						lines.push({
							type: 'line',
							pt1: path[0],
							pt2: path[1],
							color: clr
						});
					}
				});

				myMap.setViewport(_.values(mappingGeo));

				var viewTimeoutCountOut = 0;
				var viewTimeoutHandler = setInterval(function() {
					if (myMap.getCenter().lat !== 0 && myMap.getCenter().lng !== 0) {
						clearInterval(viewTimeoutHandler);
						createStaticMap({map: myMap, id: id}, dots, lines);
					}

					// 超过重测次数阈值，停止尝试
					if (viewTimeoutCountOut++ >= 10) {
						clearInterval(viewTimeoutHandler);
					}

					myMap.setViewport(_.values(mappingGeo));
				}, 500);
			}

			var cacheValue = {};
			_.forEach(hashDistrict, function(value, key) {
				if (value) {
					cntGeo++;
					// if it's in global cache
					if (hGlobal.susPos[key]) {
						handleDistrict(hGlobal.susPos[key], key);
						cntGeo--;
					// if it's in local cache
					} else if (cacheValue[value] && cacheValue[value].length > 0) {
						cacheValue[value].push(key);
					} else {
						cacheValue[value] = [key];
						// reverse geocoding
						geoCoder.getPoint(value, function(res) {
							cntGeo -= cacheValue[value].length;

							if (res) {
								for (var k in cacheValue[value]) {
									handleDistrict(res, cacheValue[value][k]);
								}	
							}

							cacheValue[value] = undefined;

							if (cntGeo <=0) {
								drawConnection();
							}
						})
					}
				}
			});

			if (cntGeo <= 0) {
				drawConnection();
			}

			return ;
		}

		myMap.setViewport(points);

		createStaticMap({map: myMap, id: id}, points);

	}

	function setMapEvent() {
		myMap.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		myMap.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		myMap.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		myMap.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_ZOOM});
		myMap.addControl(ctrl_nav);
		//        //向地图中添加缩略图控件import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
		// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		// myMap.addControl(ctrl_ove);
		       //向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		myMap.addControl(ctrl_sca);

		if (config.subtype === 3) {
			var overlaycomplete = function(e){
				config.callback(
					e.overlay.point.lat, 
					e.overlay.point.lng, 
					Math.abs(e.overlay._bounds._neLat - e.overlay._bounds._swLat)/2
				);
		    };
		    var styleOptions = {
		        strokeColor:"red",    //边线颜色。
		        //fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
		        strokeWeight: 1,       //边线的宽度，以像素为单位。
		        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
		        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
		        strokeStyle: 'solid' //边线的样式，solid或dashed。
		    }
		    //实例化鼠标绘制工具
		    var drawingManager = new BMapLib.DrawingManager(myMap, {
		        isOpen: false, //是否开启绘制模式
		        enableDrawingTool: true, //是否显示工具栏
		        enableCalculate: true,
		        drawingToolOptions: {
		        	scale: 0.5,
		            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
		            //offset: new BMap.Size(-25, 10), //偏离值
			        drawingModes : [
			            BMAP_DRAWING_CIRCLE
			        ]
		        },
		        circleOptions: styleOptions, //圆的样式
		        closeCallback: function() {
			        myMap.clearOverlays();
		        }
		    });  
			 //添加鼠标绘制工具监听事件，用于获取绘制结果
		    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
		}

    }

	intervalId = setInterval(initMap, 1000); //创建和初始化地图
}

function resetMap(id, data, config, data2) {
	var map = window['map' + id];
	if (config.subtype === 3) {
        (map.getOverlays() || []).forEach(function(overlay) {
            if (overlay._className === "Marker" || 
                overlay._className === "Circle") {
                map.removeOverlay(overlay);
            }
        });

		var point = new BMap.Point(config.mapCenter.long, config.mapCenter.lat);
		map.centerAndZoom(point, 14);

		var marker = new BMap.Marker(new BMap.Point(config.long, config.lat));
		map.addOverlay(marker);

	} 
}

module.exports = {
	renderMap: renderMap,
	resetMap: resetMap
}