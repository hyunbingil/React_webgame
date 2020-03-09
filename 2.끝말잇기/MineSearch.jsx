import React, {useReducer, createContext, useMemo} from 'react';
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
    halted: false,
    dispatch: () => {}, // 모양만 맞춰줬음.
}); // 기본 값 넣을 수 있음

const initialState = {
    tableData: [],
    /* data: {
        row: 0,
        cell: 0,
        mine: 0,
    }, */
    timer: 0,
    result: 0,
    halted: true,
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

const reducer = (state, action) => {
    // 어떤 동작을 할 지 reducer를 통해 정의해야함.

    switch (action.type) { // ,와 .을 헷갈리지 말자 ^.^ 제발.. 너 찾느라 몇분을 허비한거니 ㅡㅡ
            case START_GAME:{
                return {
                    ...state,
                    tableData: plantMine(action.row, action.cell, action.mine),
                    //Form에서 row, cell ,mine을 받아서 지뢰를 심는다.
                    halted: false,
                };
            }    
            case OPEN_CELL:{
                const tableData = [...state.tableData];
                tableData[action.row] = [...state.tableData[action.row]];
                tableData[action.row][action.cell] = CODE.OPENED;
                return {
                    ...state,
                    tableData,
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
            default:
                return state;
        }

    };

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;

    const value = useMemo(() => ({tableData, halted, dispatch}),[tableData, halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;