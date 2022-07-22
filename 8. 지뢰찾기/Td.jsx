import React, { useContext, useCallback } from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || ''; // 주변 지회 갯수가 0인경우 0표시 를 빈칸으로
  }
//   switch (code) {
//     case CODE.NORMAL:
//         return '';
//     case CODE.NAME:
//         return 'X';
//     default:
//         return '';
// }
};

const Td = ({rowIndex, cellIndex}) => { 
    const { tableData, dispatch, halted } = useContext(TableContext);
    // tableData는 useContext로부터 받고,
    // 내가 몇 번째칸 몇 번째 줄인지는 부모로부터 props로 받아서 td에서 데이터 위치 구성 가능🟢

    const onClickTd = useCallback(() => {
      if (halted) { // 게임이 멈췄으면 아무일도 하지않게 retrun🟢🟢
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.OPENED:
        case CODE.FLAG_MINE:
        case CODE.FLAG:
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          return;
        case CODE.NORMAL: // 보통 칸
          dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
          // 클릭하면 OPEN_CELL action이 dispatch 되면서 몇 번째 줄, 몇 번째 칸인지 전달되면서 MineSearch에서 변경 가능
          // 데이터가 변경되면 화면은 알아서 바뀔 것.
          return;
        case CODE.MINE: // 지뢰 클릭, 펑 터지게
          dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex});
          return;
        default:
          return;
      }
    }, [tableData[rowIndex][cellIndex], halted]); // 데이터가 계속 바뀌므로 배열에 넣어줌

    const onRightClickTd = useCallback((e) => {
      e.preventDefault(); // 메뉴 안뜨도록
      if (halted) { // 게임 멈춤시 아무일도 하지않게🟢
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL: // 보통 -> 깃발🟢
        case CODE.MINE: // 깃발을 꽃야야
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex});
          return; // switch문은 끊어줘야 한다.🟢 return or break; 
        case CODE.FLAG_MINE: // 깃발 -> 물음표🟢
        case CODE.FLAG: // 깃발이 꽃인 경우
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex}); // 물음표로 바꾸는
          return;
        case CODE.QUESTION_MINE: // 물음표 -> 보통 🟢
        case CODE.QUESTION: // 물음표가 있는 경우
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
          return;
        // action 4개를 새로 만들었으니 reducer에서 새로 만들어야 한다. action을 추상적으로 만들고 구현은 나중에 하면 된다.🟢
        // reducer가 action 발생 시에 state를 어떻게 바꿀지 처리하는 부분이기 때문에
        default:
          return; 
      }
    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;