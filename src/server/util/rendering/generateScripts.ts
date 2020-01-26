import { ChunkExtractor } from "@loadable/server";

const generateScripts = (extractor: ChunkExtractor) => {
    return extractor
        .getScriptElements()
        .filter(e => (e.props as any).src)
        .map(e => {
            const props = e.props as any;
            const matches = props.src.match(/(assets\/m.(.*).js)/g);
            return matches
                ? `<script type="application/javascript" src="${props.src}" defer></script>`
                : `<script type="application/javascript" src="${props.src}" async></script>`;
        })
        .join("");
};

export default generateScripts;
