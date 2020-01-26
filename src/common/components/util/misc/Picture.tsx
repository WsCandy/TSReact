import React, { useCallback, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Placeholder from "_components/util/misc/Placeholder";
import LoadedImage from "_components/util/misc/LoadedImage";
import useIntersection from "_common/hooks/useIntersection";

interface Props {
    readonly alt: string;
    readonly img: ImageImport;
    readonly className?: string;
    readonly lazyLoad?: boolean;
    readonly cover?: boolean;
}

const NoScriptPic = styled(LoadedImage)`
    opacity: 1;
`;

const WrapDiv = styled.div`
    position: relative;
    overflow: hidden;
`;

const Picture: React.FunctionComponent<Props> = props => {
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [complete, setComplete] = useState(false);
    const [element, setElement] = useState<HTMLDivElement>();
    const refCallback = useCallback(element => setElement(element), []);
    const { className, lazyLoad, img, alt, cover } = props;

    useIntersection(element, entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisible(entry.isIntersecting);
            }
        });
    });

    return (
        <WrapDiv ref={refCallback} className={className}>
            {lazyLoad ? (
                <>
                    <Placeholder
                        src={img.placeholder}
                        srcSet={img.srcSet}
                        alt={alt}
                        width={img.width}
                        height={img.height}
                        cover={cover}
                        complete={complete}
                        lazyLoad
                        blur
                    />
                    <noscript>
                        <NoScriptPic
                            src={img.src}
                            srcSet={img.srcSet}
                            height={img.height}
                            width={img.width}
                            alt={alt}
                            cover={cover}
                        />
                    </noscript>

                    <CSSTransition
                        classNames="fade"
                        timeout={600}
                        enter={lazyLoad}
                        in={visible && loaded}
                        onEntered={() => setComplete(true)}
                    >
                        <>
                            {!visible ? (
                                <LoadedImage
                                    src=""
                                    srcSet=""
                                    height={img.height}
                                    width={img.width}
                                    alt={alt}
                                    cover={cover}
                                />
                            ) : (
                                <LoadedImage
                                    src={img.src}
                                    srcSet={img.srcSet}
                                    height={img.height}
                                    width={img.width}
                                    alt={alt}
                                    onLoad={() => setLoaded(true)}
                                    cover={cover}
                                />
                            )}
                        </>
                    </CSSTransition>
                </>
            ) : (
                <LoadedImage
                    src={img.src}
                    srcSet={img.srcSet}
                    height={img.height}
                    width={img.width}
                    alt={alt}
                    cover={cover}
                />
            )}
        </WrapDiv>
    );
};

export default Picture;
