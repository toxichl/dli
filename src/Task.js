function Task(program, process) {
    this.program = program
    this.process = process
    this.taskStack = new Array()
    this.currentIndex = -1
}

Task.prototype.run = function () {
    
    this.currentTask(this.program, this.process, function check() {
        
        // 完成的指针
        this.currentTask.state = 'resolve'
        // 将栈的指针后移
        this.currentIndex++
        
        // 同步运行，后续任务还未被push，直接return
        if (this.currentTask === undefined) {
            return
            
            // 异步任务，后续任务被push了，但还未执行
        } else if (this.currentTask.state === undefined) {
            this.currentTask(this.program, this.process, check.bind(this))
        }
        
    }.bind(this))
    
}

Object.defineProperty(Task.prototype, 'currentTask', {
    get: function () {
        return this.taskStack[this.currentIndex]
    }
})

Task.prototype.use = function (task) {
    
    task.index = this.taskStack.length
    this.taskStack.push(task)
    
    if (this.taskStack.length === 1) {
        this.currentIndex = 0
        this.run()
        
    } else {
        // 说明上一个任务没有异步操作
        if (this.taskStack[this.taskStack.length - 2].state === 'resolve') {
            this.run()
        }
    }
    
    return this
}

module.exports = Task