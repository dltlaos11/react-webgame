import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        boolean: true,
        object: {a:1},
        array: [], // 자료구조 배열안에 객체 넣는 식의 복잡한 자료구조는 웬만하면 사용하지 말기
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }
    // nextContext는 context api 적용할 떄 사용.
    // Context
    // A -> B -> C -> D (A로부터 D까지의 props이동은 쓸데없이 B, C가 props를 받게 된다. props를 받는 다는 것은 렌더링의 위험에 노출)🟢🟢
    // Ex) Setstate 아무것도 안바꿔도 PureComponent적용 안하면 의미없는 렌더링 되는거 !🟢
    // props도 쓸데없이 받으면 렌더링 될 위험이 있다. 그래서 A에서 D로 바로 전달하는 방법이 있는데 그게 바로 contexet, redux🟢
    // props의 진화형이 context

    // props 문제점🟢
// props를 많이 활용하다 보면 문제가 많이 생긴다. Rendering(state나 props가 바꼈을 떄)🟢이 자주 일어나서 성능이 안좋아지는 문제가 있다.
// 찾아내는 법 & 해결하는 법 React dev tools 사용
// React 확장 프로그램 사용하면 Component 별 확인 가능. 또 그 안에 state도 확인 가능 !
// React로 만든 페이지 가면 확장 프로그램에 파란 불이 들어온다.🔵  
// 빨간 불이 들어오는 경우도 있는데 그건 "개발모드"를 의미, 개발모드를 배포모드로 바꿀려면 webpack.config.js로 가서 development->production으로 바꾸면 된다.
// 그리고 process.env.Node_ENV = 'production' 환경변수를 production으로 설정 해야 한다.
// 배포 모드에서는 소스 코드 압축 및 최적화가 되어있다.🟢
// Source Component Redux로 React로 만든 페이지 확인 가능하다(보안 약한데 ㅋㅋ) 
// 확장 프로그램에서 Component에서 톱니바퀴 클릭하면 "Highlight updates when components render."를 확인 할 수 있다. 그러면 렌더링 되는 컴포넌트 확인이 가능하다.
// 데이터가 안변해두 되는 컴포넌트에 하이라이트가 되면 문제가 있는것🟢 이런게 쌓이고 쌓이다 보면 성능에 문제가 발생하기 시작 
// react는 "setState만" 값이 바뀌든 말든 "호출하면" 렌더링이 된다.🧐  
// shouldComponentUpdate🔵 커스터마이징한 렌더링 가능
// shouldComponentUpdate(nextProps, nextState, nextContext) {
    // if(this.state.counter !== nextState.counter) { 현재의 counter와 미래의 바뀌는 counter가 다르면 렌더링(true)
    //     return true;
    // }
    // return false; // 렌더링 하지마 !🖐
// }  render처럼 react에서 지원하는 메서드

// Devtool로 확인하면 렌더링이 안되는 것을 확인 할 수 있다.😀

// PureComponent🔵 state가 변했는지 안변했는지 자동으로 알아차리기 떄문에 바뀌는 경우에만 렌더링해줌
// PureComponent를 자주 쓰고, 옛날 객체 그대로 가져오지 말고 새로운 배열이나 새로운 객체를 만들어야 한다🟢🟢
// shouldComponentUpdate를 하기 귀찮을 수 있다. 그럴 경우 shouldComponentUpdate를 구현한 PureComponent를 사용하면 된다.
// Component -> PureComponent로 바꾸어 사용하면 된다 !😀
// PureComponent의 문제점🟢
// 객체나 배열을 다룰 떄 조심해야 한다.
// onClick = () => {
//     const array = this.state.array;
//     array.push(1);
//     this.setState({
//         array: array
//     });
// } 
// 렌더링 ❌ 새로운 배열을 만들어주지 않으면 알아차리지 못해서 문제가 생긴다. 
// 불변성, 새로운 배열이나 새로운 객체를 만들어야 한다. 위의 onClick은 PureComponent가 현재 array와 다음 array랑 비교해보면 같다고 나와서 알아차리지 못하는 것이다.
// 그래서 새로운 array를 만들고 싶다면 기존 array를 펼치고 새로운 값을 추가하면 된다.  
// onClick = () => {
//     this.setState({
//         array: [...this.state.array, 1],
//     });
// } // PureComponent든 그냥 Component든 배열 코드는 위처럼 다뤄야 한다.
// 다시 렌더링 된다🟢 값을 바꿔준 것을 PureComponent가 알아차린 것

// 둘 중 하나만 사용해도 값이 변하지 않는 컴포넌트의 무의미한 렌더링에서 벗어날 수 있다.😀 

    onClick = () => {
        this.setState({
            object: {a:1}
        });
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;