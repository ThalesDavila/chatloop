const operate = require('./contextCrud');

module.exports = async function(loopToBeCalled, position) {
    try {
        let read_result = await operate.Read();
        read_result = JSON.parse(read_result); 
            if(loopToBeCalled) {
                if(position) {
                    await operate.Update({
                        loopToBeCalled: loopToBeCalled,
                        position: position    
                    });
                    return
                } else {
                    await operate.Update({
                        loopToBeCalled: loopToBeCalled,
                        position: read_result.position
                    });
                    return
                }
            } else if(position) {
                read_result.position = position;
                await operate.Update({
                    loopToBeCalled: read_result.loopToBeCalled,
                    position: position
                });
                return
            }  else {
                return read_result
            }
        } catch(e) {
        console.error(e)
        throw new Error('Context error')   
    }    
}