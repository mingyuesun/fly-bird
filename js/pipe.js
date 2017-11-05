(function (fb) {
    var Pipe = function (ctx,topImage,botImage,x) {
        this.ctx = ctx
        this.topImage = topImage
        this.botImage = botImage
        /*上下管道的距离*/
        this.space = 200
        /*获取管道尺寸*/
        this.pipeWidth = this.topImage.width
        this.pipeHeight = this.topImage.height
        /*管道定位x轴坐标*/
        this.x = x + 400
        /*速度*/
        this.speed = 3
        this.initY()
    }
    Pipe.prototype.draw = function () {

        /*绘制管道*/
        this.ctx.drawImage(this.topImage,this.x,this.topY)
        this.ctx.drawImage(this.botImage,this.x,this.botY)
        this.ctx.rect(this.x,this.topY,this.pipeWidth,this.pipeHeight)
        this.ctx.rect(this.x,this.botY,this.pipeWidth,this.pipeHeight)


        this.x -= this.speed
        /*管道衔接*/
        if(this.x < -this.topImage.width){
            this.x += 6*3*this.topImage.width
        }
    }
    /*初始化管道坐标*/
    Pipe.prototype.initY = function () {
        /*随机高度*/
        var randomH = 80 * Math.random()
        var minH = 140
        var topH = minH + randomH /*140-220 管道伸出来的高度*/
        /*上面图片的定位*/
        this.topY = - this.pipeHeight + topH
        /*下面图片的y轴坐标*/
        this.botY = topH + this.space

    }
    fb.Pipe = Pipe
})(FB)
