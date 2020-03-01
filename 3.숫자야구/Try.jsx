import React, { PureComponent, memo } from 'react';

const Try = memo(({ tryInfo }) => { // props인데 { tryInfo }로 구조분해가 가능.
    return (
        <li>
            <div>{ tryInfo.try }</div>
            <div>{ tryInfo.result }</div>
        </li>
    )
}); // props 사용하면 props.tryInfo.try로 바꿔주기

export default Try;