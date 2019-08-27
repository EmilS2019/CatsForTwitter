const isEmpty = (string) =>{
    if (typeof(string) === "string"){        
        if (string.length === 0){
            return true;
        }
    }
    return false
}

module.exports = {isEmpty}