import React, { PureComponent } from 'react';

class Try extends PureComponent { // PureComponent로 억울한 자식 리렌더링 막기
   
    // 자식에서 state사용하여 부모로부터 받은 props 바꾸기(ver. Class Component🟢🤣)
    // constructor(props) {
    //     super(props);

    //     constructor 안 써도 되는데, ref나 setState안에 함수 사용하면 미세한 control이 가능
    //     즉, 함수기 떄문에 함수 안에 다른 동작이 가능하다. 아래와 같은 미세한 동작이 가능
    //     함수안에 함수 사용은 정밀한 동작 또는 기본 객체로는 안되는 동작이 있을 때 -> constructor, ref, setState 함수 안에 함수 사용🟢🟢
    //     const filtered = this.props.filter(() => {
    //     });

    //     this.state = {
    //         result: filtered, // 부모의 props를 state로 만들기
    //         try: this.props.try,
    //     }
    // } 



    render() {
        const { tryInfo} = this.props; // 구조분해, props를 보는 순간 내 부모 컴포넌트가 누군지 생각해야 한다. 근데 그 부모가 또 할머니한테 props를 물려받았을 수 도 있다. 그래서 웬만하면 redux 사용을 추천.🟢 아니면 최소 Context Api라도 사용해야 깔끔한 코드가 된다.
        return (
        <li>  
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
            {/* <b>{this.props.e.fruit}</b> 
            {this.props.e.taste + this.props.i}
            <div>컨텐츠1</div>
            <div>컨텐츠2</div>
            <div>컨텐츠3</div> */}
        </li>
        );
    }
}

export default Try; // 다른 파일에서 불러오기 위함