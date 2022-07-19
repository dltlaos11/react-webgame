import React, { useCallback, useEffect, memo, useRef } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered'); // 불필요한 리렌더링 감지 

    // 성능 최적화🟣🟣, React.memo 적용하면 쉽긴하다😅
    // useEffect랑 useRef로 뭐떄문에 리렌더링 되는지 확인할 수 있다.🟢🟢
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        // 바뀌는게 있다면 false로 바뀜. 그 친구 때문에 리렌더링이 발생. 성능 최적화 할 떄 이 방식을 사용하면 좋다.🟣🟣
        console.log(cellData, ref.current[3]);

        ref.current = [rowIndex, cellIndex, dispatch, cellData];
        // ref는 계속 바뀔 것, props 중 안바뀌는 것이 있을 수 있다. 그런 것들을 파악하기 위한 작업. 어떤게 바뀌고 어떤게 안바뀌는가
    }, [rowIndex, cellIndex, dispatch, cellData]); // useEffect의 2번째인자에 각종 props를 다 넣는다🟢 
    // props문제가 아니면 부모 컴포너트에서 확인, 근데 하다가 문제가 없어서 memo로 감싸서 성능 최적화했다 ㅎㅎ 😅

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
    
    // useCallback🟢
    // Pros로 넣어두는 data는 웬만하면 useCallback으로 감싸는 것이 좋다.
    // useCallback안에서 값이 계속 바뀔 것 같은 것은 2번째 인자(배열)에 넣는 것이 좋다.

    // 자식이 리렌더링 되면 React dev tools에서 부모도 하이라이트된다. 자식이 리렌더링 되면 자식 -> 부모로 하이라이트가 퍼짐🟢
    // 실제로 부모는 안되지만 그렇게 보이는 경우가 있다.
    // 하이라이트 빨간색으로 되면 최적화 필수🟢

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;