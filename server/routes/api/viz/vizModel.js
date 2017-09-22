const logger = require('../../../util/logger');
const call = require('../../../db/call/call');
const service = require('../../../db/service/service');

const enumSuspectType = require('../../../db/suspect/enumSuspectType');

const enumVizMetrics = require('./enumVizMetrics'),
    enumClose = enumVizMetrics.CLOSE,
    enumConnection = enumVizMetrics.CONNECTION,
    enumLocation = enumVizMetrics.LOCATION,
    enumPresent = enumVizMetrics.PRESENT;

function getVizData(filter) {

    // STEP 1: Get call record for suspects from database.
    return call.getData(filter)
        .then(function (modelData) {
            (filter.numbers || []).forEach(function (numberObj) {
                if (!modelData.numbers[numberObj.number]) {
                    modelData.numbers[numberObj.number] = {
                        callData: []
                    };
                }
            });

            return modelData;
        })
        // STEP 2: 续网能力 and 靓号.
        .then(function (modelData) {
            // Get number service status and special number type.
            return service.getData(Object.keys(modelData.numbers), modelData);;
        })
        // STEP 3: Get call records for all related numbers.
        .then(function (modelData) {
            let callPromises = [modelData];

            logger.log('Getting call data for ' + Object.keys(modelData.numbers).length + ' numbers.');

            // Use a fake filter to retrive call records from database.
            Object.keys(modelData.numbers).forEach(function (number) {
                callPromises.push(call.getData({
                    date_from: filter.date_from,
                    date_to: filter.date_to,
                    ci_from: [],
                    ci_to: [],
                    district: [],
                    suspects: [{
                        number: number
                    }],
                    unknowns: [],
                    victims: filter.victims
                }));
            });

            return Promise.all(callPromises);
        })
        // STEP 4: 紧密度（通讯强度） and 联络状况 and 活动轨迹 and 是否在场.
        .then(function (callDatas) {
            let modelData = callDatas[0];

            callDatas.forEach(function (data, i) {
                if (i > 0) {
                    let number = data.filter.suspects[0].number;

                    modelData.numbers[number].callData = data.vizData;

                    delete data.filter;
                }
            });

            calculateMetrics(filter, modelData);

            return modelData;
        })
        // STEP 5: Generate 嫌疑人名单 table.
        .then(function (modelData) {
            let numbers = Object.keys(modelData.numbers),
                suspectTable = [];

            // Mark suspect type.
            numbers.forEach(function (number) {
                let numberObj = modelData.numbers[number];

                if (filter.suspects.filter(function (suspect) {
                        return suspect.number === number
                    }).length > 0) {
                    numberObj.type = enumSuspectType.SUSPECT;
                } else if (filter.unknowns.filter(function (unknown) {
                        return unknown.number === number
                    }).length > 0) {
                    numberObj.type = enumSuspectType.UNKNOWN;
                } else if (filter.victims.filter(function (victim) {
                        return victim.number === number
                    }).length > 0) {
                    numberObj.type = enumSuspectType.VICTIM;
                }
            });

            // Get metrics sum.
            let getRate = function getRate(number) {
                let rate = 0,
                    numberObj = modelData.numbers[number],
                    type = numberObj.type;

                if (type === enumSuspectType.SUSPECT) {
                    rate += 200;;
                } else if (type === enumSuspectType.UNKNOWN) {
                    rate += 100;
                } else if (type === enumSuspectType.VICTIM) {
                    rate -= 100;
                }

                return rate +
                    numberObj.serviceType +
                    (numberObj.isSpecialNumber ? 1 : 0) +
                    numberObj.closeScore +
                    numberObj.connectionStatus +
                    numberObj.isIntersect +
                    numberObj.isPresent;
            };

            // Sort by suspect score.
            numbers.sort(function (num1, num2) {
                let rate = getRate(num2) - getRate(num1);

                return rate === 0 ? (modelData.numbers[num2].closeValue - modelData.numbers[num1].closeValue) : rate;
            });

            let total = filter.suspects.length + filter.unknowns.length + 10;
            numbers.forEach(function (number, i) {
                let numberObj = modelData.numbers[number],
                    isVictim = numberObj.type === enumSuspectType.VICTIM;

                if (i < total || isVictim) {
                    let id,
                        district,
                        lang,
                        IMEI;

                    // Find id, district, language and IMEI.
                    for (let call in numberObj.callData) {
                        if (call.f_number === number) {
                            id = call.f_id;
                            district = call.f_district;
                            lang = call.f_district;
                            IMEI = call.f_IMEI;
                        } else if (call.t_number === number) {
                            id = call.t_id;
                            district = call.t_district;
                            lang = call.t_district;
                            IMEI = call.t_IMEI;
                        }

                        if (district && lang && IMEI) {
                            break;
                        }
                    }

                    let suspect = {
                        type: numberObj.type === undefined ? enumSuspectType.UNKNOWN : numberObj.type,
                        number: number,
                        id: id,
                        district: district,
                        lang: lang,
                        IMEI: IMEI
                    };

                    if (!isVictim) {
                        suspect.serviceType = numberObj.serviceType;
                        suspect.isSpecialNumber = numberObj.isSpecialNumber;
                        suspect.closeScore = numberObj.closeScore;
                        suspect.connectionStatus = numberObj.connectionStatus;
                        suspect.isIntersect = numberObj.isIntersect;
                        suspect.isPresent = numberObj.isPresent;
                    }

                    suspectTable.push(suspect);
                }
            });

            modelData.suspectTable = suspectTable;

            return modelData;
        })
        // STEP 6: Generate 紧密联系人 table.
        .then(function (modelData) {
            let numbers = Object.keys(modelData.numbers),
                contactTable = [];

            // Get metrics sum.
            let getRate = function getRate(number) {
                let rate = 0,
                    numberObj = modelData.numbers[number],
                    type = numberObj.type;

                if (type === enumSuspectType.SUSPECT) {
                    rate += 200;
                } else if (type === enumSuspectType.UNKNOWN) {
                    rate += 100;
                } else if (type === enumSuspectType.VICTIM) {
                    rate -= 100;
                }

                return rate + numberObj.closeScore;
            };

            // Sort by suspect score.
            numbers.sort(function (num1, num2) {
                let rate = getRate(num2) - getRate(num1);

                rate = rate === 0 ? (modelData.numbers[num2].closeValue - modelData.numbers[num1].closeValue) : rate;

                return rate === 0 ? (modelData.numbers[num2].callCount - modelData.numbers[num1].callCount) : rate;
            });

            let total = filter.suspects.length + filter.unknowns.length + 10;
            numbers.forEach(function (number, i) {
                let numberObj = modelData.numbers[number],
                    isVictim = numberObj.type === enumSuspectType.VICTIM;

                if (i < total && !isVictim) {
                    let id,
                        district,
                        lang,
                        IMEI;

                    // Find id, district, language and IMEI.
                    for (let call in numberObj.callData) {
                        if (call.f_number === number) {
                            id = call.f_id;
                            district = call.f_district;
                            lang = call.f_district;
                            IMEI = call.f_IMEI;
                        } else if (call.t_number === number) {
                            id = call.t_id;
                            district = call.t_district;
                            lang = call.t_district;
                            IMEI = call.t_IMEI;
                        }

                        if (district && lang && IMEI) {
                            break;
                        }
                    }

                    let contact = {
                        type: numberObj.type === undefined ? enumSuspectType.UNKNOWN : numberObj.type,
                        number: number,
                        id: id,
                        district: district,
                        lang: lang,
                        IMEI: IMEI
                    };

                    contact.callCount = numberObj.callCount;
                    contact.callTime = numberObj.callTime;
                    contact.closeScore = numberObj.closeScore;

                    contactTable.push(contact);
                }
            });

            modelData.contactTable = contactTable;

            return modelData;
        })
        // STEP 7: Get 3 months call records for suspect numbers.
        .then(function (modelData) {
            let callPromises = [modelData],
                dateTo = filter.date_to,
                dateFrom = new Date(dateTo.toGMTString).setDate(dateTo.getDate() - 90);

            logger.log('Getting three month call data.');

            // Use a fake filter to retrive 3 months call records from database.
            return call.getData({
                date_from: dateFrom,
                date_to: dateTo,
                ci_from: [],
                ci_to: [],
                district: [],
                suspects: filter.suspects,
                unknowns: filter.unknowns,
                victims: filter.victims
            }).then(function (threeMonthCalls) {
                modelData.threeMonthCalls = threeMonthCalls.vizData;

                return modelData;
            });
        });
}

function calculateMetrics(filter, modelData) {
    const CONNECTION_THRESHOLD = 300;

    let numbers = modelData.numbers,
        suspects = filter.suspects,
        hasMultipleSuspects = suspects.length > 1,
        daySpan = (filter.date_to - filter.date_from) / 86400000;

    // Pre-collect suspects' location.
    let suspectLocation = [];
    suspects.forEach(function (suspect) {
        let callData = numbers[suspect.number].callData;

        callData.forEach(function (call) {
            let isFrom = call.f_number === suspect.number,
                lat = isFrom ? call.f_lat : call.t_lat,
                long = isFrom ? call.f_long : call.t_long,
                ci = isFrom ? call.f_CI : call.t_CI;

            if (lat && long || ci) {
                suspectLocation.push({
                    lat: lat,
                    long: long,
                    ci: ci,
                    call_start: call.call_start
                });
            }
        });

    });

    // Calculate metrics for each number.
    for (let number in numbers) {
        let numberObj = numbers[number];

        let isSuspect = suspects.filter(function (suspect) {
            return suspect.number === number;
        }).length > 0;

        // Calculate 紧密度.
        let callCount = 0,
            connectedCallCount = 0,
            callTime = 0;

        // Calculate 通讯强度.
        let callCount_s = 0,
            connectedCallCount_s = 0,
            callTime_s = 0;

        // Calculate 联络状况.
        let hasConnection = false;

        numberObj.callData.forEach(function (call) {
            // If more than one suspects OR not suspect.
            if ((isSuspect && hasMultipleSuspects) || (!isSuspect && suspects.length > 0)) {

                let isWithSuspects = suspects.filter(function (suspect) {
                    // Filter out itself if is suspect.
                    return (isSuspect && suspect.number !== number || !isSuspect) &&
                        (call.f_number === suspect.number || call.t_number === suspect.number);
                }).length > 0;

                if (isWithSuspects) {
                    callCount++;
                    if (call.call_duration) {
                        connectedCallCount++;
                        callTime += parseInt(call.call_duration || 0, 10);
                    }
                    hasConnection = true;
                }
            }

            // Count 通讯强度.
            callCount_s++;
            if (call.call_duration) {
                connectedCallCount_s++;
                callTime_s += parseInt(call.call_duration || 0, 10);
            }

            // Check 活动轨迹
            if (numberObj.isIntersect !== enumLocation.INTERSECT) {
                let isFrom = call.f_number === number,
                    lat = isFrom ? call.f_lat : call.t_lat,
                    long = isFrom ? call.f_long : call.t_long,
                    ci = isFrom ? call.f_CI : call.t_CI;

                if (!(lat && long) && !ci) {
                    numberObj.isIntersect = enumLocation.UNKNOWN;
                } else {
                    suspectLocation.forEach(function (location) {
                        let call_start = new Date(location.call_start);

                        if (Math.abs(call_start - new Date(call.call_start)) <= 7200000) {
                            if (location.lat && location.long &&
                                location.lat === lat && location.long === long) {
                                numberObj.isIntersect = enumLocation.INTERSECT;
                            } else if (location.ci && location.ci === ci) {
                                numberObj.isIntersect = enumLocation.INTERSECT;
                            }
                        }
                    });
                }
            }

            // Check 是否在场.
            if (numberObj.isPresent !== enumPresent.YES) {
                let isFrom = call.f_number === number,
                    lat = isFrom ? call.f_lat : call.t_lat,
                    long = isFrom ? call.f_long : call.t_long,
                    ci = isFrom ? call.f_CI : call.t_CI;

                if (!(lat && long) && !ci) {
                    numberObj.isPresent = enumPresent.UNKNOWN;
                } else if (filter.lat && filter.long && filter.radius &&
                    ((filter.lat - lat) * (filter.lat - lat) +
                        (filter.long - long) * (filter.long - long) -
                        filter.radius * filter.radius < 0)) {
                    numberObj.isPresent = enumPresent.YES;
                } else if (filter.ci_from.length > 0 && filter.ci_from.indexOf(ci) !== -1 ||
                    filter.ci_to.length > 0 && filter.ci_to.indexOf(ci) !== -1) {
                    numberObj.isPresent = enumPresent.YES;
                }
            }
        });

        // Get 紧密度（通讯强度） result.
        let closeScore_s = (callCount_s / daySpan) * (callTime_s / (connectedCallCount_s || 1));

        if ((isSuspect && hasMultipleSuspects) || (!isSuspect && suspects.length > 0)) {
            let closeScore = (callCount / daySpan) * (callTime / (connectedCallCount || 1));

            numberObj.callCount = callCount;
            numberObj.callTime = callTime / 60;
            numberObj.closeValue = closeScore;

            numberObj.closeScore = closeScore < 30 ? enumClose.LITTLE : (closeScore < 60 ? enumClose.OFTEN : enumClose.CLOSE);
        } else {
            numberObj.callCount = callCount_s;
            numberObj.callTime = callTime_s / 60;
            numberObj.closeValue = closeScore_s;

            numberObj.closeScore = closeScore_s < 60 ? enumClose.LITTLE : (closeScore_s < 300 ? enumClose.OFTEN : enumClose.CLOSE);
        }

        // Get 联络状况 result.
        numberObj.connectionStatus = (hasConnection || closeScore_s > CONNECTION_THRESHOLD) ? enumConnection.ABNORMAL : enumConnection.NORMAL;

        // Get 活动轨迹.
        if (numberObj.isIntersect === undefined) {
            numberObj.isIntersect = enumLocation.NONINTERSECT;
        }

        // Get 是否在场.
        if (numberObj.isPresent === undefined) {
            numberObj.isPresent = enumPresent.NO;
        }
    }
}

module.exports = {
    getVizData: getVizData
};
