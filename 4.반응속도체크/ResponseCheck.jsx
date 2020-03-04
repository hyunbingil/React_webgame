import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('🧙‍♂️클릭하면 시작한다9🧙‍♂️');
    const [result, setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
                
            setState('ready');
            setMessage('🥝연두색이면 클릭하라9🥝');
            setResult([]);
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('🍀지금이라9🍀');
                startTime.current = new Date(); // 시작 시간 받아오기
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 뒤에 랜덤으로 연두색이 나옴.
        }
        else if (state === 'ready') { // 성급하게 클릭한 것 (빨강이)
            clearTimeout(timeout.current); // 초기화 시켜주지 않으면 바로 연두색 나옴.
            setState('error');
            setMessage('너무 빨라🏃‍♀️ 클릭하면 재시작한다9🤸‍♀️');
        }
        else if (state === 'error') {
            clearTimeout(timeout.current); // 초기화 시켜주지 않으면 바로 연두색 나옴.
            setState('waiting');
            setMessage('🧙‍♀️침착하시9.. 클릭하면 시작한다9🧙‍♀️');
        }
        else if (state === 'now') { // 제대로 눌러서 반응 속도 체크 !
            endTime.current = new Date();
            setState('waiting');
            setMessage('🧙‍♂️한번 더 하쉴? 클릭하면 시작한다9🧙‍♂️');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };


    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {result.length === 0
            ? null
            : <div>💡평균 시간 : {result.reduce((a, c) => a + c) / result.length} ms</div>}
            </>
    );

}

export default ResponseCheck;