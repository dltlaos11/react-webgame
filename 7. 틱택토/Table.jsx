import React from "react";
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    // TicTacToe에서 onClick을 넘겨줬으니까 Table에 onClick을 넘겨줌
    // Td클릭하면 dispatch
    // state가 있고 직접 건들 수는 없고 state를 바꾸고 싶으면 이벤트가 실행될 떄 action을 dispatch해서 state를 변경해야한다.
    // state를 어떻게 바꿀지는 reducer에 기록을 해야한다. 
    return ( 
        <table>
            {Array(tableData.length).fill().map((tr, i) => (
            <Tr dispatch={dispatch} key = {i} rowIndex = {i} rowData = {tableData[i]}/>
            ))}
        </table>
    );
};

export default Table;