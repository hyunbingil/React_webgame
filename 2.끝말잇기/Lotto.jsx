// 이때까지 배웠던 내용들 모두 쓰는 예제 ! 꼭 복습하기🕵️‍♀️
import React, {Component} from 'react';
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
    return [...WinNumbers, bonusNumber];
};

class Lotto extends Component {
    state = {
        WinNumbers: getWinNumbers(), // 당첨 숫자
        winBalls: [], // 앞에 6개
        bonus: null, // 그 다음 7번째꺼
        redo: false, // 재실행
    };

    timeouts = [];
    componentDidMount() {
        //컴포넌트가 시작하자마자 뜨는거기 때문에 이거 사용.
        const { winNumbers, winBalls } = this.state;
        for (let i=0; i < winBalls.length - 1; i++) {
            // let을 사용하면 클로저 문제 생기지 않는다.
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState)=> {
                    return{
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                        // push 하면 안되고 예전 state 이용해서 적어주기
                    };
                });

            }, (i+1) * 1000);
        }// 보너스 공 뺄려고 1빼준거
        setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true, // 한 번 더 버튼이 생긴다.
            });
        }, 7000)
    };

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }; // 꼼꼼하게 챙겨주기

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
        <>
        <div>🕵️‍♀️당첨 숫자🕵️‍♀️</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>🧙‍♂️보너스🧙‍♂️</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>🎲한 번 더?🎲</button>}
        </>
        );

    }
}

export default Lotto;