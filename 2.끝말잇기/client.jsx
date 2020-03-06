import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import TicTacToe from './TicTacToe';
// 여기서 WordRelay가 WordRelay.jsx의 class인 WordRelay가 된다.

const Hot = hot(TicTacToe);
ReactDom.render(<Hot />, document.querySelector('#root'));

// 쪼개둔 파일들을 여기에 모아서 사용 가능 -! 드래곤볼인줄 ㅋ.ㅋ
