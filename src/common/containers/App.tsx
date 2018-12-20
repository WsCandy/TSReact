import * as React from "react";
import styled from "styled-components";

interface Props {
    readonly className?: string;
}

const App: React.FunctionComponent<Props> = ({ className }) => (
    <div className={className}>
        <p>Hello World!</p>
    </div>
);

export default styled(App)`
    color: hotpink;

    @media screen and (max-width: 400px) {
        color: red;
    }
`;
