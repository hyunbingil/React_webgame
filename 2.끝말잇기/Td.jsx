import React, {useCallback, useEffect, useRef, memo} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];

    }, [rowIndex, cellIndex, dispatch, cellData])
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if(cellData) {
            return;
        } // 눌렀던 곳 다시 못눌러
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex}); // action은 마음대로 만들면 된다, reducer에서 잘 처리해주면 된다.
        // 클릭 한 것이 몇번째 줄, 몇번째 칸이다.
        // 그리고 메인 컴포넌트(TicTacToe)에 하나 추가해주면 된다.
    },[cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;