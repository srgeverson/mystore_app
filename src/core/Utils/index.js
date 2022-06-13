const createGuid = () => {
    s4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toLowerCase();
}

const keyExtractor = (item, index) => index.toString();

const extractorFirstLeterNames = (value) => {
    if (value) {
        let leter = value.split(' ');
        if (leter.length > 1)
            return leter[0].substr(0, 1).toUpperCase() + leter[1].substr(0, 1).toUpperCase();
        else
            return value.substr(0, 1).toUpperCase();
    } else
        return '):';//Campo indefinido/nulo
}

const isNumber = (value) => !isNaN(value);

export { createGuid, extractorFirstLeterNames, isNumber, keyExtractor }