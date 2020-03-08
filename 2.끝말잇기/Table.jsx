import React from 'react';
import Tr from './Tr';
const Table = ({tableData, dispatch}) => {
    console.log(tableData.length);
    return (

        <table>
            {Array(tableData.length).fill().map((tr, i)=>(<Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
        </table>
    );
};

export default Table;