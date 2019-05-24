import * as React from "react";
import styled from "styled-components";
import colourProps from "_util/styles/colourProps";

interface Props extends ColourProps {
    readonly icon: SVG;
    readonly className?: string;
    readonly width: number;
    readonly height: number;
    readonly fill?: boolean;
    readonly role?: string;
    readonly title: string;
    readonly desc?: string;
}

const BaseIcon: React.FunctionComponent<Props> = props => {
    const {
        icon, className, role, title, desc
    } = props;

    return (
        <svg
            viewBox={icon.viewBox}
            className={className}
            role={role}
            aria-label={title}
        >
            <title>{title}</title>
            {desc ? <desc>{desc}</desc> : null}
            <use xlinkHref={`#${icon.id}`} />
        </svg>
    );
};

const Icon = styled(BaseIcon)`
    display: block;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    ${props =>
        (props.fill ? colourProps(props, "fill") : colourProps(props, "stroke"))}
`;

Icon.defaultProps = {
    role: "img"
};

export default Icon;
