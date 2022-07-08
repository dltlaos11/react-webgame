import React, { memo, useState } from 'react';

// const Try = (props) => { // props🟢
//     return(
//         <li>
//             <div>{props.tryInfo.try}</div>
//             <div>{props.tryInfo.result}</div>
//         </li>
//     );
// }

const Try = memo(({tryInfo}) => { // props 자리에 구조분해 적용🟢 대부분 이 방식을 선호
    // tryInfo.try = 'hello'; props는 부모가 바꿔야지 자식이 바꾸면 안된다.🖐 
    
    // 자식에서 props를 바꾸고 싶다면?😮 원칙상 ❌ 🟢
    // 하지만 실무에서는 props를 바꿔줘야 하는 경우가 있다.
    // const [result, setResult] = useState(tryInfo.result); 
    // 자식은 부모로부터 물려받은 props 변경 금지 ❌ 진짜 바꿔야 하면 props를 state로 만든 뒤에 state를 바꾼다.
    // 부모로부터 받은 props를 바꾸고 싶은 경우에는 useState를 사용해 state를 만든 뒤에 state를 바꾼다.🟢🟢

    // const onClick = () => {
    //     setResult('1');
    // }
    // return (
    //     <li>
    //         <div>{tryInfo.try}</div>
    //         <div onClick={onClick}>{result}</div>
    //     </li>
    // );

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

Try.displayName = "Try";
// memo로 감싸면 개발자 도구에서 component이름이 이상하게 바뀌므로 
// 위 코드를 적용하면 컴포넌트 이름이 정상

export default Try;