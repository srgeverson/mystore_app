
const keyExtractor = (item, index) => index.toString();

const extractorFirstLeterNames = (value) => {
    let leter = value.split(' ');
    return leter[0].substr(0, 1) + leter[1].substr(0, 1);
}

export { extractorFirstLeterNames, keyExtractor }