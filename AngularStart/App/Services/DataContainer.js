var Services;
(function (Services) {
    var DataContainer = (function () {
        function DataContainer($http) {
            this.$http = $http;
        }
        DataContainer.prototype.GetMenu = function () {
            return [
                { link: '#/home', text: 'Home' },
                { link: '#/samples', text: 'Samples' },
                { link: '#/ui', text: 'Ui Bootstrap' },
                { link: '#/links', text: 'Links' },
                { link: '#/about', text: 'About' }
            ];
        };

        DataContainer.prototype.GetServerData = function () {
            return this.$http.get('Api/data.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };

        DataContainer.prototype.GetServerDataError = function () {
            return this.$http.get('Api/nonExistant.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };
        return DataContainer;
    })();
    Services.DataContainer = DataContainer;
})(Services || (Services = {}));
//# sourceMappingURL=DataContainer.js.map
