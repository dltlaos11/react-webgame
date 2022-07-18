import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

// useReducer와 Context Api를 같이 사용하면 Redux를 대체할 수 있는거 아닌가?🧐🧐
// 하지만 실제로는 대체하기는 힘들고 소규모 앱에서는 굳이 Redux라는 라이브러리를 쓸 필요가 없는 경우에는 사용 가능
// 규모가 큰 앱 경우, Redux를 사용해야 한다. useReducer와 Context Api만으로는 비동기 작업을 할 떄 불편
// 비동기 부분 처리를 위해 결국 리덕스를 써야 한다. 🟢🟢  useReducer와 Context Api로 흉내내기는 가능
 
const initialState = { // state역할, action을 통해 바꿈.
    winner: '',
    turn: 'O',
    tableData: [
        ['','',''], 
        ['','',''], 
        ['','',''],
    ],
    recentCell: [-1. -1], // 없는 칸
};
// ... -> 객체를 spread
// 불변성 지키기위해 바꾸고 싶은 부분만 바꿔야🔵🔵 얕은복사🟢로  state 바꿀 떄 지켜줘야한다.  
// const a = {b:1, c:2}
// const b = a;
//  a===b; true
//  const c= {...a}🟢 {}
//  c {b:1, c:2}
//  c === a; false
// 배열
// const d = [1, 2, 3]
// const f = [...d]🟢 []
// d === f false

export const SET_WINNER = 'SET_WINNER'; // export를 붙여 module로 만듦
export const CLICK_CELL = 'CLICK_CELL'; // td컴포넌트에서 사용하기 위해서 module로 만듦.
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) { 
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안된다. 🖐 ❌
            // 항상 새로운 객체를 만들어서 만들고 "🟢바뀐 값만🟢" 바꿔줘야 한다.🔵🔵
            // 기존 state를 직접 바꾸는게 아니라 새로운 state를 만들어서 바뀌는 부분만 바꿔준다.🟣
            return { // 새로운 객체
                ...state, // 객체를 새롭게 복사🟢 spread 문법, 기존 state가 얕은 복사가 된다.
                winner: action.winner, // 바뀔 부분만 새롭게 바꿔주는🟢🟢
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData]; // 기존의 tableData 얕은 복사🟢, 객체가 있으면 얕은복사를 해줘야  
            tableData[action.row] = [...tableData[action.row]];
            // 객체에 대한 불변성을 위해 얕은 복사🟣, immer 라이브러리로 가독성 해결
            // row와 cell을 action에서 받아서 처리하는 것🟢
            // 객체가 있으면 또 얕은복사로 처리해줘야 한다 🟢🟢 불변성 지키는데 단점이다 -> 얕은복사로 펴주는게, 그래서 immer로 가독성 해결
            tableData[action.row][action.cell] = state.turn; // 테이블에 들어갈 turn이 "O" or "X"
            return {
                ...state,
                tableData, // 위의 코드들로 원하는 부분만 불변성 지키면서 바꾼것이다.
                recentCell: [action.row, action.cell], // 가장 최근에 클릭한 cell을 기억하는 공간🟢 
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['','',''], 
                    ['','',''], 
                    ['','','']
                ],
                recentCell: [-1. -1], 
            };
        }
        default:
            return state;
    }
};
// reducer는 함수, reducer안에서 state를 어떻게 바꿀지 적어주는 것이다. 

const TicTacToe = () => {
    
    // 현재 컴포넌트 구조
    // TicTacToe안에 Table안에 Tr안에 Td가 있다. 구조가 4단
    // 실제로 클릭하는 건 Td들이다. state는 가장 부모 컴포넌트인 TicTacToe에서 관리하는데 중간에 Table이랑 Tr이 있어서 간격이 존재🟢
    // TicTacToe에서 Td까지 데이터를 2번을 더 거쳐야 전달 가능,
    // 또한 6개의 state를 2번 거쳐서 전달해줘야 함, 보통 Context APi 사용하는데 여기서는 state의 갯수를 줄이는 useReducer를 사용🟢🟢
    // const [winner, setWinner] = useState('');
    // const [turn ,setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);
    // -> useReducer 사용🔵
    const [state, dispatch] = useReducer(reducer, initialState); // 3번째 인자는 지연 초기화 lazyinitialize라고 지연초기화라고 있는데 거의 안씀. 복잡할떄 사용한다. 
    // state에 initialState를 만들었기 떄문에 state.xxx로 접근 가능
    const { tableData, turn, winner, recentCell } = state; 
    // 많은 state를 쉽게 다루고 dispatch로 setState를 해주는 방식의 useReducer🟢 useState가 많으면 useReducer를 고려🟣🟣

    // 컴포넌트에 넣는 이벤트 함수들은 useCallback사용🟢
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O'}); // action.type, action.winner
        // dispatch안에 들어가는 건 action이라고 부름, redux에서 따온 개념, dispatch안에 들어가는 action 객체를 만들어야 한다.
        // action 객체 안에 type과 원하는 state를 명시. 🟢dispatch({action 객체}): dispatch가 action을 실행🟢
        // action만 있다고 자동으로 state가 변하는 것은 아니고 action을 해석해서 state를 직접 바꿔주는 역할이 필요하다. 그게 바로 reducer🟢🟢
        // action을 dispatch할 떄 마다 reducer가 실행
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell; // 현재 클릭한 cell이 row,cell에
        if (row < 0) {
            return; // useEffect는 컴포넌트가 처음 렌더링 될떄도 실행되기 떄문에 처음에는 recentCell이 -1로 초기화해서 승자를 처음에는 없도록
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로
          win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로
          win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선
          win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
          win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn});
            dispatch({ type: RESET_GAME});
        } else {
            // 무승부 검사
            let all = true; // all이 true면 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) { // 하나라도 안차있으면 
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: SET_WINNER, winner: null });
                dispatch({ type: RESET_GAME}); 
            }
            else {
                dispatch({ type: CHANGE_TURN }); // 승리검사를 하고 난 뒤에 이긴것이 아니면 CHANGE_TURN, 🟢
                // 이전에 CLICK_CELL을 하고 CHANGE_TURN을 했었는데 CLICK_CELL을 하던 도중 turn이 이미 다른 turn으로 바껴버려서
                // 기다하던 turn 값이 나오지 않고 상대방 turn이 나와, CHANGE_TURN의 비동기 문제 발생으로 Td 에서 TicTacToe에서 dispatch🟢🟢       
            }
        }
    }, [recentCell]); // recentCell이 바꼇을떄 useEffect실행

    return(
        <>
            <Table onClick = {onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;