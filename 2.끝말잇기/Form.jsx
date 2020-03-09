import React, {useState, useCallback, useContext} from 'react';
import {START_GAME, TableContext} from './MineSearch';

const Form = () => {
    const [row, setRow] = useState(10); // 세로 몇줄
    const [cell, setCell] = useState(10); // 가로 몇줄
    const [mine, setMine] = useState(20); // 지뢰 몇개
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    },[]);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    },[]);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    },[]);

    const onClickBtn = useCallback(() => {
        console.log('lalalal');
        dispatch({type: START_GAME, row, cell ,mine}); // 데이터를 action에 전해주기
    },[row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>

    );

};

export default Form;