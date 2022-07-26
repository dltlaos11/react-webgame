import React, { memo, useContext} from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i}/>) // Tr에 rowindex 알려주기
            // 행수 열수로 반복문 돌려서 tr, td 만들기
            }
        </table>
    )
});

export default Table;