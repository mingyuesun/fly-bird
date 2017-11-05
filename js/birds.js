(function (fb) {
    var Bird = function (ctx,birdImage) {
        this.ctx = ctx
        this.birdImage = birdImage
        /*起始位置*/
        this.x = 100
        this.y = 100
        /*小鸟尺寸*/
        this.birdWidth = this.birdImage.width / 3
        this.birdHeight = this.birdImage.height
        /*图片索引*/
        this.index = 0
        /*初速度 加速度*/
        this.v0 = 0
        this.acc = 0.0005
        /*初始时间*/
        this.startTime = Date.now()
        /*坠落相关*/
        this.maxSpeed = 0.5
        this.maxAngle = Math.PI / 4
        /*初始化*/
        this.initFly()
    }
    Bird.prototype.draw = function () {
        this.ctx.save()
        /*自由落体*/
        var currentTime = Date.now()
        var deltaTime = currentTime - this.startTime
        this.startTime = currentTime
        /*下落高度*/
        this.y += this.v0 * deltaTime + this.acc * deltaTime *deltaTime / 2
        this.v0 += this.acc * deltaTime
        /*坠落旋转*/
        this.ctx.translate(this.x,this.y)
        var angle = this.v0 / this.maxSpeed * this.maxAngle
        if(angle > this.maxAngle){
            angle = this.maxAngle
        }
        this.ctx.rotate(angle)
        /*绘制小鸟动画*/
        this.ctx.drawImage(this.birdImage,this.index*this.birdWidth,0,this.birdWidth,this.birdHeight,-this.birdWidth / 2,-this.birdHeight / 2,this.birdWidth,this.birdHeight)
        this.index ++
        if(this.index > 2){
            this.index = 0
        }

      this.ctx.restore()
    }
    Bird.prototype.initFly = function () {
        var that = this
        this.ctx.canvas.onclick = function () {
            that.v0 = -0.3
        }
    }

    fb.Bird = Bird
})(FB)
