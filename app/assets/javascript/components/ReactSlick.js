import React, { Component } from 'react';
import ReactImageMagnify from "react-image-magnify";
import ReactSlick from 'react-slick';

var src1 ="http://vsestilno.com.ua/modules/catalog_items/uploads/original/5172_7b462e7e7bfbcea36d06741201ff62d6.jpg"
var src2 = "http://vsestilno.com.ua/modules/catalog_items/uploads/original/4906_2caef0b3c95464a96f39c27cf7f02c5b.jpg"

const front_500 =src1
const front_779 =src2
const front_1020 =src1
const front_1200 =src2
const front_1426 =src1

const back_500 =src2
const back_779 =src1
const back_1020 =src2
const back_1200 =src1
const back_1426 =src2

const frontSrcSet = [
    { src: front_500, setting: '500w' },
    { src: front_779, setting: '779w' },
    { src: front_1020, setting: '1020w' },
    { src: front_1200, setting: '1200w' },
    { src: front_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const backSrcSet = [
    { src: back_500, setting: '500w' },
    { src: back_779, setting: '779w' },
    { src: back_1020, setting: '1020w' },
    { src: back_1200, setting: '1200w' },
    { src: back_1426, setting: '1426w' }
]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

const dataSource = [
    {
        srcSet: frontSrcSet,
        small: front_500,
        large: front_1426
    },
    {
        srcSet: backSrcSet,
        small: back_500,
        large: back_1426
    }
];

export default class ReactSlickExample extends Component {
    render() {
        const {
            rimProps,
            rsProps
        } = this.props;

        return (
            <ReactSlick
                {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }}
                {...rsProps}
            >
                {dataSource.map((src, index) => (
                    <div key={index}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Versace',
                                    isFluidWidth: true,
                                    src: src.small,
                                    srcSet: src.srcSet,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                },
                                largeImage: {
                                    src: src.large,
                                    width: 1426,
                                    height: 2000
                                },
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                            }}
                            {...rimProps}
                        />
                    </div>
                ))}
            </ReactSlick>
        );
    }
}
