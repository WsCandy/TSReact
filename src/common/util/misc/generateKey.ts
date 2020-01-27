const generateKey = (length: number = 5): string => {
    const char_list =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < length; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }

    return text;
};

export default generateKey;
