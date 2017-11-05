(function (window) {
    window.FB = {}
    
    var loadSource = function () {
        this.paths = ['birds','land','sky','pipe1','pipe2']
        this.dir = 'images/'
        this.fix = '.png' 
    }
    loadSource.prototype.load = function (callback) {
        var that = this
        var imgTotal = that.paths.length
        var loadNum = 0
        var loadList = []
        this.paths.forEach(function (item) {
            var img = new Image()
            img.onload = function () {
                loadNum ++
                loadList[item] = img
                if(loadNum == imgTotal ){
                      callback && callback(loadList)
                }
            }
            img.src = that.dir + item + that.fix
        });
    }
    FB.loadSource = loadSource
})(window)
