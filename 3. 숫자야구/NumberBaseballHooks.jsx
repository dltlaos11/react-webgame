import React, {useState, useRef} from 'react';
import Try from './TryHooks';

const getNumbers= () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i of candidate){
        const chosen = candidate.splice(Math.floor(Math.random() *(9-i), 1))[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers); // lazy init, 늦은 초기화: 함수가 호출되서 리턴값을 돌려줄 떄까지 react가 기다려준다고 해서 lazy init기법 
    // const [answer, setAnswer] = useState(getNumbers()); // 상관은 없지만..!
    // NumberBaseball은 함수 컴포넌트,함수 컴포넌트 특성상 매번 리렌더링 될 때마다 함수 컴포넌트 전체 부분🟢이 실행된다.   useMemo, useCallback사용하면 되지만 useEffect를 먼저 배우고 해야..!
    // getNumbers()는 매번 적용되는게 아니라 처음 한번만 적용되는거라 상관은 없다, 리렌더링 될 떄마다 쓸데없이 매번 실행되는게(호출되는게) 문제다.
    // 그럴경우 useState() 자리에 함수를 넣어주면 된다.
    // useState 용법 중 값이 아닌 함수가🟢 넘어가면 함수의 리턴값이 answer로 들어가고 그 다음부터는 getNumbers가 실행되지 않는다. 
    const [tries, setTries] = useState([]);  
    const inputRef = useRef(null);

const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')){
        setResult('홈런!');
        // array.push(1)
        // const array2 = [...array, 2] push하는게 아니라 옛날 것 복사해놓고 새로운 것 넣어줘야 한다.
        // console.log(array2) [1,2]        => 옛날 값(array)으로 현재 것을 만들기 때문에🟢
        setTries((prevTries) => { // 옛날 Try로 새 Try 만드는 경우 함수형🟢
            return [...prevTries, {try: value, result: '홈런!'}]
        });
        alert('게임을 다시 시작합니다');
        setValue('');
        setAnswer(getNumbers());
        // setAnswer(getNumbers);  여기서는 이렇게 하면 안된다, getNumbers() 호출해서 return한 array를 setAnswer로 받아야 한다.
        // 근데 사실 되긴 한다 !!..ㅋㅋ
        // setAnswer((prevAnswer)=>{return newAnswer}) 함수형 setState를 쓸수 있었잖아요? 이 함수 자리에 getNumbers를 넣는 꼴이 된다.
        // setAnswer(() => {
        //     const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //     const array = [];
        //     for (let i of candidate){
        //         const chosen = candidate.splice(Math.floor(Math.random() *(9-i), 1))[0];
        //         array.push(chosen);
        //     }
        //     return array;
        // }); getNumbers를 넣은게 운이 좋게도 동작을 한다.. 하지만 이러면 안된다.
        setTries([]);
        inputRef.current.focus();
    } else { // 답 틀렸으면
        const answerArray = value.split('').map((v)=>parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) { // 10번 이상 틀렸을 떄
            setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
            alert('게임을 다시 시작하시겠습니까?');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputRef.current.focus();
        } else {
            for (let i = 0; i < 4; i+=1){
                if (answerArray[i] === answer[i]){
                    strike += 1;
                } else if (answer.includes(answerArray[i])){
                    ball += 1;
                }
            }
            setTries((prevTries)=> [...prevTries, {try: value, result: `${strike} 스트라이크 ${ball} 볼입니다`}]);
            setValue('');
            inputRef.current.focus();
        }
    }
}; // 화살표 함수를 안쓰면 constructor를 다시 써야하는데 code 이해가 어려우므로.. arrow function사용

const onChangeInput = (e) => { 
    setValue(e.target.value);
};

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} /> {/* ref={this.onInputRef} */}
                {/* html에서는 maxlength이지만 react에서는 모든 2번째 단어가 대문자, value, onChange는 SET다🟢  만약 value, onChange 같이 안할꺼면 defaultValue={this.state.value}*/}
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {/* {
                (()=>{ // {} 사용하면 js문법 사용가능하고 함수 안에서 if문, for문이 가능"🔘🔘
                    const array = [];
                    for (let i =0; i <tries.length; i++){
                        array.push(<Try key={`${i+1}차 시도: `} tryInfo={e} /> );
                    }
                    return array;
                })()
                // 하지만 자식 컴포넌트로 뺴던가 함수로 만드는 것이 가장 좋다. 
                } */}
                {tries.map((e, i)=>  // {try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼입니다`}: e, e.try&e.result
                        {return (
                            <Try key={`${i+1}차 시도: `} tryInfo={e} /> 
                            // memo🟢로 억울한 리랜더링 막기🟢 PureComponent🟢
                            // RenderTest.jsx처럼 Devtool로 자식 컴포넌트의 리렌더링을 확인 할 수 있다.
                            // 컴포넌트는 state, props가 바뀌면 리랜더링 된다. 또 하나의 경우가 더 있는데
                            // 부모-자식 컴포넌트 사이에, 부모 컴포넌트가 렌더링 되먄 자식 컴포넌트도 무조건 리렌더링 된다.
                            // 그것을 방지하기 위해선 PureComponent를 사용해야 한다. 클래스에서는 PureComponent를 사용하면 되지만 함수 컴포넌트에는 PureComponent가 없다. 
                            // PureComponent는 state가 달라졌을 때만 리렌더링 기능외에도 props가 달라져도 리렌더링 되는 기능이 있다. 
                            // 그럴 때 사용하는 것이 'react'에 있는 'memo'🟢컴포넌트다. memo는 PureComponent의 역할을 하며 부모가 리렌더링 되도 자식의 리렌더링을 막는다.🟢
                            // 함수 컴포넌트에서 함수 부분을 memo()로 감싸면된다. 

                            // 결론: 성능 문제가 없다면 굳이 안써도 된다. 하지만 성능 문제가 생긴다면 "PureComponent와 memo 적용하기"🟢🟢
                        );
                    })}

            </ul>
        </>
    );
}

export default NumberBaseball; 