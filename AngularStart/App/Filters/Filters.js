var Filters = (function () {
    function Filters() {
    }
    Filters.Difference = function (indataUnparsed) {
        var result = "";
        var indata = +indataUnparsed;

        if (indata < 0) {
            result = "" + indata.toFixed(1);
        } else if (indata > 0) {
            result = "+" + indata.toFixed(1);
        }

        return result;
    };
    return Filters;
})();
//# sourceMappingURL=Filters.js.map
