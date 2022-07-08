import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜점하게 뽑는 함수 
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i =0; i< 4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 -i)),1)[0]; // 0~8 정수값을 splice해서 1개 짜른 값 [1], [2] ... 인데 배열 값에 "[2][0] => 2"🟢 9-i: 하나씩 뽑으니까
        array.push(chosen);
    }
    return array;
};  // this 안쓰는 경우 바깥에다 뺀다.  
         
class NumberBaseball extends Component {
    state = {
        result: '', 
        value: '',
        answer: getNumbers(), // 맞출 숫자 4개를 뽑는 함수 
        tries: [], // 몇 번 시도했는지, push 사용 안된다(불변성)🟢
        // array.push(1)
        // const array2 = [...array, 2] push하는게 아니라 옛날 것 복사해놓고 새로운 것 넣어줘야 한다.
        // console.log(array2) [1,2]           

    }; // constructor 안써도 무방

    // // 화살표 함수 안쓰는 경우
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         result: '',
    //         value: '',
    //         answer: getNumbers(), 
    //         tries: [], 
    //     }; 
    //     this.onSubmitForm = this.onSubmitForm.bind(this); // arrow function은 bind(this)를 자동으로 해주는 것이다🟢
    //     this.onChangeInput = this.onChangeInput.bind(this); 
    // }
    // onChangeInput(e) {
    //     this.setState({
    //         value:e.target.value,
    //     })
    // }

    onSubmitForm = (e) => {
        const { answer ,value, tries} = this.state; // 구조 분해로 this.state 생략가능, hooks와 비슷해진다. 
        e.preventDefault();
        if (value === answer.join('')){
            this.setState(
                (prevState) => {
                // 옛날 값으로 현재 값을 할 때는 함수형 Setstate 사용🟢 
                // Setstate 사용 방법1, 함수로 사용하면 예전 state를 사용할 수 있을 뿐더러 더 미세한 작업이 가능. "Setstate함수 안에 다른 함수를 넣는 경우". 자유도 업🟢
              return { result: '홈런!',
                tries: [...prevState.tries, {try: value, result: '홈런!'}], // push 안쓰고 새로운 배열 만들어서 react가 뭐가 바꼈는지 알 수 있도록 
            }
            }// 일급객체 혹은 일급함수🟢
            );
            alert('게임을 다시 시작합니다');
            this.setState({
                // Setstate 사용 방법2🟢
                value: '',
                answer: getNumbers(),
                tries: [],
            })
            // this.inputRef.focus();
            this.inputRef.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 떄
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작하시겠습니까?');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                // this.inputRef.focus();
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i+=1){
                    if (answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크 ${ball} 볼입니다`}], value: '',}; // 옛날 state로 현재 state를 만들 때는 함수형 state
                });
                // this.inputRef.focus();
                this.inputRef.current.focus();
            }
        }
    }; // 화살표 함수를 안쓰면 constructor를 다시 써야하는데 code 이해가 어려우므로.. arrow function사용

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        })
    };

    // fruits = [
    //     {fruit: '감', taste: '맛있다'},
    //     {fruit: '뀰', taste: '시다'},
    //     {fruit: '밤', taste: '달다'},
    //     {fruit: '배', taste: '맛없다.'},
    // ];

    inputRef = createRef(); // createRef 적용, 클래스에서도 current로 통일해 사용하기 위해🟢 this.inputRef = createRef

    // inputRef;

    // onInputRef = (c)=> {
        // console.log();
        // 다른동작 가능, current 안쓰는 대신 자유도가 높다
        // this.inputRef =c;
    // };  
    // 클래스에서는 이런식으로 ref를 만들어서 쓰고 hooks에서는 inputEl.current.focus();처럼 current가 하나 더 들어감. 헷갈릴 수 있다.🟢
    // 클래스에서 ref를 hooks랑 비슷하게 만드는 방법이 있다. 첫 줄로 올라가서 React.createRef 추가

    render() { // render는 화살표 함수 안써도 된다. extends Component 부분에서 처리해준다.
        const { result, value, tries} = this.state; // 구조 분해로 this.state 생략가능 
        // this.setState({
        // }); render() 안에서 this.setState 사용하면 무한반복되서 ❌, this.setState하면 render가 실행되고 render가 실행되면 this.setState가 실행되고 무한반복🥶 문제가 생김.
        // render() 안에 setState 사용 금지🟢 
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref = {this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} /> {/* ref={this.onInputRef} */}
                    {/* html에서는 maxlength이지만 react에서는 모든 2번째 단어가 대문자, value, onChange는 SET다🟢 만약 value, onChange 같이 안할꺼면 defaultValue={this.state.value}*/}
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                {/* {this.fruits.map((e, i)=>  // react가 반복문을 알아서 해주니 state만 바꾸면 된다🟢
                            {return (
                                <Try key={e.fruit+e.taste} e={e} i={i}/> // html은 attribute, react는 props🟢, <li>에서 key attribute와 전달되는 props들을 전해줘야 한다.
                            // <li key={e.fruit+e.taste}>
                            //     <b>{e.fruit}</b> 
                            //     {e.taste + i}
                            //     <div>컨텐츠1</div>
                            //     <div>컨텐츠2</div>
                            //     <div>컨텐츠3</div>
                            // </li>                  
                            // props🟢
                            // 반복문 외부 파일로 대체하기🟢 재사용성, 성능상, 가독성 이서 이득 ! 반복문에서 성능문제 많이 발생한다
                            // 반복문 단위로 분리를 많이 한다.
                            // 아직 숙련도가 낮으니까 반복문을 먼저 만들고 컴포넌트 분리하는 방식으로 진행 ! Top-down방식, 숙련도가 높으면 donw-Top방식(컴포넌트를 우선 만들고 끼워넣는)을 사용한다 한다. 
                            // props가 생기면서 부모-자식 관계가 만들어짐. NumberBaseball가 Try의 부모가 된다. React에서는 부모 컴포넌트가 자식 컴포너트한테 props 물려준다. 
                            // React의 대부분의 문제는 props에서 발생한다. 부모-자식 관계만 있는게 아니라 자식이 또 자식을 가지면 할아버지가 자식에게 props를 물려주고 싶은 경우 문제가 된다. 고조할아버지가 자식에게 props를 물려주는 경우도 있다면..🟢 문제가 될 것
                            // 이럴 떄 쓰이는 것이 Redux, Context, Mobx 등이다. React에는 Context가 있고 Context를 좀 더 복잡한 일을 할 수 있게 만든 것이 Redux다. React redux도 내부적으로는 Context 사용
                            );
                        })} */}
                {tries.map((e, i)=>  // {try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼입니다`}: e, e.try&e.result
                            {return (
                                <Try key={`${i+1}차 시도: `} tryInfo={e} /> 
                            );
                        })}

                    {/* {
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
                       [1,2,3] -> [2,4,6]
                       [1,2,3].map((v)=>v*2)
                    } */}
                </ul>
            </>
        );
     }  // Component 안 일 떄는 render, state 변경시 render 내부가 재실행 된다.
}

export default NumberBaseball; // import NumberBaseball;