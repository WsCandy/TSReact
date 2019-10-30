import * as React from "react";
import PreloadLink from "_components/util/routes/PreloadLink";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Icon from "_components/util/misc/Icon";
import close from "_svg/close.svg";
import { RouteComponentProps, withRouter } from "react-router";
import globalMargin from "_util/styles/globalMargin";

interface Props extends RouteComponentProps {
    readonly modal?: Modal;
}

const getBackPath = (modal?: Modal): string => {
    if (typeof modal !== "object") {
        return "/";
    }

    if (typeof modal.path === "undefined") {
        return "/";
    }

    return modal.path;
};

const StyledLink = styled(PreloadLink)`
    display: flex;
    align-items: center;
    color: ${props => props.theme.colours.tertiary};
    ${props => globalMargin(props, 0.5)("bottom")}
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
    flex-shrink: 0;

    &:hover {
        text-decoration: none;
    }
`;

const StyledIcon = styled(Icon)`
    ${props => globalMargin(props, 0.33)("right")};
`;

const ModalClose: React.FunctionComponent<Props> = props => {
    const { modal, history } = props;
    const [t] = useTranslation();

    return (
        <StyledLink
            title={t("general.close")}
            replace
            href={getBackPath(modal)}
            onClick={
                history.action === "PUSH" ? () => history.goBack() : undefined
            }
        >
            <StyledIcon
                tertiary
                fill
                icon={close}
                height={13}
                width={13}
                title={t("general.close")}
            />
            {t("general.close")}
        </StyledLink>
    );
};

export default withRouter(ModalClose);
