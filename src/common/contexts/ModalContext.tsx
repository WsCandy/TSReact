import React from "react";

interface Props {
    readonly closeModal?: () => void;
    readonly closeTarget?: string;
}

const ModalContext = React.createContext<Props>({});

export default ModalContext;
