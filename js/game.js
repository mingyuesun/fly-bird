(function (fb) {
    var Game = function () {
       /*获取画布*/
        this.ctx = document.querySelector('canvas').getContext('2d')
        /*开始结束指令*/
        this.running = true
    }
    Game.prototype.init = function () {
        this.gameStart()
    }
    Game.prototype.gameStart = function () {
        var that = this
        /*必须加载资源*/
        var loadSource = new fb.loadSource()
        console.log(loadSource);
        loadSource.load(function (loadList) {
            /*完成游戏的开始*/
            var objectList = [];

           /*初始化天空对象*/
           var skyImg = loadList['sky']
            for (var i = 0; i < 2; i++) {
                var sky = new fb.Sky(that.ctx,skyImg,i*that.ctx.canvas.width)
                objectList.push(sky)
            }
           /*初始化陆地对象*/
            var landImg = loadList['land']
            for (var i = 0; i < 4; i++) {
                var land = new fb.Land(that.ctx,landImg,i*landImg.width)
                objectList.push(land)
            }
            /*初始化管道对象*/
            var pipeTopImg = loadList['pipe2']
            var pipeBotImg = loadList['pipe1']
            for (var i = 0; i < 6; i++) {
                var pipe = new fb.Pipe(that.ctx,pipeTopImg,pipeBotImg,i*3*pipeTopImg.width)
                objectList.push(pipe)
            }
            /*初始化小鸟对象*/
            var bird = new fb.Bird(that.ctx,loadList['birds'])
            objectList.push(bird)

           var animation = function () {
               /*保存坐标和清空画布*/

               that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height)
               that.ctx.beginPath()

               /*天空绘制*/
               /*管道绘制*/
               /*陆地绘制*/
               /*小鸟绘制*/
              objectList.forEach(function (item) {
                  item.draw()
              })

               /*碰撞检测*/
               /*1.碰撞地面 game over*/
               if(bird.y >= that.ctx.canvas.height - landImg.height - 20){
                   that.gameOver()
               }
               /*2.碰撞顶部 game over*/
               if(bird.y <= 0 + 15){
                   that.gameOver()
               }
               /*3.碰撞管道 game over*/
               if(that.ctx.isPointInPath(bird.x + 15,bird.y)){
                   that.gameOver()
               }

             if(that.running){
                 requestAnimationFrame(animation)
             }
           }
            animation()
        });
    }
    Game.prototype.gameOver = function () {
            this.running = false
    }
    fb.Game = Game
})(FB)

