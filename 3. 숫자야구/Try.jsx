import React, { Component } from 'react';

class Try extends Component {
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