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
    COLOR_MAP: {
        LV_ONE: '#FF5959',
        LV_TWO: '#FFACAC',
        LV_THREE: '#E3E3E3',
        DEFAULT: 'E6E6E6'
    },
    // 身份
    // server:: enumSuspectType.js
    CATEGORY_KEY: {
        UNKNOWN: 0,        
        SUSPECT: 1,
        VICTIM: 2,
    },
    CATEGORY_MAP: {
        0: "未知",        
    	1: "嫌疑人",
    	2: "受害人"
    },
    CATEGORY_SCORE_MAP: {
        0: 0,        
        1: 1,
        2: 2,
    },
    CATEGORY_MAP_REVERSE: {
        "未知": 0,
        "嫌疑人": 1,
        "受害人": 2
    },
    // 在线时长---对应续网能力
    // server:: enumServiceType.js
    ONLINE_KEY: {
        LONG: 0,
        SHORT: 1,
        TEMP: 2,
        UNKNOWN: 3      
    },
    ONLINE_MAP: {
    	0: "2年以上",
    	1: "2年以内",
    	2: "6个月内",
        3: "未知"
    },
    ONLINE_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2,
        3: 1
    },
    // 续网能力
    // server:: enumServiceType.js
    SERVICE_TYPE_KEY: {
        LONG: 0,
        SHORT: 1,
        TEMP: 2,
        UNKNOWN: 3
    },
    SERVICE_TYPE_MAP: {
    	0: "长期号",
    	1: "短期号",
    	2: "临时号",
    	3: "未知"
    },
    SERVICE_TYPE_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2,
        3: 1
    }, 
    // 靓号度
    SPECIAL_NUMBER_KEY: {
        NOT: 0,
        YES: 1
    },    
    SPECIAL_NUMBER_MAP: {
    	0: "非靓号",
        1: "靓号"
    },
    SPECIAL_NUMBER_SCORE_MAP: {
        0: 0,
        1: 1
    },

    // 紧密度
    CLOSE_KEY: {
        LITTLE: 0,
        OFTEN: 1,        
        CLOSE: 2,
        UNKNOWN: 3
    },
    CLOSE_MAP: {
        2: "紧密联系",
        1: "时常联系",
        0: "不常联系",
        3: "未知"
    },
    CLOSE_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2,
        3: 1
    },

    // 联络状况
    CONNECTION_KEY: {
        NORMAL: 0,
        UNKNOWN: 1,
        UNNORMAL: 2
    },
    CONNECTION_MAP: {
    	0: "无异常",
    	1: "未知",
    	2: "联络异常"
    },
    CONNECTION_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2
    },

    // 活动轨迹
    INTERSECT_KEY: {
        NOT: 0,
        UNKNOWN: 1,
        YES: 2
    },
    INTERSECT_MAP: {
    	0: "无交集",
    	1: "未知",
    	2: "有交集"
    },
    INTERSECT_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2
    },

    // 在场情况
    PRESENT_KEY: {
        NOT: 0,
        UNKNOWN: 1,
        YES: 2
    },
    PRESENT_MAP: {
    	0: "不在现场",
    	1: "未知",
    	2: "去过现场"
    },
    PRESENT_SCORE_MAP: {
        0: 0,
        1: 1,
        2: 2
    }
}