var Directives;
(function (Directives) {
    var MenuDirective = (function () {
        function MenuDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.scope = { selectedItem: '@', title: '@', items: '=' };
            this.templateUrl = 'Directives/MenuDirective.html';
        }
        return MenuDirective;
    })();
    Directives.MenuDirective = MenuDirective;
})(Directives || (Directives = {}));
//# sourceMappingURL=MenuDirective.js.map
