const formatThousand = numInt => {
    if (!numInt) {
        return "0";
    }

    return numInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const removeAllDot = numString => {
    return parseInt(numString.replace(/\,/g, ''));
};

module.exports = {
    removeAllDot,
    formatThousand,
};
