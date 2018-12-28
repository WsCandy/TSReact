const deBounce = (callback: () => any) => {
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
    }

    return callback();
};

export default deBounce;
