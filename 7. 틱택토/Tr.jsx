import React, { useMemo, memo } from "react";
import Td from './Td';

// 반복문이 있는 곳에 memo를 하면 좋다🟢
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log('tr rendered');
    return (
        <tr>
            {Array(rowData.length).fill().map(
                (td, i) => (
                    // useMemo🟢로 컴포넌트 기억(최적화)🟢🟢
                    // Td컴포넌트에 memo를 헀는데도 리렌더링 되면 useMemo(성능 최적화가 정 안될떄 !)
                    // 값을 기억하는 것은 useMemo, 함수를 기억하는 것은 useCallback🟢, 
                    // useMemo로 컴포넌트도 기억할 수 있다. 바뀌지가 않는다.
                    useMemo(() => 
                    <Td dispatch={dispatch} key={i} rowIndex ={rowIndex} cellData={rowData[i]} cellIndex={i} >{''}</Td>,
                    [rowData[i]], // rowData[i]가 바꼈을 떄 바뀜.
                    // 컴포넌트 자체를 기억
                    ) 
                ))}
        </tr>
    );
});

export default Tr;