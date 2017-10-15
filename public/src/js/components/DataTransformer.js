import _ from 'lodash'
import ENUM from './Enums'

module.exports = {
	transform: function(docData) {
		var suspects = docData.suspectTable;
		var contacts = docData.contactTable;
		var vizData = docData.vizData;
		var threeMonthCalls = docData.threeMonthCalls;
		var pplInfo = {};
		var res = {};

		function feedPplInfo(info, item, PREFIX) {
			if (!info[item[PREFIX + '_number']]) {
				info[item[PREFIX + '_number']] = {};
			}

			var infoItem = info[item[PREFIX + '_number']];
			if (infoItem.number === undefined) {
				infoItem.number = item[PREFIX + '_number'];
			}
			if (infoItem.name === undefined) {
				infoItem.name = item[PREFIX + '_name'];
			}
			if (infoItem.district === undefined) {
				infoItem.district = item[PREFIX + '_district'];	
			}

			if (infoItem.lang === undefined) {
				infoItem.lang = item[PREFIX + '_lang'];
			}

			if (infoItem.IMEI === undefined) {
				infoItem.IMEI = item[PREFIX + '_IMEI'];
			}
		}

		_.forEach(vizData, function(item) {
			feedPplInfo(pplInfo, item, 'f');
			feedPplInfo(pplInfo, item, 't');
		});

		_.forEach(suspects, function(p) {
			var info = pplInfo[p.number];
			if (info && info.type === undefined) {
				info.type = p.type;
			}
		})

		function getPplTable(list, getProps) {
			return _.map(list, function(p, idx) {
				var info = pplInfo[p.number];

				return _.assign({}, p, getProps(p), {
					index: idx + 1,
					type: p.type,
					district: info && info.district,
					lang: info && info.lang,
					IMEI: info && info.IMEI
				});
			});
		}

		function getSuspectProps(p) {
			return {
				number: p.number,
				closeScore: p.closeScore,
				serviceType: p.serviceType,
				isSpecialNumber: p.isSpecialNumber && ((p.isSpecialNumber === ENUM.SPECIAL_NUMBER_KEY.NOT) ? ENUM.SPECIAL_NUMBER_KEY.NOT : ENUM.SPECIAL_NUMBER_KEY.YES),
				connectionStatus: p.connectionStatus,
				isIntersect: p.isIntersect,
				isPresent: p.isPresent
			};
		}

		function getContactProps(p) {
			return {
				number: p.number,
				closeScore: p.closeScore,
				callTime: Math.round(p.callTime)
			}
		}

		res.suspectTable = getPplTable(suspects, getSuspectProps);
		res.contactTable = getPplTable(contacts, getContactProps);

		res.vizData = _.map(vizData, function(item, idx) {
			return _.assign(item, {
				index: idx + 1,
				f_type: pplInfo[item.f_number] && pplInfo[item.f_number].type,
				t_type: pplInfo[item.t_number] && pplInfo[item.t_number].type
			});
		});

		res.threeMonthCalls = _.map(threeMonthCalls, function(item, idx) {
			return _.assign(item, {
				index: idx + 1,
				f_type: pplInfo[item.f_number] && pplInfo[item.f_number].type,
				t_type: pplInfo[item.t_number] && pplInfo[item.t_number].type
			});
		});

		res.ciList = {};
		_.forEach(vizData, function(item, idx) {
			if (item['f_ci'] && !res.ciList[item['f_ci']]) {
				res.ciList[item['f_ci']] = {
					lat: item['f_lat'],
					long: item['f_long']
				}
			}

			if (item['t_ci'] && !res.ciList[item['t_ci']]) {
				res.ciList[item['t_ci']] = {
					lat: item['t_lat'],
					long: item['t_long']
				}
			}

		});

		// init global colormapping
		var arrColor = [
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
		clrIdx = 0,
		susClr = window.HarmonyGlobal.susClr = window.HarmonyGlobal.susClr || {};

		_.forEach(suspects, function(o) {
			if (o.type === ENUM.CATEGORY_KEY.SUSPECT) {
				susClr[o.number] = arrColor[clrIdx%arrColor.length];
				clrIdx++;
			}
		});
		window.HarmonyGlobal.clrIdx = clrIdx;

		return res;
	}
}