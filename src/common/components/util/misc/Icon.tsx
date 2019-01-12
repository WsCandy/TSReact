import * as React from "react";
import styled from "styled-components";
import colourProps from "_util/styles/colourProps";

interface Props extends ColourProps {
    readonly icon: SVG;
    readonly className?: string;
    readonly width: number;
    readonly height: number;
    readonly fill?: boolean;
}

const Icon: React.FunctionComponent<Props> = ({ icon, className }) => (
    <svg viewBox={icon.viewBox} className={className}>
        <use xlinkHref={`#${icon.id}`} />
    </svg>
);

export default styled(Icon)`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    ${props =>
        (props.fill ? colourProps(props, "fill") : colourProps(props, "stroke"))}
`;
