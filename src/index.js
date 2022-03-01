import {createElement, useEffect, useRef} from 'react';
import clamp from './clamp';

const Clamp = ({tagName, text, width, options, ...props}) => {
    options = Object.assign({clamp: 1}, options);
    const ref = useRef(null);
    useEffect(() => {
        clamp(ref.current, options);
    }, []);
    return createElement(tagName, {
        ref, style: width ? {
            width
        } : {}, ...props
    }, text);
};

Clamp.defaultProps = {
    tagName: 'span'
};

export default Clamp;