const createFullDomain = (protocol: string, host: string): string =>
    `${protocol}://${host}`;

export default createFullDomain;
