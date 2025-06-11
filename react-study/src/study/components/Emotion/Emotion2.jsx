// 외부로 css 파일 빼기

/**
    자동완성으로 css빼놓기
    1. file → preferences → configure snippets → javascript
    2. "emotion" : {
		"prefix": "ej",
		"body": [
			"@jsxImportSource @emotion/react",
			"import * as s from './styles';"
		],
		"description": "이모션 쉽게 사용하려고 만듦",

        → ej만 쳐도 자동완성으로 나옴
 */


/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';

function Emotion2(props) {
    return (
        <div>
            <div css={s.box1}></div>
            <div css={s.box2("gray")}></div>
        </div>
    );
}

export default Emotion2;