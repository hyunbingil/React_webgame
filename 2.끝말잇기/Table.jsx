import React from 'react';
import Tr from './Tr';
const Table = ({onClick, tableLength, tableData}) => {
    return (
        <table onClick={onClick}>
            {Array(tableLength).fill().map((tr, i)=>(<Tr rowData={tableData[i]}/>))}
            <Tr>{''}</Tr>
        </table>
    );
};

export default Table;