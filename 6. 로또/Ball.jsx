// import React, { PureComponent } from 'react';

import React, {memo} from 'react';
// data를 다루지 않는 경우(state의 쓰임이 없는 경우) 그냥 함수 컴포넌트로 만드는 것이 효율이 좋다.🟢
// hooks는 useState, useEffect같은 함수르 사용하는 경우를 hoosk라고 부른다.

// 대신 purecomponent로 만들고 싶으면 memo로 감싸주기
const Ball = memo(({number}) => {
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
    background = 'orange';
    } else if (number <= 30) {
    background = 'yellow';
} else if (number <= 40) { 
    background = 'blue';
    } else {
    background = 'green';
    }
    return (
    <div className="ball" style={{background}}>{number}</div>
    );
}); // 컴포넌트를 다른 컴포넌트로 감싸는 것을 high-order 컴포넌트 (HOC)라 부른다.
// class Ball extends PureComponent {
//     render() {
//         const {number} = this.props;
//         let background;
//         if (number <= 10) {
//             background = 'red';
//           } else if (number <= 20) {
//             background = 'orange';
//           } else if (number <= 30) {
//             background = 'yellow';
//           } else if (number <= 40) {
//             background = 'blue';
//           } else {
//             background = 'green';
//           }
//           return (
//             <div className="ball" style={{background}}>{number}</div>
//           );
//     }
// }
export default Ball; 