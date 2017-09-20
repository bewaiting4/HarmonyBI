// 
// 续网能力：0-长期号，1-未知，1-短期号，2-临时号；
// 
// 靓号度：0-非靓号，1-靓号；
// 
// 案发前后紧程度：0-不常联系，1-未知，1-时常联系，2-紧密联系；
// 
// 案发前后联络状况：0-无异常，1-未知，2-联络异常；
// 
// 案发前后活动轨迹：0-无交集，1-未知，2-有交集；
// 
// 案发前后是否在场：0-不在现场，1-未知，2-去过现场；
module.exports = {
	CATEGORY: {
        SUSPECT: "嫌疑人",
        VICTIM: "受害人",
        UNKNOWN: "未知"
    },
    CATEGORY_VALUE: {
        SUSPECT: 1,
        VICTIM: 2,
        UNKNOWN: 0
    },
    CATEGORY_MAP: {
    	1: "嫌疑人",
    	2: "受害人",
    	0: "未知"
    },
    ONLINE: {
        SHORT: "6个月内",
        TEMP: "2年以内",
        LONG: "2年以上",
        UNKNOWN: "未知"
    },
    ONLINE_VALUE: {
        LONG: 0,
        UNKNOWN: 1,
        SHORT: 1,
        TEMP: 2
    },
    ONLINE_MAP: {
    	0: "2年以上",
    	1: "2年以内",
    	2: "6个月内"
    },
    SERVICE_TYPE_MAP: {
    	0: "长期号",
    	// 1: "未知"
    	1: "短期号",
    	2: "临时号"
    },
    SPECIAL_NUMBER_MAP: {
    	0: "非靓号"
    },
    CLOSE_SCORE_MAP: {
    	0: "不常联系",
    	//1: "未知"
    	1: "时常联系",
    	2: "紧密联系"
    },
    CONNECTION_MAP: {
    	0: "无异常",
    	1: "未知",
    	2: "联络异常"
    },
    INTERSECT_MAP: {
    	0: "无交集",
    	1: "未知",
    	2: "有交集"
    },
    PRESENT_MAP: {
    	0: "不在现场",
    	1: "未知",
    	2: "去过现场"
    }
}