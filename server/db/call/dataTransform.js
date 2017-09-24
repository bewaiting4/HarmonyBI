const csv = require('csv-array');
const logger = require('../../util/logger');
const EnumCallType = require('./enumCallType');
const fs = require('fs');

const LOGGER_CLASS = 'Data Transforming: ';

function copyIfNone(from, to) {
    for (let n in from) {
        if ((to[n] === null || to[n] === undefined) &&
            (from[n] !== null && from[n] !== undefined)) {
            to[n] = from[n];
        }
    }
}

function transform(data) {
    let callMap = {},
        resolvedCalls = [],
        numbers = {},
        i,
        row,
        key,
        call;

    logger.log(LOGGER_CLASS + 'Start transforming ' + data.length + ' data entries.');

    // Sort
    data.sort(function (row1, row2) {
        return new Date(row1.date_time) - new Date(row2.date_time);
    });

    // Merging
    for (i = 0; i < data.length; i++) {

        row = data[i];

        switch (parseInt(row.type_code)) {
            // 主叫
            case EnumCallType.CALLER.t:
                key = row.f_number + '&' + row.t_number;
                call = callMap[key];

                if (call) {
                    // Invalid state order => not same call.
                    if (call._state !== EnumCallType.CALLER_START.t && row.call_start !== call.call_start) {
                        resolvedCalls.push(call);

                        // Collect all involved numbers in a list.
                        numbers[call.f_number] = {};
                        numbers[call.t_number] = {};
                    }
                }

                callMap[key] = {
                    _state: EnumCallType.CALLER.t,

                    f_number: row.f_number,
                    f_name: row.f_name,
                    f_id: row.f_id,
                    f_lang: row.f_lang,
                    f_long: row.long,
                    f_lat: row.lat,
                    f_IMEI: row.IMEI,
                    f_district: row.f_district,
                    f_addr: row.addr,
                    f_CI: row.CI,

                    call_start: row.date_time,
                    call_end: null,
                    call_duration: row.duration,

                    t_number: row.t_number,
                    t_name: row.t_name,
                    t_id: row.t_id,
                    t_lang: row.t_lang,
                    t_long: null,
                    t_lat: null,
                    t_IMEI: null,
                    t_district: row.t_district,
                    t_addr: null,
                    t_CI: null
                };
                break;
                // 主叫开始
            case EnumCallType.CALLER_START.t:
                key = row.f_number + '&' + row.t_number;
                call = callMap[key];

                if (call) {
                    // Invalid state order => not same call.
                    if (call._state !== EnumCallType.CALLER.t) {
                        resolvedCalls.push(call);

                        // Collect all involved numbers in a list.
                        numbers[call.f_number] = {};
                        numbers[call.t_number] = {};
                    }
                } else {
                    call = callMap[key] = {};
                }

                call._state = EnumCallType.CALLER_START.t;

                copyIfNone({
                    f_number: row.f_number,
                    f_name: row.f_name,
                    f_id: row.f_id,
                    f_lang: row.f_lang,
                    f_long: row.long,
                    f_lat: row.lat,
                    f_IMEI: row.IMEI,
                    f_district: row.f_district,
                    f_addr: row.addr,
                    f_CI: row.CI,

                    call_start: row.date_time,
                    call_end: null,
                    call_duration: null,

                    t_number: row.t_number,
                    t_name: row.t_name,
                    t_id: row.t_id,
                    t_lang: row.t_lang,
                    t_long: null,
                    t_lat: null,
                    t_IMEI: null,
                    t_district: row.t_district,
                    t_addr: null,
                    t_CI: null
                }, call);
                break;
                // 被叫
            case EnumCallType.CALLEE.t:
                key = row.t_number + '&' + row.f_number;
                call = callMap[key];

                if (call) {
                    // Invalid state order => not same call.
                    if (call._state !== EnumCallType.CALLER.t &&
                        call._state !== EnumCallType.CALLER_START.t &&
                        call._state !== EnumCallType.CALLEE_START.t) {
                        resolvedCalls.push(call);

                        // Collect all involved numbers in a list.
                        numbers[call.f_number] = {};
                        numbers[call.t_number] = {};
                    }
                } else {
                    call = callMap[key] = {};
                }

                call._state = EnumCallType.CALLEE.t;

                copyIfNone({
                    f_number: row.t_number,
                    f_name: row.t_name,
                    f_id: row.t_id,
                    f_lang: row.t_lang,
                    f_long: null,
                    f_lat: null,
                    f_IMEI: null,
                    f_district: row.t_district,
                    f_addr: null,
                    f_CI: null,

                    call_start: row.date_time,
                    call_end: null,
                    call_duration: row.duration,

                    t_number: row.f_number,
                    t_name: row.f_name,
                    t_id: row.f_id,
                    t_lang: row.f_lang,
                    t_long: row.long,
                    t_lat: row.lat,
                    t_IMEI: row.IMEI,
                    t_district: row.f_district,
                    t_addr: row.addr,
                    t_CI: row.CI
                }, call);
                break;
                // 被叫开始
            case EnumCallType.CALLEE_START.t:
                key = row.t_number + '&' + row.f_number;
                call = callMap[key];

                if (call) {
                    // Invalid state order => not same call.
                    if (call._state !== EnumCallType.CALLER.t &&
                        call._state !== EnumCallType.CALLER_START.t &&
                        call._state !== EnumCallType.CALLEE.t) {
                        resolvedCalls.push(call);

                        // Collect all involved numbers in a list.
                        numbers[call.f_number] = {};
                        numbers[call.t_number] = {};
                    }
                } else {
                    call = callMap[key] = {};
                }

                call._state = EnumCallType.CALLEE_START.t;

                copyIfNone({
                    f_number: row.t_number,
                    f_name: row.t_name,
                    f_id: row.t_id,
                    f_lang: row.t_lang,
                    f_long: null,
                    f_lat: null,
                    f_IMEI: null,
                    f_district: row.t_district,
                    f_addr: null,
                    f_CI: null,

                    call_start: row.date_time,
                    call_end: null,
                    call_duration: null,

                    t_number: row.f_number,
                    t_name: row.f_name,
                    t_id: row.f_id,
                    t_lang: row.f_lang,
                    t_long: row.long,
                    t_lat: row.lat,
                    t_IMEI: row.IMEI,
                    t_district: row.f_district,
                    t_addr: row.addr,
                    t_CI: row.CI
                }, call);
                break;
                // 通话结束
            case EnumCallType.CALL_END.t:
                key = row.f_number + '&' + row.t_number;
                call = callMap[key];

                if (!call) {
                    key = row.t_number + '&' + row.f_number;
                    call = callMap[key];
                }

                if (call) {
                    call.call_end = row.date_time;

                    if (!call.call_duration || call.call_duration === '0') {
                        call.call_duration = ((new Date(row.date_time)) - (new Date(call.call_start))) / 1000 + '';
                    }

                    resolvedCalls.push(call);

                    // Collect all involved numbers in a list.
                    numbers[call.f_number] = {};
                    numbers[call.t_number] = {};

                    callMap[key] = null;
                }

                break;
            case EnumCallType.TEXT.t:
                key = row.f_number + '&' + row.t_number;
                call = callMap[key];

                if (call) {
                    if (new Date(row.date_time) - new Date(call.call_start) > 12000) {
                        resolvedCalls.push(call);

                        // Collect all involved numbers in a list.
                        numbers[call.f_number] = {};
                        numbers[call.t_number] = {};
                    } else {
                        call.call_start = call.call_end = row.date_time;

                        break;
                    }
                }

                call = callMap[key] = {
                    _state: EnumCallType.TEXT.t,

                    f_number: row.f_number,
                    f_name: row.f_name,
                    f_id: row.f_id,
                    f_lang: row.f_lang,
                    f_long: row.long,
                    f_lat: row.lat,
                    f_IMEI: row.IMEI,
                    f_district: row.f_district,
                    f_addr: row.addr,
                    f_CI: row.CI,

                    call_start: row.date_time,
                    call_end: row.date_time,
                    call_duration: row.duration,

                    t_number: row.t_number,
                    t_name: row.t_name,
                    t_id: row.t_id,
                    t_lang: row.t_lang,
                    t_long: null,
                    t_lat: null,
                    t_IMEI: null,
                    t_district: row.t_district,
                    t_addr: null,
                    t_CI: null
                };

                break;

            default:
                // Do nothing.
        }
    }

    // Collect rest calls.
    for (key in callMap) {
        row = callMap[key];

        if (row && row.f_number && row.t_number) {
            resolvedCalls.push(row);

            // Collect all involved numbers in a list.
            numbers[row.f_number] = {};
            numbers[row.t_number] = {};
        }
    }

    logger.log(LOGGER_CLASS + resolvedCalls.length + ' calls collected.');
    resolvedCalls.sort(function (c1, c2) {
        return new Date(c1.call_start) - new Date(c2.call_start);
    });

    return {
        vizData: resolvedCalls,
        numbers: numbers
    }
}

function writeToFile(resolvedCalls) {
    // Write to file.
    let stream = fs.createWriteStream('../../routes/api/viz/vizData.json');
    stream.once('open', function (fd) {
        stream.write('[\n');

        resolvedCalls.forEach(function (call, i) {
            stream.write(JSON.stringify(call) + (i === resolvedCalls.length - 1 ? '\n' : ',\n'));
        });

        stream.write(']\n');

        stream.end();

        logger.log(LOGGER_CLASS + 'Records written to file.');
    });
}

function parseCSV() {
    // Read and parse csv data.
    csv.parseCSV("calldata.csv", function (data) {

        let modelData = transform(data);

        //writeToFile(modelData.vizData);
    }, true);
}

module.exports = {
    transform: transform,

    writeToFile: writeToFile,

    parseCSV: parseCSV
}
