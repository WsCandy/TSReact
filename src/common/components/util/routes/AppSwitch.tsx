import React, { useState } from "react";
import AppRoute from "_model/routes/AppRoute";
import { Switch, useHistory, useLocation } from "react-router";
import { generateRouteComponent } from "_util/routes/generateRoutes";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import getMainLocation from "_util/routes/location/getMainLocation";
import ModalContext from "_contexts/ModalContext";
import Overlay from "_containers/Overlay";
import get404Route from "_util/routes/get404Route";
import StatusContext from "_contexts/StatusContext";

interface Props {
    readonly routes?: AppRoute[];
    readonly status?: number;
}

const AppSwitch: React.FunctionComponent<Props> = props => {
    const { routes, status } = props;
    const [statusCode, setStatus] = useState(status);
    const [animate, setAnimate] = useState(false);
    const location = useLocation();
    const history = useHistory();

    if (typeof routes !== "undefined") {
        const coreRoutes = routes.filter(route => !route.modal);
        const modalRoutes = routes.filter(route => route.modal);

        const route = getMatchedRoute(location.pathname, routes);
        const mainLocation = getMainLocation(route, location);

        const closeModal = () => {
            setAnimate(true);
            history.action === "POP"
                ? history.replace(mainLocation.pathname)
                : history.goBack();
        };

        if (statusCode === 404) {
            return (
                <StatusContext.Provider value={{ status, setStatus }}>
                    {generateRouteComponent(get404Route())}
                </StatusContext.Provider>
            );
        }

        return (
            <StatusContext.Provider value={{ status, setStatus }}>
                <Switch location={mainLocation}>
                    {coreRoutes.map(route => generateRouteComponent(route))}
                </Switch>
                <TransitionGroup component={null}>
                    {route.modal ? (
                        <CSSTransition
                            classNames="appear"
                            timeout={300}
                            exit={animate}
                            enter
                            appear
                            onExit={() => setAnimate(false)}
                        >
                            <Overlay onMouseDown={() => closeModal()}>
                                <ModalContext.Provider
                                    value={{
                                        closeModal,
                                        closeTarget: mainLocation.pathname
                                    }}
                                >
                                    <Switch location={location}>
                                        {modalRoutes.map(route =>
                                            generateRouteComponent(route)
                                        )}
                                    </Switch>
                                </ModalContext.Provider>
                            </Overlay>
                        </CSSTransition>
                    ) : null}
                </TransitionGroup>
            </StatusContext.Provider>
        );
    }

    return null;
};

export default AppSwitch;
