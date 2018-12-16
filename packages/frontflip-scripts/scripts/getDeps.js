module.exports = (answers)=>{
    let core = [];
    let dev = [];
    let keys = {}
    for(let ans in answers){
        if(answers.hasOwnProperty(ans)){
            core = core.concat(answers[ans].core || []);
            dev = dev.concat(answers[ans].dev || []);
            keys[answers[ans].key] = true;
        }
    }
    return{
        core,
        dev,
        keys
    }
}