/**
 * 时间
 */

define(function(mu) {

     /**
     * mu.now()
     * 当前时间
     * @returns {Date}
     */
    mu.now = function(/**Boolean*/ timestamp) {
        return timestamp ? + new Date() : new Date();
    };

    /**
     * mu.timestamp(Date date[, Boolean isShort])
     * 获得当前时间的时间戳, 默认为当前时间
     * @param date
     * @param initType 将某类型的时间设为0 'hhmmssSS'
     * @param short 是否显示短时间戳
     * @returns {number|Date}
     *
     * exp.
     *
     * mu.timestamp(new Date(1458207651074), 'hhssSS')
     * // -> 1458146400000
     *
     * mu.timestamp(new Date(1458207651074), 'SS')
     * // -> 1458207651000
     *
     * mu.timestamp(new Date(1458207651074), 'ssSS')
     * // -> 1458207600000
     *
     * mu.timestamp(new Date(1458207651074), 'mmssSS')
     * // -> 1458205200000
     *
     * mu.timestamp(new Date(1458207651074), 'hhmmssSS')
     * // -> 1458144000000
     *
     * mu.timestamp(new Date(1458207651074), 'ddhhmmssSS')
     * // -> 1456675200000
     *
     * mu.timestamp(new Date(1458207651074), 'MMddhhmmssSS')
     * // -> 1451491200000
     *
     * mu.timestamp(new Date(1458207651074), 'yyyyMMddhhmmssSS')
     * // -> -62167334400000
     *
     */
    mu.timestamp = function(/**{date}*/ date, /**[{string}]*/ initType, /**[boolean]*/ short) {
        date = date || new Date();

        date = _.type(date, 'Date') ? date : new Date(date);

        var typeObj = {
            yyyy: 'setFullYear',
            MM: 'setMonth',
            dd: 'setDate',
            hh: 'setHours',
            mm: 'setMinutes',
            ss: 'setSeconds',
            SS: 'setMilliseconds'
        };

        if(initType){
            _.each(typeObj, function(fn, type){
                if(initType.indexOf(type) > -1){
                    date[fn](0);
                }
            });
        }

        var rst = +date;

        return short ? ( Math.floor(rst / 1000) ) : rst;
    };

    // 时间处理 moment

    return mu;
});