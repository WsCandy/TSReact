import OpenGraph from "_server/model/OpenGraph";

interface ViewParams {
    readonly title?: string;
    readonly scripts?: string;
    readonly html: string;
    readonly state: string;
    readonly styles: string;
    readonly svg: string;
    readonly og: OpenGraph;
}

export default ViewParams;
