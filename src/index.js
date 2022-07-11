import React, {createElement, useEffect, useRef, useState} from 'react';
import clamp from './clamp';

const Clamp = ({tagName, text, children, width, options, hasMoreChange, ...props}) => {
    const targetText = text || children;
    options = Object.assign({clamp: 1}, options);
    const ref = useRef(null);
    const hasMoreChangeRef = useRef(hasMoreChange);
    hasMoreChangeRef.current = hasMoreChange;
    useEffect(() => {
        clamp(ref.current, options);
    }, [options]);
    useEffect(() => {
        if (hasMoreChangeRef.current) {
            const root = document.createElement('div');
            root.innerHTML = ref.current.innerHTML;
            root.style.maxWidth = width;
            ref.current.parentElement.appendChild(root);
            hasMoreChangeRef.current(root.clientHeight > ref.current.clientHeight);
            ref.current.parentElement.removeChild(root);
        }
    }, [targetText, width, tagName]);
    return createElement(tagName, {
        key: options.clamp,
        ref, style: width ? {
            'maxWidth': width
        } : {}, ...props
    }, targetText);
};

Clamp.Expand = ({children, options, ...props}) => {
    const [isExpand, setIsExpand] = useState(false);
    const [needExpand, setNeedExpand] = useState(false);

    return children({
        needExpand,
        isExpand,
        clampElement: <Clamp options={Object.assign({}, options, isExpand ? {
            clamp: 'auto'
        } : {})} {...props} hasMoreChange={(value) => {
            setNeedExpand(value);
        }}/>,
        change: (target) => setIsExpand(target),
    })
};

Clamp.defaultProps = Clamp.Expand.defaultProps = {
    tagName: 'span'
};

export default Clamp;
