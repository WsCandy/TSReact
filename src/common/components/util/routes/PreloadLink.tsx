import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import RoutesContext from "_components/util/routes/RoutesContext";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import _omit from "lodash/omit";
import preload from "_actions/loading/preload";
import MapStateToProps from "_model/redux/MapStateToProps";

interface StateProps {
    readonly isLoading: boolean;
}

type Props = PreloadLinkProps & PreloadLinkActions & StateProps;

const omitProps = [
    "history",
    "match",
    "location",
    "staticContext",
    "loadRoute",
    "preload",
    "active",
    "eventTracker",
    "isLoading",
    "defaultValue",
    "primary",
    "medium",
    "tertiary"
];

const shouldDisable = (href: string): boolean => {
    const protocol = href.split(":")[0];
    return protocol.match(/^(https?|mailto)$/) !== null;
};

const PreloadLink: React.FunctionComponent<Props> = props => {
    const routesContext = useContext(RoutesContext);
    const {
        onClick,
        href,
        children,
        title,
        className,
        disabled,
        eventTracker,
        history,
        replace,
        preload,
        isLoading
    } = props;

    if (shouldDisable(href)) {
        return <a {..._omit(props, omitProps)}>{children}</a>;
    }

    return (
        <Link
            onTouchStart={e => e.stopPropagation()}
            to={href}
            title={title}
            className={className}
            onClick={e => {
                e.stopPropagation();
                if (disabled || isLoading) {
                    e.preventDefault();
                    return;
                }

                if (typeof eventTracker !== "undefined") {
                    eventTracker();
                }

                e.preventDefault();

                onClick
                    ? onClick(e)
                    : preload(href, history, routesContext.routes, replace);
            }}
        >
            {children}
        </Link>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = ({ loading }) => ({
    isLoading: loading.isLoading
});

const mapDispatchToProps: MapDispatchToProps<PreloadLinkActions> = dispatch => ({
    preload: (path, history, routes, replace) =>
        dispatch(preload(path, history, routes, replace))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PreloadLink));
