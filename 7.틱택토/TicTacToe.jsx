// TicTacToe -> Table -> Tr -> Td
// 클릭하면 TicTacToe -> Td 전달한다.

import React, {useState, useReducer, useCallback, useEffect, memo} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: '🍑',
    tableData: [['','',''],['','',''],['','','']],
    /* 이거 대신 써준거... 
    const [winnner, setWinner] = useState('');
    const [turn, setTurn] = useState('0');
    const [tableData, setTableDate] = useState([['','',''],['','',''],['','','']]);
    */
   recentCell: [-1,-1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
// export를 붙여서 모듈로 만들자 -> CLICK_CELL 액션을 Td에서 사용할 것이기 때문
const reducer = (state, action) => {
    // state를 어떻게 바꿀지 적어준다.
    switch(action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 라고 직접 바꾸면 안된다.
            return {
                ...state, // spread로 얕은 복사
                winner: action.winner,
            };
        case CLICK_CELL: {
            // 불변성을 지켜야하기 때문에 우리가 바꾸고 싶은 부분만 바꿔야한다.
            // 그래서 복잡해진다.
            const tableData = [...state.tableData]; // 얕은 복사
            tableData[action.row] = [...tableData[action.row]];
            // td에서 넣어줬던 rowIndex
            tableData[action.row][action.cell] = state.turn;
            // 현재의 turn을 넣어준다.
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === '🍑' ? '🍊' : '🍑',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: '🍑',
                tableData: [['','',''],['','',''],['','','']],
                recentCell: [-1,-1],
            };

        }
        default:
            return state;
    };
};
// 배열의 reduce 함수처럼 뭔가를 줄인다는 뜻.
const TicTacToe = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // 세번째 인자에 지연초기화까지 넣어주는데 복잡해질때만 사용.

    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: '🍊'}); // action.type과 action.winner가 된다.
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0){
            return;
        };
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
          win = true; // 가로줄
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
          win = true; // 세로줄
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
          win = true; // 대각선1
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
          win = true; // 대각선2
        }
        if(win) { // 승리시
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({ type: RESET_GAME });
        }
        else {
            let all = true; // all이 true면 무승부라는 뜻(칸이 다 차있다.)
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                if (!cell) {
                    all = false;
                }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    },[recentCell]);

    return (
        <>
        <Table onClick = {onClickTable} tableData={tableData} dispatch = {dispatch}/>
        {winner && <div><b>{winner}님의 승리🐱‍🏍</b></div>}
        <div>{state.turn}님 차례!</div>
        </>
    )
});
export default TicTacToe;