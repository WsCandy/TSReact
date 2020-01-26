import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import preload from "_actions/loading/preload";
import MapStateToProps from "_model/redux/MapStateToProps";
import RoutesContext from "_components/util/routes/RoutesContext";

interface StateProps {
    readonly isLoading: boolean;
}

type Props = PreloadLinkProps & PreloadLinkActions & StateProps;

const shouldDisable = (href: string): boolean => {
    const protocol = href.split(":")[0];
    return protocol.match(/^(https?|mailto)$/) !== null;
};

const PreloadLink: React.FunctionComponent<Props> = props => {
    const {
        onClick,
        href,
        disabled,
        eventTracker,
        replace,
        preload,
        isLoading,
        ...rest
    } = props;
    const { routes } = useContext(RoutesContext);

    if (shouldDisable(href)) {
        return <a href={href} {...rest} />;
    }

    return (
        <Link
            onTouchStart={e => e.stopPropagation()}
            to={href}
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();

                if (disabled || isLoading) {
                    return;
                }

                if (typeof eventTracker !== "undefined") {
                    eventTracker();
                }

                onClick ? onClick(e) : preload(href, routes, replace);
            }}
            {...rest}
        />
    );
};

const mapStateToProps: MapStateToProps<StateProps> = ({ loading }) => ({
    isLoading: loading.isLoading
});

const mapDispatchToProps: MapDispatchToProps<PreloadLinkActions> = dispatch => ({
    preload: (path, routes, replace) => dispatch(preload(path, routes, replace))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreloadLink);
