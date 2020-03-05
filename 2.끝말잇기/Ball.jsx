// 공
import React, { memo } from 'react';

const Ball = memo(({ number }) => {
    let background;
    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = 'orange';
    } else if (number <= 30) {
      background = 'yellow';
    } else if (number <= 40) {
      background = 'blue';
    } else {
      background = 'green';
    };
  
    return (
      <div className="ball" style={{ background }}>{number}</div>
    );
  }); // 함수 컴포넌트! state 안쓰면 이거 쓰는게 훨씬 좋다! (Hooks 아님)
  // memo를 적용하면 HOC가 된다. 

/*class Ball extends PureComponent {
    render() {
        let background;
        if (number <= 10) {
            background = 'red';
        } else if (number <= 20) {
            background = 'orange';
        } else if (number <= 30) {
            background = 'yellow';
        } else if (number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (
            <div className="ball" style={{ background }}>{number}</div>
        );
    }
}*/

export default Ball;