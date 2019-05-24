import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Placeholder from "_components/util/misc/Placeholder";
import LoadedImage from "_components/util/misc/LoadedImage";
import useHydrateClientRender from "_common/hooks/useHydrateClientRender";
import useIntersection from "_common/hooks/useIntersection";

interface Props {
    readonly alt: string;
    readonly img: ImageImport;
    readonly className?: string;
    readonly lazyLoad?: boolean;
}

const NoScriptPic = styled(LoadedImage)`
    opacity: 1;
`;

const WrapDiv = styled.div`
    position: relative;
    overflow: hidden;
`;

const Picture: React.FunctionComponent<Props> = props => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [complete, setComplete] = useState(false);

    const {
        className, lazyLoad, img, alt
    } = props;

    if (lazyLoad) {
        useHydrateClientRender();
        useIntersection(ref.current, ([{ isIntersecting }]) => {
            if (visible) {
                return;
            }

            setVisible(isIntersecting);
        });
    }

    return (
        <WrapDiv ref={ref} className={className}>
            <Placeholder
                src={lazyLoad ? img.placeholder : img.src}
                alt={alt}
                width={img.width}
                height={img.height}
                lazyLoad={lazyLoad}
                blur={!complete}
            />

            {lazyLoad ? (
                <>
                    <noscript>
                        <NoScriptPic
                            src={img.src}
                            srcSet={img.srcSet}
                            height={img.height}
                            width={img.width}
                            alt={alt}
                        />
                    </noscript>

                    <CSSTransition
                        classNames="fade"
                        timeout={300}
                        enter={lazyLoad}
                        in={visible && loaded}
                        onEntered={() => setComplete(true)}
                    >
                        <>
                            {lazyLoad && !visible ? null : (
                                <LoadedImage
                                    src={img.src}
                                    srcSet={img.srcSet}
                                    height={img.height}
                                    width={img.width}
                                    alt={alt}
                                    onLoad={() => setLoaded(true)}
                                />
                            )}
                        </>
                    </CSSTransition>
                </>
            ) : null}
        </WrapDiv>
    );
};

export default Picture;
