import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { WingBlank } from 'antd-mobile';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;
const Wrapper = styled.div`
    ${(props) =>
        props.shouldDelayLoading &&
        css`
            animation: 0.3s ${fadeInAnimation};
        `}
`;

const TextAnimation = styled.div`
    #preLoader {
        width: 100%;
        text-align: center;
        padding-top: 144px;
        font-size: 33px;
        font-weight: bold;
    }
    #preLoader > div > span#first {
        /*设置渐变背景，最好设置为能无缝拼接的渐变*/
        background-image: -webkit-linear-gradient(left, red, white 12.5%, red 25%, white 37.5%, red 50%, red 100%);
        /*文字填充色为透明*/
        -webkit-text-fill-color: transparent;
        /*背景剪裁为文字，相当于用背景填充文字*/
        -webkit-background-clip: text;
        background-clip: text;
        /*将背景拉长一倍，给予移动变化空间，用作流光效果*/
        -webkit-background-size: 400% 100%;
        background-size: 400% 100%;
        -webkit-animation: light 2s infinite linear;
        animation: light 2s infinite linear;
    }
    #preLoader > div > span#second {
        /*设置渐变背景，最好设置为能无缝拼接的渐变*/
        background-image: -webkit-linear-gradient(
            left,
            black,
            black 50%,
            white 62.5%,
            black 75%,
            white 87.5%,
            black 100%
        );
        /*文字填充色为透明*/
        -webkit-text-fill-color: transparent;
        /*背景剪裁为文字，相当于用背景填充文字*/
        -webkit-background-clip: text;
        background-clip: text;
        /*将背景拉长一倍，给予移动变化空间，用作流光效果*/
        -webkit-background-size: 800% 100%;
        background-size: 800% 100%;
        -webkit-animation: light 2s infinite linear;
        animation: light 2s infinite linear;
    }
    @keyframes light {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -100% 0;
        }
    }
`;

const SkeletonLoading = () => {
    const pathnameArray = window.location.pathname.split('/');
    const currentPage = pathnameArray[pathnameArray.length - 1];

    let shouldDelayLoading = false;
    if (currentPage === 'StatusPage') {
        shouldDelayLoading = true;
    }
    return (
        <Wrapper shouldDelayLoading={shouldDelayLoading}>
            <WingBlank>
                <TextAnimation>
                    <div id="preLoader">
                        <div>
                            <span id="first">TypeScript</span>
                            &nbsp;<span id="second">脚手架</span>
                        </div>
                    </div>
                </TextAnimation>
            </WingBlank>
        </Wrapper>
    );
};

export default SkeletonLoading;
