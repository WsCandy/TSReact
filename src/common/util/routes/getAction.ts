import PreloadLinkProps from "_model/routes/PreloadLinkProps";

const getAction = (
    props: PreloadLinkProps
): ((path: string, state?: any) => void) => {
    const { replace, history } = props;
    return replace ? history.replace : history.push;
};

export default getAction;
