import React, {useReducer, createContext, useMemo, useEffect, memo} from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {}, // 모양만 맞춰줬음.
}); // 기본 값 넣을 수 있음

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
        // 지뢰 개수만큼 랜덤하게 뽑아둔것.
        shuffle.push(chosen);
    };
    const data = [];
    for (let i=0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for (let j=0; j < cell; j++){
            rowData.push(CODE.NORMAL); //  아무것도 손대지 않은 칸.
        };
    };

    for(let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell; // 몇, 몇인지 알수있다.
        data[ver][hor] = CODE.MINE; // 지뢰심기
    }
    console.log(data);
    return data;

};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    // 어떤 동작을 할 지 reducer를 통해 정의해야함.

    switch (action.type) { // ,와 .을 헷갈리지 말자 ^.^ 제발.. 너 찾느라 몇분을 허비한거니 ㅡㅡ
            case START_GAME:{
                return {
                    ...state,
                    data: {
                        row: action.row,
                        cell: action.cell,
                        mine: action.mine
                    },
                    openedCount: 0,
                    tableData: plantMine(action.row, action.cell, action.mine),
                    //Form에서 row, cell ,mine을 받아서 지뢰를 심는다.
                    halted: false,
                    timer: 0,
                    result: '',
                };
            }    
            case OPEN_CELL:{
                const tableData = [...state.tableData];
                tableData.forEach((row, i) => {
                    tableData[i] = [...row];
                });
                const checked = []; // 한번 열어본 칸은 다시 검사하지(열지) 않는다.
                let openedCount = 0;
                const checkAround = (row, cell) => {
                    // 내 기준으로 주변을 검사하는 재귀함수.
                    if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                        return;
                    } // 상하좌우 칸이 없는 경우
                    if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                        return;
                    }
                    if (checked.includes(row + ',' + cell)){
                        return; // 이미 검사한 칸이면 끊어주고
                    } else {
                        checked.push(row + ',' + cell);
                    }
                    let around = [];
                    if (tableData[row - 1]) {
                    around = around.concat( // around = 해주기! 안해주면 안돼!
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1], // 윗 줄 3칸
                    );
                    }
                    around = around.concat(
                    tableData[row][cell - 1],
                    tableData[row][cell + 1], // 같은 줄 2칸
                    );
                    if (tableData[row + 1]) {
                        around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1], // 밑 줄 3칸
                        );
                    }
                    const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                // 주변 지뢰들의 개수를 센당
                    if (count === 0) {
                        if (row > -1){
                            const near = [];
                            if(row -1 > -1) { // 제일 윗칸 클릭
                                near.push([row - 1, cell - 1]);
                                near.push([row - 1, cell]);
                                near.push([row - 1, cell + 1]);
                            }
                            near.push([row, cell - 1]);
                            near.push([row, cell + 1]);
                            if(row + 1 < tableData.length) { // 제일 아랫칸 클릭
                                near.push([row + 1, cell - 1]);
                                near.push([row + 1, cell]);
                                near.push([row + 1, cell + 1]);
                            }
                            near.forEach((n) => {
                                if (tableData[n[0]][n[1]] !== CODE.OPENED){
                                    checkAround(n[0], n[1]);
                                }
                            }); // 주변 칸들 클릭.
                        }
                    }
                    if (tableData[row][cell] === CODE.NORMAL) {
                        openedCount += 1; // 내 칸이 닫힌 칸이면... 이거 때문에 승리 조건 버그 생겼음
                    }
                    tableData[row][cell] = count;
                };

                checkAround(action.row, action.cell);
                // 승리 조건 체크 시작
                let halted = false;
                let result = '';
                console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
                if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                    halted = true;
                    result = `${state.timer}초 만에 clear🤗`;
                }
                return {
                    ...state,
                    tableData,
                    openedCount: state.openedCount + openedCount,
                    halted,
                    result
                };
            }
            case CLICK_MINE: {
                const tableData = [...state.tableData];
                tableData[action.row] = [...state.tableData[action.row]];
                tableData[action.row][action.cell] = CODE.CLICKED_MINE;
                return {
                    ...state,
                    tableData,
                    halted: true,
                };
            }
            case FLAG_CELL: {
                const tableData = [...state.tableData];
                tableData[action.row] = [...state.tableData[action.row]];
                if (tableData[action.row][action.cell] === CODE.MINE) {
                    tableData[action.row][action.cell] = CODE.FLAG_MINE;
                } else {
                    tableData[action.row][action.cell] = CODE.FLAG;
                }   
                return {
                    ...state,
                    tableData,
                };
            }
            case QUESTION_CELL: {
                const tableData = [...state.tableData];
                tableData[action.row] = [...state.tableData[action.row]];
                if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                    tableData[action.row][action.cell] = CODE.QUESTION_MINE;
                } else {
                    tableData[action.row][action.cell] = CODE.QUESTION;
                }   
                return {
                    ...state,
                    tableData,
                };

            }
            case NORMALIZE_CELL: {
                const tableData = [...state.tableData];
                tableData[action.row] = [...state.tableData[action.row]];
                if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                    tableData[action.row][action.cell] = CODE.MINE;
                } else {
                    tableData[action.row][action.cell] = CODE.NORMAL;
                }   
                return {
                    ...state,
                    tableData,
                };

            }
            case INCREMENT_TIMER: {
                return {
                    ...state,
                    timer: state.timer + 1,
                }
            }
            default:
                return state;
        }

    };

const MineSearch = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;

    const value = useMemo(() => ({tableData, halted, dispatch}),[tableData, halted]);

    useEffect(() => {
        let timer;
        if(halted === false) {
            timer = setInterval(() => {
                dispatch({type: INCREMENT_TIMER});
            }, 1000);
            return () => {
                clearInterval(timer);
            }

        }

    },[halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
});

export default MineSearch;