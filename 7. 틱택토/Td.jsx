import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {  
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return; // cellData가 있다면 끊어버림..🟢
        } // O에서 한 번 눌렀을 떄 X로 바뀌는 것을 막음 🟣 
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex}); // 시작은 'O', row Index CELL 클릭
        // dispatch({ type: CHANGE_TURN });  클릭하면 turn이 바뀐다. 비동기 문제로 TicTacToe useEffect로 이동
        // 근데 dispatch는 TIcTacToe에 있으므로 props로 dispatch를 전달받는다🟢
        // ContextAPI를 쓰면 props로 TicTacToe -> Table -> Tr -> Td로 안넘겨두 되고 TIcTacToe -> Td가 가능🔵

        // dispatch뿐만 아니라 state 안에 있는 tableData도 넘겨 받는다.🟢
        // state.tableData ->  rowData={tableData[i]} -> cellData={rowData[i]}, Data도 계속 넘겨준다.(귀찮음)🥲 

        // dispatch에서 state바꾸는 것은 비동기이다.🔵 redux는 동기적으로 바뀐다. 그러나 useReducer는 state가 비동기적으로 바뀐다.🔵
        // react도 state가 비동기적으로 바뀐다. 현재 코드위치에서 state.turn을 출력해보면 CHANGE_TURN하기 전 turn이 출력된다.
        // 즉, state는 비동기이다. 비동기인 state에서 무언가를 처리하려면 useEffect를 사용해야한다.🔵🔵 
        // 비동기 state에 따라 무엇을 처리할 때는 "useEffect"를 쓴다 !!🔵    
    }, [cellData]); // cellData는 바뀌므로 []에서 감지🟣

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;