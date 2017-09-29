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

			if (datum.type === 1) {
				calc(datum['IMEI'], res);
			}
		}

		return res;
	}

	var phoneTypes = getPhoneTypeList(data);
//	var attrElems = _.keys(_.sortBy(phoneTypes, [function(value) {return value}], ['desc']));

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

	var attrElems = _.take(_.sortBy(chartData, function(d) {return -d.value}), 5).map(function(d){return d.name;});

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

module.exports = {
	getChartOption: getPieOption
}