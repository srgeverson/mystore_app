const createGuid = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

const keyExtractor = (item, index) => index.toString();

const extractorFirstLeterNames = (value) => {
    let leter = value.split(' ');
    if (leter.length > 1)
        return leter[0].substr(0, 1) + leter[1].substr(0, 1);
    else
        return value.substr(0, 1)
}

export { createGuid, extractorFirstLeterNames, keyExtractor }