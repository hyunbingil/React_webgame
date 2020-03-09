import React, { useContext, useCallback, memo, useMemo } from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    // code를 기반으로 칸의 배경을 어떻게 표시할 지 정한다.
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#95afc0',
      };
    case CODE.CLICKED_MINE:
        return {
            background: '#eb4d4b',
        };
    case CODE.OPENED:
      return {
        background: '#dff9fb',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: '#ffbe76',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: '#badc58',
      };
    default:
      return {
        background: '#dff9fb',
      };
  }
};

const getTdText = (code) => {
     // code를 기반으로 칸의 텍스트를 어떻게 표시할 지 정한다.
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return '💣';
    case CODE.CLICKED_MINE:
      return '🎆';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '🚩';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '❔';
    default:
      return code || '';
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return; // 게임이 멈췄으면 아무것도 하지 X.
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if (halted) { // 게임이 멈췄으면 아무것도 하지 X.
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return; // 또는 break로 끊어주기
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);
  // 바뀌는 부분은 여기 배열에 넣어주는 거 잊지말기!
  console.log('td rendered');

  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});

export default Td;