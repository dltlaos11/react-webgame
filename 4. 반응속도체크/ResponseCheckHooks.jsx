import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result ,setResult] = useState([]);

    // class ResponseCheck extends Component {
    //     timeout;
    //     endTime;
    //     startTime;
    // } 클래스에서 this 객체 속성들 사용할떄🟢
    // Hooks로 표현할 떄는 "ref" 사용, ref를 DOM(document object model)에 직접 접근할 때만 사용했었는데
    // Hooks에서는 this의 속성들을 ref로 표현한다. ref가 추가적인 기능을 한 가지 더 가지는 것🟢  
    // 단, useRef기 떄문에 timeout이 아니라 timeout.current에 넣어줘야 한다. useRef는 안에 current가 존재  
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    // useState와 useRef의 차이점🟢
    // state는 바뀌면 return 부분이 랜더링 다시 되는데, 값이 바껴도 렌더링을 시키지 않고 싶은 값은 ref에 넣어서 사용하면 된다.
    // useRef가 DOM말고 다른 방식으로 사용되는게 값이 바뀌기는 하지만 그게 화면에는 영향을 미치고 싶지 않을 떄 그럴 떄 ref를 사용
    // timeout이나 interval은 보통 ref에 넣어서 사용, 화면이 바뀌질 원하지 않고 값이 자주 바뀌는 것들을 ref에 사용🟢🟢ㄴ

    const onClickScreen = () => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() =>{ // ref에 대입한는 것은 랜더링이 안됨, 변하는 값을 잠시 기록🟢 
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
            setState('ready'); // setState가 되는 순간 다시 랜더링🟢
            setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date(); // 끝나는 시간을 ref에 기록, 화면 바뀌지 ❌
            setState('waiting'); // 랜더링, 화면 변 화
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]; 
            });
        }
    };

    const onReset = () => {
        setResult([]); 
    };

    const renderAverage = () => { // result가 하나 들어가는 순간 자동으로 평균시간 컴포넌트 만들어준다.🟢
        return result.length === 0
        ? null 
        : <>
            <div>평균 시간: {result.reduce((a, c) => a+c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
         </>
    };

    // jsx에서는 배열안에 jsx를 담아서 return하는 경우도 있다. 🟢
    // 단, 배열을 사용할 떄는 key를 사용해야 한다.
    // 함수 안에 for문 강제로 담을 떄 위주로 사용
    // return [  
    //     <div key ="사과">사과</div>
    //     <div key ="배">배</div>
    //     <div key ="감">감</div>
    //     <div key ="귤">귤</div>
    // ]

    return (
        <>
        <div
            id="screen"
            className={state} // css className
            onClick={onClickScreen}
        >
            {message}
        </div>
        
        {/* { // renderAverage 즉시실행함수(IFFE)로 만들어보기_if문 사용🟢
        (() => { // "{} 사용하면 js문법 사용가능하고 함수 안에서 if문, for문이 가능"🔘🔘
            if (result.length === 0) {
                return null
            }
            else {
                return <>
                <div>평균 시간: {result.reduce((a, c) => a+c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
             </>
            }
        })()} */}

        {// 조건문🟢  
         // 삼항연산자🔵
            // this.state.result.length === 0
            //  ? null // jsx에서 false, undefined, null은 태그없음을 의미
            //  : <div>평균 시간: {this.state.result.reduce((a, c) => a+c) / this.state.result.length}ms</div>
            // reduce 함수에서 a: 누산기. 콜백함수의 반환값을 누적, c: 처리할 현재 요소🟢
            // 합계 구해서 전체 길이로 나누면 평균, result가 빈 배열인데 빈 배열일 때는 합계 구하는 걸 못쓴다. result가 없을 떄는 조건문으로 위의 div태그를 없애기

          // 보호연산자 &&🔵
          //   this.state.result.length !== 0
          //   && <div>평균 시간: {this.state.result.reduce((a, c) => a+c) / this.state.result.length}ms</div>

          // 함수로 표현🔵 코드 지져분할때 함수로 랜더링하는 부분 뺴는 것
          renderAverage() 
          // reset 버튼을 누를 떄 result가 달라지면 state, message가 바뀌는 쓸데없는 리렌더링이 일어나므로 이함수 부분을 컴포넌트로 바꾼다🟢
          //  result가 바뀌는거랑 state, message 상관❌ 다른 컴포넌트는 분리 
          // 성능체크 -> React dev tools에서 컴포넌트 살펴보면서 하이라이트 잘 보기🟢   
        }
        </>
    );
}; 

export default ResponseCheck;