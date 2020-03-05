import React, {PureComponent} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends PureComponent {
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 비동기 요청을 많이 함.
        this.interval = setInterval(this.changeHand, 100);
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청의 정리를 많이 함.
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '🤗무승부🤗',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '🤔승리🤔',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '😜패배😜',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000); // 1초 후에 다시 시작된다.
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
          <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
              <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>✊</button>
              <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>✌</button>
              <button id="paper" className="btn" onClick={this.onClickBtn('보')}>🖐</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
          </>
        );
      }
}

export default RSP;