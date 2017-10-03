import Theme from './EChartsThemeConfig'
import Enum from '../Enums'

function addArrow(map, polyline, length, angleValue, color) { //绘制箭头的函数  
	var linePoint = polyline.getPath(); //线的坐标串  
	var arrowCount = linePoint.length;
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
	}
}

function renderMap(id, data, config, data2) {

	var intervalId,
		myMap,
		geoCoder = new BMap.Geocoder(),
		hashData2 = {},
		hashColor = {};


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
		var clrIdx = 0;

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
					clr = Theme.color[clrIdx++ % Theme.color.length];
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

				if (datum['f_long'] && datum['f_lat'] && datum['f_long'] !== "0" && datum['f_lat'] !== "0"
					&& datum['f_long'] && datum['f_lat'] && datum['f_long'] !== "0" && datum['f_lat'] !== "0") {

					connection[key1] = [
						new BMap.Point(datum['f_long'], datum['f_lat']),
						new BMap.Point(datum['t_long'], datum['t_lat'])
					];
				}

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
			_.forEach(tracks, function(value, key) {
				if (value.length > 1) {
					var clr = Theme.color[clrIdx++ % Theme.color.length];

					for (var i=0; i< value.length-1; i++) {
						var polyline = new BMap.Polyline([value[i],value[i+1]], {strokeColor:clr, fillColor: clr, strokeWeight:2, strokeOpacity:0.5});
						myMap.addOverlay(polyline);
						addArrow(myMap, polyline, 15, Math.PI / 7, clr);						
					}			
				}
			});			
		} else if (config.subtype === 2) {
			var cntGeo = 0;
			var hashConnection = {};
			var mappingGeo = {};

			_.forEach(hashDistrict, function(value, key) {
				if (value) {
					cntGeo++;
					geoCoder.getPoint(value, function(res) {
						cntGeo--;

						if (res) {
							var lat = res.lat;
							var long = res.lng;

							if(lat !== 0 && long !== 0) {
								while (hashConnection[lat + ':' + long]) {
									lat = lat + Math.random()*0.004-0.002;
									long = long + Math.random()*0.004-0.002;
								}
								hashConnection[lat + ':' + long] = true;
								mappingGeo[key] = new BMap.Point(long, lat);	

								var clr = hashData2[key] && hashData2[key].type === Enum.CATEGORY_KEY.SUSPECT ? hashColor[key] : 'grey',
									r = hashData2[key] && hashData2[key].type === Enum.CATEGORY_KEY.SUSPECT ? 15: 5,
									scontent = "<h3>" + key + "</h3>";

								var circle = new BMap.Circle(mappingGeo[key], r, {strokeColor: clr, fillColor: clr, strokeWeight:1, strokeOpacity:0.5});

								addClickHandler(scontent, circle);

								myMap.addOverlay(circle);										
							}
						}

						if (cntGeo <=0) {
							console.log('draw connections');
							console.log(mappingGeo);
							console.log(hashConnection);
							_.forEach(connection, function(value, key) {
								var clr = Theme.color[clrIdx++ % Theme.color.length];
								var ks = key.split(':');
								if (mappingGeo[ks[0]] && mappingGeo[ks[1]]) {
									var path = [mappingGeo[ks[0]], mappingGeo[ks[1]]];
									var polyline = new BMap.Polyline(path, {strokeColor:clr, fillColor: clr, strokeWeight:2, strokeOpacity:0.5});
									myMap.addOverlay(polyline);
								}
							});

							myMap.setViewport(_.values(mappingGeo));

						}
					})
				}
			});

			return ;
		}

		myMap.setViewport(points);
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
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		myMap.addControl(ctrl_nav);
		//        //向地图中添加缩略图控件import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
		// var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		// myMap.addControl(ctrl_ove);
		       //向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		myMap.addControl(ctrl_sca);

	    var overlays = [];
		var overlaycomplete = function(e){
			if (config.subtype === 3) {
				config.callback(
					e.overlay.point.lat, 
					e.overlay.point.lng, 
					Math.abs(e.overlay._bounds._neLat - e.overlay._bounds._swLat)/2
				);
			}
	        overlays.push(e.overlay);
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
	            offset: new BMap.Size(5, 5), //偏离值
		        drawingModes : [
		            BMAP_DRAWING_CIRCLE
		        ]
	        },
	        circleOptions: styleOptions, //圆的样式
	        closeCallback: function() {
				for(var i = 0; i < overlays.length; i++){
		            myMap.removeOverlay(overlays[i]);
		        }
		        overlays.length = 0   
	        }
	    });  
		 //添加鼠标绘制工具监听事件，用于获取绘制结果
	    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    }

	intervalId = setInterval(initMap, 1000); //创建和初始化地图
}

module.exports = {
	renderMap: renderMap	
}