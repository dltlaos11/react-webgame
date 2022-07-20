import React, { useContext} from 'react';
import { TableContext } from './MineSearch';
import Td from './Td';

const Tr = ({rowIndex}) => { // Table로부터 rowIndex 받고
    const {tableData} = useContext(TableContext);
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
             <Td rowIndex={rowIndex} cellIndex = {i}/>) // Tr로부터 cellIndex 받는다 -> Td가🟢
             } 
        </tr>
    )
};

export default Tr;