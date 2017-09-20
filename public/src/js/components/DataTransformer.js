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
				info.type = ENUM.CATEGORY_MAP[p.type];
			}
		})

		function getPplTable(list, getProps) {
			return _.map(list, function(p, idx) {
				var info = pplInfo[p.number];

				return _.assign({}, getProps(p), {
					index: idx + 1,
					type: ENUM.CATEGORY_MAP[p.type],
					district: info && info.district,
					lang: info && info.lang,
					IMEI: info && info.IMEI
				})
			});
		}

		function getSuspectProps(p) {
			return {
				number: p.number,
				closeScore: ENUM.CLOSE_SCORE_MAP[p.closeScore],
				serviceType: ENUM.SERVICE_TYPE_MAP[p.serviceType],
				isSpecialNumber: ENUM.SPECIAL_NUMBER_MAP[p.isSpecialNumber],
				connectionStatus: ENUM.CONNECTION_MAP[p.connectionStatus],
				isIntersect: ENUM.INTERSECT_MAP[p.isIntersect],
				isPresent: ENUM.PRESENT_MAP[p.isPresent]
			};
		}

		function getContactProps(p) {
			return {
				number: p.number,
				closeScore: ENUM.CLOSE_SCORE_MAP[p.closeScore]
			}
		}

		res.suspectTable = getPplTable(suspects, getSuspectProps);
		res.contactTable = getPplTable(contacts, getContactProps);

		res.vizData = _.map(vizData, function(item, idx) {
			return _.assign(item, {
				index: idx + 1,
				f_type: pplInfo[item.f_number] && pplInfo[item.f_number].type,
				t_type: pplInfo[item.f_number] && pplInfo[item.t_number].type
			});
		});

		res.threeMonthCalls = _.map(threeMonthCalls, function(item, idx) {
			return _.assign(item, {
				index: idx + 1,
				f_type: pplInfo[item.f_number] && pplInfo[item.f_number].type,
				t_type: pplInfo[item.f_number] && pplInfo[item.t_number].type
			});
		});

		return res;
	}
}