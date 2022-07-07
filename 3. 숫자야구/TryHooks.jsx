import React from 'react';

// const Try = (props) => { // props🟢
//     return(
//         <li>
//             <div>{props.tryInfo.try}</div>
//             <div>{props.tryInfo.result}</div>
//         </li>
//     );
// }

const Try = ({tryInfo}) => { // props 자리에 구조분해 적용🟢 대부분 이 방식을 선호
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
}

export default Try;