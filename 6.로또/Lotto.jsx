// 이때까지 배웠던 내용들 모두 쓰는 예제 ! 꼭 복습하기🕵️‍♀️
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
        // 가장 쉬운 셔플 방법, Math.random으로 숫자들 뽑아서 옆에 배열로 옮기면 된다.
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const WinNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
    console.log(WinNumbers);
    return [...WinNumbers, bonusNumber];
};

const Lotto = () => { // 이 부분이 전체가 다시 실행되기 때문에 getWinNumbers도 계속 다시 실행된다.
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    
    const timeouts = useRef([]);

    useEffect (() => {
        runTimeouts();
        return () => {
            timeouts.current.forEach((v)=> {
                clearTimeout(v);
            });
        };
    },[timeouts.current])// componentDidMount와 같음 (배열이 빈배열)
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행.
    // timeouts.current가 버튼을 눌렀을 때 바뀌기 때문에 잘실행된다.
    const runTimeouts = () => {
        for (let i=0; i < winNumbers.length - 1; i++) {
            // let을 사용하면 클로저 문제 생기지 않는다.
            timeouts.current[i] = setTimeout(() => { // 여기서는 timeouts.current 바뀌지 않음.
                setWinBalls((prevState) => [...prevState, winNumbers[i]])
            }, (i+1) * 1000);
        }// 보너스 공 뺄려고 1빼준거
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    };

    const onClickRedo = useCallback(() => {
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumbers]);

    return (
        <>
        <div>🕵️‍♀️당첨 숫자🕵️‍♀️</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>🧙‍♂️보너스🧙‍♂️</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>🎲한 번 더?🎲</button>}
        </>
    );
};

export default Lotto;

