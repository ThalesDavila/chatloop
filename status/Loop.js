module.exports = class Loop {
    constructor(loopName, loopFunction) {
        this.loopName = loopName;
        this.loopFunction = loopFunction
    }

    static findCurrentLoop(tryloopName, loops) {
        for(let i = 0; i<loops.length; i++) {
            if(loops[i].loopName === tryloopName) {
                console.log(loops[i].loopName)
                loops[i].loopFunction()
                return 
            } else {
                console.log('wewewewewew');
            }
        }
    }
 }