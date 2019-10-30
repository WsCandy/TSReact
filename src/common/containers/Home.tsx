import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_common/model/routes/RouteProps";
import { connect } from "react-redux";
import { ExampleState } from "_reducers/example";
import setExampleMessage from "_actions/example/setExampleMessage";
import PreloadLink from "_common/components/util/routes/PreloadLink";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import Action from "_model/redux/actions/Action";
import MapStateToProps from "_model/redux/MapStateToProps";
import AppSwitch from "_common/components/util/routes/AppSwitch";
import ex from "_svg/example.svg";
import Icon from "_common/components/util/misc/Icon";
import { Trans, useTranslation } from "react-i18next";
import Picture from "_components/util/misc/Picture";
import Heading from "_components/typography/Heading";
import Wrap from "_components/layout/Wrap";
import Container from "_components/layout/Container";

interface Actions {
    readonly setMessage: (message: string) => Action<string>;
}

interface StateProps {
    readonly example: ExampleState;
}

interface Props extends RouteProps, Actions, StateProps {}

const Home: React.FunctionComponent<Props> = props => {
    const [t, i18n] = useTranslation();
    const { route, match, setMessage, example } = props;

    return (
        <Wrap alignItems="center">
            <Container>
                <Heading>
                    <Trans i18nKey="hello_world" />
                </Heading>
                <Picture
                    img={require("_images/test.jpg")}
                    alt={t("hello_world")}
                    lazyLoad
                />
                <p>
                    <Trans
                        i18nKey="general.message"
                        values={{ message: example.message, path: match.path }}
                    />
                </p>

                <ul>
                    <li>
                        <Trans i18nKey="language" />
                        <button
                            onClick={() =>
                                i18n.changeLanguage("en-gb", () => {
                                    document.cookie = "i18next=en-gb";
                                })
                            }
                        >
                            <Trans i18nKey="english" />
                        </button>
                        <button
                            onClick={() =>
                                i18n.changeLanguage("it", () => {
                                    document.cookie = "i18next=it";
                                })
                            }
                        >
                            <Trans i18nKey="italian" />
                        </button>
                    </li>
                    <li>
                        <PreloadLink href="mailto:test@email.com">
                            Mailto Test
                        </PreloadLink>
                    </li>
                    <li>
                        <PreloadLink
                            href="https://github.com/WsCandy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            External link test
                        </PreloadLink>
                    </li>
                    <li>
                        <PreloadLink href="/load-test/heya">
                            <Trans
                                i18nKey="hello_world"
                                count={2}
                                values={{ count: 2 }}
                            />
                        </PreloadLink>
                    </li>
                    <li>
                        <PreloadLink href="/load-test">404</PreloadLink>
                    </li>
                    <li>
                        <PreloadLink href="/react-loadable">
                            React Loadable Test - Modal
                        </PreloadLink>
                    </li>
                </ul>

                <div>
                    <input
                        type="text"
                        onChange={e => setMessage(e.target.value)}
                        value={example.message}
                    />
                </div>
                <Icon
                    icon={ex}
                    height={200}
                    width={200}
                    primary
                    title="Running"
                />
                <Icon
                    icon={ex}
                    height={100}
                    width={100}
                    secondary
                    title="Running"
                />
                <AppSwitch routes={route.routes} />
            </Container>
        </Wrap>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = ({ example }) => ({
    example
});

const mapDispatchToProps: MapDispatchToProps<Actions> = dispatch => ({
    setMessage: message => dispatch(setExampleMessage(message))
});

export default route(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
