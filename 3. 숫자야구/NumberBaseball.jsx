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
                    [['사과', '맛없네 !!'],['바나나', '그래?!'],['포도', '그래 !'],['귤', 'ㅜㅜ'],['감', '에휴'],].map((e)=>{
                        return (
                            <li key={e[0]}><b>{e[0]}</b> {e[1]}</li>
                        );
                    }) // React 반복문 (map)🟢, 반복되는 것을 배열로 만들기
                    }
                    {
                    [
                        {fruit: '감', taste: '맛있다'},
                        {fruit: '뀰', taste: '시다'},
                        {fruit: '밤', taste: '달다'},
                        {fruit: '배', taste: '맛없다.'},
                        {fruit: '감', taste: '엥!'},
                    ].map((e, i)=>
                         (
                            <li key={e.fruit+e.taste}><b>{e.fruit}</b> {e.taste + i}</li>
                        ) // 중괄호랑 return 지움
                    ) // React 반복문 (map)🟢, 단, map을 사용해 반복문을 만들 시, key🟢를 사용해야 한다. "key는 고유한 값" 
                       // 리액트가 key를 보고 같은 컴포넌트인지 아닌지 판단🟢  
                       // 하지만 위 같은 경우 e.fruit으로 key를 설정하면 고유하지 않은 값이다. 그럴 경우엔 고유한 값으로 만들어줘야 함. => "e.fruit+e.taste"가 key가 되면 된다.
                       // map의 콜백함수 2번째 인자값은 인덱스: i인데, key에 고유한 값으로 대입하면 안된다. 성능 최적화에 문제가 생길 수 있다. 진짜 넣어도 e.fruit+i 이렇게 넣자. 근데 그냥 key에는 Index값 사용하지 말기🟢
                       // react에서 성능최적화 할때 key를 보고 판단해서 i를 하면 뭐가 바뀌었는지 알아차리기가 어렵다.. 단지 리스트면 i를 넣어도 됨.. 
                    }
                </ul>
            </>
        );
     }  // Component 안 일 떄는 render, state 변경시 render 내부가 재실행 된다.
}

export default NumberBaseball; // import NumberBaseball;