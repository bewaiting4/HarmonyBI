module.exports = {
	CALLER:				{ n: '主叫',			t: 65 },
	CALLER_START:		{ n: '主叫开始',		t: 6  },
	CALLEE:				{ n: '被叫',			t: 66 },
	CALLEE_START:		{ n: '被叫开始',		t: 7  },
	RINGING:			{ n: '振铃',			t: 67 },
	CONNECTING:			{ n: '连接',			t: 70 },
	CALL_END:			{ n: '结束通话',		t: 74 },

	TEXT:				{ n: '发送短信',		t: 49 },

	BSC_INNER:			{ n: 'BSC内部切换',	t: 5  },
	BSC_OUTTER:			{ n: 'BSC外部切换',	t: 25 },
	BUSINESS_QUERY:		{ n: '补充业务查询',	t: 26 },
	TRANSFER:			{ n: '呼转',			t: 32 },
	TRANSFER_WAITING:	{ n: '呼叫等待',		t: 35 },
	LOCATE_UPDATE: 		{ n: '周期性位置更新',t: 3  },
	LOCATE_UPDATE_F: 	{ n: '强制性位置更新',t: 4  },
	START_UP:			{ n: '开机',			t: 1  },
	SHUT_DOWN:			{ n: '关机',			t: 2  },
	DTMF:				{ n: 'DTMF',		t: 30 }
};