import React, { useReducer, createContext, useMemo, useEffect } from 'react';
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
    OPENED: 0, // 0이상이면 다 opened
 };

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
}); // createContext함수 실행, 안에 초깃값 넣어줄 수 있다, 다른 파일에서 사용할 수 있게 "export"

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
};

const plantMine =(row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    } // 기본 TableData -1로 세팅
  
    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
    } // shuffle을 기반으로 [ver,hor]에 심는다.

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';


// reducer가 action 발생 시에 state를 어떻게 바꿀지 처리하는 부분이기 때문에
const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row, 
                    cell: action.cell, 
                    mine: action.mine
                }, // 가로, 세로, 지뢰갯수 기록, 객체로 해야 속성에 이름을 붙일 수 있음 
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
                 // action.row, action.cell, action.mine으로 지뢰를 심을 것.
            }
        case OPEN_CELL:{ 
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.cell] = CODE.OPENED; // 클릭한 row,cell에 opened로 바뀜
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });
            const checked =[]; //  maximum call stack exceeded 에러 방지위해, 재귀를 잘모다루면 callstack이 터질수도..🟢
            let openedCount = 0;

            // 한번 검사한 칸은 다시 검사하지 않는다.🟢
            const checkAround = (row, cell) => { // 내 주변 칸들 검사 
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;// 이미 열린 칸이나 지뢰가 있는 칸들은 막아준다. 
                    // 닫힌 칸만 열기🟢
                }
                if (row < 0 || row >= tableData.length || cell < 0 || cell >=tableData[0].length){ 
                    // 상하좌우 없는 칸은 안열기🟢
                    // tableData.length: 세로줄, tableData[0].length: 가로줄
                    return;
                }
                if (checked.includes(row + '/' + cell)) { // 이미 검사한(한번 열면) 칸이면 return
                    return;
                } else { // 검사한 칸이 아니면 검사했다고 checked에 넣어준다.
                    checked.push(row + '/' + cell);
                    // 한 번 연칸은 무시하기
                }

                let around = [ // 주변 칸의 지뢰갯수를 검사 
                    tableData[row][cell - 1], tableData[row][cell + 1],
                  ];
                  if (tableData[row - 1]) {
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                  }
                  if (tableData[row + 1]) {
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                  }
                  const count = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                  }).length;

                  if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가🟢
                    openedCount += 1; // 칸들 하나 열떄마다, 결국 열린 칸들의 갯수가 남음
                  }

                tableData[row][cell] = count;

                if (count === 0) { // 주변칸 오픈, 주변 칸들 클릭해주는 함수를 하기위해서 주변 칸들을 near에 넣음
                    if (row > -1) {
                      const near = [];
                      if (row - 1 > -1) { // 제일 윗칸을 클릭한 경우 그 위에를 없애는 코드
                        near.push([row -1, cell - 1]);
                        near.push([row -1, cell]);
                        near.push([row -1, cell + 1]);
                      }
                      near.push([row, cell - 1]);
                      near.push([row, cell + 1]);
                      if (row + 1 < tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                      }
                      near.forEach((n) => {// 있는 칸들만 주변을 클릭 v => !!v🟢
                        if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                          checkAround(n[0], n[1]);
                        }
                      })
                    }
                  }
            };
            checkAround(action.row, action.cell);
            // 클릭한 칸만 불변성을 지켜주기 위해서 새로운 객체로 만들어 주는데 옆칸들도 다 열어버릴 거기 때문에 어떤 칸이 불변성이 안지켜질지 
            // 모르기 떄문에 모든 칸들을 새로 만들어 줌
            let halted = false;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리 조건
                halted = true;
                result =`${state.timer}초만에 승리하셨습니다.`;
            }

            return {  // 클릭한 칸의 코드를 opened로
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE:{ // 지뢰 클릭
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE; // 클릭한 칸을 CLICKED_MINE으로 변경
            return {
                ...state,
                tableData,
                halted: true //게임을 멈추기 위함, 지뢰 클릭시 게임 멈춤.
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE){ // 깃발을 꽃을 칸이 지뢰가 있는 칸이면 FLAG_MINE으로 해주고
                tableData[action.row][action.cell] = CODE.FLAG_MINE; // 클릭한 칸을 CLICKED_MINE으로 변경
            } else { // 지뢰가 없는 칸인 경우
                tableData[action.row][action.cell] = CODE.FLAG; // 클릭한 칸을 CLICKED_MINE으로 변경
            }  
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE){ // 깃발심어진 상태에서 물음표를 만드는데
                tableData[action.row][action.cell] = CODE.QUESTION_MINE; // 깃발 지뢰인 경우 물음표 지뢰로 바꾸고 
            } else { // 지뢰가 없는 깃발 칸이면
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
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE){ // 물음표가 있는데 지뢰까지 있으면  
                tableData[action.row][action.cell] = CODE.MINE; // 지뢰로 바꾸고
            } else { // 물음표만 있으면
                tableData[action.row][action.cell] = CODE.NORMAL; // 보통으로 바꿔주고 
            }  
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;

    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch}), [tableData, halted]);
    // useMemo로 객체 값을 기억하기🟢 state.tableData가 바뀔 떄 갱신

    useEffect(() => {
        let timer;
        if (halted === false) { // 중단이 풀렸을떄 타이머 시작
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER});
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        // Context Api 사용
        // 1️⃣createContext함수 실행
        // ContextApi에서 접근할 수 있는 data, data들에 접근하고 싶은 컴포넌트들을 context api에 Provider로 묶어줘야 한다.🟢
        // ContextApi가 Provider 제공🟢
        // 2️⃣Provider로 묶어줘야 그 아래 컴포넌트에서 data에 접근할 수 있다.
        // 3️⃣valur={{}}: 자식 컴포넌트에게 바로 전달해줄 데이터, 그러면 자식 컴포넌트들은 value에 접근 가능🟢🟢

        // ❌<TableContext.Provider value={{tableData: state.tableData, dispatch}}>❌, 
        // MineSearch새로 리렌더링 될 떄마다 {tableData: state.tableData, dispatch}도 새로 생김
        // 객체가 새로 생긴다는 것은 ContextApi를 쓰는 자식들도 매번 새로 리렌더링. 성능적으로 문제, 캐싱을 해줘야함 -> useMemo🟣

        // Provider, ContextAPI에 값으로 넣어줄 때 넣어주는 값은 useMemo로 감싸주어야야 한다. contextAPi를 쓰면 value가 바뀔 떄마다 Provider로 감싸고 있는
        // 부분이 다 같이 리렌더링 되기 떄문에 그 value를 항상 useMemo로 캐싱을해둬야지 자식들이 안바뀔 수 있다. 안그러면 매번 리렌더링 되서 성능 저하 발생  
        // React.memo사용시 그에 해당하는 자식컴포넌트 모두 React.memo가 적용되야 한다🟢
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;


// 🟢conTextAPi 사용🟢
// createContext 사용해서 기본데이터 넣어주기🟢
// export const TableContext = createContext({
//     tableData: [],
//     halted: true,
//     dispatch: () => {},
// }); 

// xxx.Provider에 전달할(자식들한테 물려줄) value 설정🟢
// <TableContext.Provider value={value}>
// <Form />
// <div>{timer}</div>
// <Table />
// <div>{result}</div>
// </TableContext.Provider>

// 자식들에게 전달할 value들을 캐싱을 해주어야한다.🟢
// const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch}), [tableData, halted]);

// 자식들은 부모 거쳐서 props를 전달받지 않고🟢
// useContext를 써서
// Provider에 value로 전달했던 것을 바로 전달받아서 사용가능 아래처럼
// const { tableData, dispatch, halted } = useContext(TableContext);
// 최적화 문제가 있기 떄문에 memo로 감싸는거 잊지말기🟢


// 🟢🟢
// 1️⃣ 컴포넌트 분리하기 귀찮은 컴포넌트에 useMemo적용해서 함수는 100..번 호출되도 실제로 그컴포넌트는 한번만 렌더링 되도록 최적화
// useMemo🟣🟣
//   return useMemo(() => ( 
//     <td style={getTdStyle(tableData[rowIndex][cellIndex])}
//         onClick={onClickTd}
//         onContextMenu={onRightClickTd}
//     >{getTdText(tableData[rowIndex][cellIndex])}</td>
// ), [tableData[rowIndex][cellIndex]]);
// 2️⃣ 컴포넌트 분리해서 memo 적용하든지
// return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/> // 🟢🟢

// // useMemo의 사용말고 컴포넌트를 2개로 쪼개기🟢🟢
// const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
// console.log('real td rendered');
// return (
// <td style={getTdStyle(data)}
//       onClick={onClickTd}
//       onContextMenu={onRightClickTd}
//   >{getTdText(data)}</td>
// )
// });