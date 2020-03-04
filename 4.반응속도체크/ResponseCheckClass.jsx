import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting', // 색 담당
        message: '🧙‍♂️클릭하면 시작한다9🧙‍♂️',
        result: [], //시간을 받자.
    };

    timeout;
    startTime; //렌더링 방지(이 값이 바뀌어도 렌더링 안되서)
    endTime; //렌더링 방지222

    onClickScreen = () => {
        const { state, message, result} = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '🥝연두색이면 클릭하라9🥝',
                result: []
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '🍀지금이라9🍀'
                });
                this.startTime = new Date(); // 시작 시간 받아오기
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 뒤에 랜덤으로 연두색이 나옴.
        }
        else if (state === 'ready') { // 성급하게 클릭한 것 (빨강이)
            clearTimeout(this.timeout); // 초기화 시켜주지 않으면 바로 연두색 나옴.
            this.setState({
                state: 'error',
                message: '너무 빨라🏃‍♀️ 클릭하면 재시작한다9🤸‍♀️'
            })
        }
        else if (state === 'error') {
            clearTimeout(this.timeout); // 초기화 시켜주지 않으면 바로 연두색 나옴.
            this.setState({
                state: 'waiting',
                message: '🧙‍♀️침착하시9.. 클릭하면 시작한다9🧙‍♀️',
            })
        }
        else if (state === 'now') { // 제대로 눌러서 반응 속도 체크 !
            this.endTime = new Date();
            this.setState((prevState) => {
                return{
                state: 'waiting',
                message: '🧙‍♂️한번 더 하쉴? 클릭하면 시작한다9🧙‍♂️',
                result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }
    };

    render() {
        return (
            <>
            <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                {this.state.message}
            </div>
            {this.state.result.length === 0
            ? null
            : <div>💡평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>}
            </>
        );

    };
};

export default ResponseCheck;