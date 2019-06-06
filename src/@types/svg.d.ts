declare interface SVG {
    readonly id: string;
    readonly viewBox: string;
    readonly content: string;
}

declare module "*.svg" {
    const content: SVG;
    export default content;
}
