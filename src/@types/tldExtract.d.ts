declare module "tld-extract" {
    export interface Domain {
        readonly tld: string;
        readonly domain: string;
        readonly sub: string;
    }

    export default function parser(domain: string): Domain;
}
