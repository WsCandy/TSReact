module.exports = (a, options) => {
    if (a.match(/m.([0-9a-f]+).js/)) {
        return options.fn(this);
    }

    return options.inverse(this);
};
