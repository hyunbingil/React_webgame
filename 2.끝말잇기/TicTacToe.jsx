// TicTacToe -> Table -> Tr -> Td
// 클릭하면 TicTacToe -> Td 전달한다.

import React, {useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
    /* 이거 대신 써준거... 
    const [winnner, setWinner] = useState('');
    const [turn, setTurn] = useState('0');
    const [tableData, setTableDate] = useState([['','',''],['','',''],['','','']]);
    */
};

let SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
    // state를 어떻게 바꿀지 적어준다.
    switch(action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 라고 직접 바꾸면 안된다.
            return {
                ...state, // spread로 얕은 복사
                winner: action.winner,
            };
    };
};
// 배열의 reduce 함수처럼 뭔가를 줄인다는 뜻.
const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // 세번째 인자에 지연초기화까지 넣어주는데 복잡해질때만 사용.

    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: '🎶'}); // action.type과 action.winner가 된다.
    }, []);
    const tableLength = tableData.length
    return (
        <>
        <Table onClick = {onClickTable} tableLength={tableLength} tableData={tableData}/>
        {winner && <div>{winner} 승🐱‍🏍</div>}
        </>
    )
};
export default TicTacToe;