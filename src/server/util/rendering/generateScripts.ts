import { ChunkExtractor } from "@loadable/server";

const generateScripts = (extractor: ChunkExtractor) => {
    return extractor
        .getScriptElements()
        .map(e => {
            const props = e.props as any;

            if (props.type === "application/json") {
                return `<script type="${props.type}" id="${props.id}">${props.dangerouslySetInnerHTML.__html}</script>`;
            }

            const matches = props.src.match(/(assets\/m.(.*).js)/g);
            return matches
                ? `<script type="application/javascript" src="${props.src}" defer data-chunk="${props["data-chunk"]}"></script>`
                : `<script type="application/javascript" src="${props.src}" async data-chunk="${props["data-chunk"]}"></script>`;
        })
        .join("");
};

export default generateScripts;
