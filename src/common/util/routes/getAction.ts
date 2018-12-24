import PreloadLinkProps from "@model/routes/PreloadLinkProps";

const getAction = (props: PreloadLinkProps) => {
    const { replace, history, to } = props;
    return replace ? history.replace(to) : history.push(to);
};

export default getAction;
