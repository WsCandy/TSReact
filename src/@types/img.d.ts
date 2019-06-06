declare interface ImageImport {
    readonly src: string;
    readonly srcSet: string;
    readonly height: number;
    readonly width: number;
    readonly placeholder: string;
    readonly toString: () => string;
    readonly images: {
        readonly height: number;
        readonly width: number;
        readonly path: string;
    }[];
}

declare module "*.jpg" {
    const content: ImageImport;
    export default content;
}
