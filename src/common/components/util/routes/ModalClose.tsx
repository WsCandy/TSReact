import React, { useContext } from "react";
import PreloadLink from "_components/util/routes/PreloadLink";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Icon from "_components/util/misc/Icon";
import close from "_svg/close.svg";
import globalMargin from "_util/styles/globalMargin";
import ModalContext from "_contexts/ModalContext";

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

const ModalClose: React.FunctionComponent = () => {
    const context = useContext(ModalContext);
    const { closeModal, closeTarget } = context;
    const [t] = useTranslation();

    return (
        <StyledLink
            title={t("general.close")}
            replace
            href={closeTarget!}
            onClick={closeModal}
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

export default ModalClose;
