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
		myMap = window['map' + id]= map; //将map变量存储在全局
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


module.exports = {
	renderMap: renderMap	
}