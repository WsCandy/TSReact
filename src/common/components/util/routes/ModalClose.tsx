import * as React from "react";
import PreloadLink from "_components/util/routes/PreloadLink";
import Modal from "_model/routes/Modal";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Icon from "_components/util/misc/Icon";
import { RouteComponentProps, withRouter } from "react-router";
import close from "_svg/close.svg";

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
    margin-bottom: ${props => props.theme.globalSpacingUnit / 2}px;
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
    flex-shrink: 0;

    &:hover {
        text-decoration: none;
    }
`;

const StyledIcon = styled(Icon)`
    margin-right: ${props => props.theme.globalSpacingUnit / 3}px;
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
