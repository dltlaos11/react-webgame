import React, { useContext} from 'react';
import { CODE, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };   
        case CODE.OPENED:
            return {
                background: 'white',
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
      return code || '';
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
    const { tableData } = useContext(TableContext);
    // tableData는 useContext로부터 받고,
    // 내가 몇 번째칸 몇 번째 줄인지는 부모로부터 props로 받아서 td에서 데이터 위치 구성 가능🟢
    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;