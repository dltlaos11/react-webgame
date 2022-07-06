import React, { Component } from 'react';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜점하게 뽑는 함수 

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // 맞출 숫자 4개를 뽑는 함수 
        tries: [], // 몇 번 시도했는지
    }; // constructor 안써도 무방

    onSubmitForm = () => {

    }; // 화살표 함수를 안쓰면 constructor를 다시 써야하는데 code 이해가 어려우므로.. arrow function사용

    onChangeInput = () => {

    };

    render() { 
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    {/* html에서는 maxlength이지만 react에서는 모든 2번째 단어가 대문자, value, onChange는 SET다🟢 만약 value, onChange 같이 안할꺼면 defaultValue={this.state.value}*/}
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {
                    ['사과','바나나','포도','귤','감',].map((e)=>{
                        return (
                            <li>{e}</li>
                        );
                    }) // React 반복문 (map)🟢, 반복되는 것을 배열로 만들기
                    }
                </ul>
            </>
        );
     }  // Component 안 일 떄는 render, state 변경시 render 내부가 재실행 된다.
}

export default NumberBaseball; // import NumberBaseball;