const React = require('react'); // <script>로 안하고 node의 모듈 시스템으로 require 
const { useState, useRef} = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); 
    // class에서는 this.input으로 DOM에 접근 
    // 함수에서는 useRef로 DOM에 접근 대신 current를 추가하여 접근

    const onChangeInput =(e) => {
        setValue(e.target.vale);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){
            // setResult((prevResult) => { return '정답: '+ value}); 옛날 Result를 쓰는 경우 이렇게 사용 가능
            setResult('정답: '+ value);
            setFirst(Math.ceil(Math.random() * 9));
            // setCounter((c) => c+1); 옛날 값에 1을 더하는 경우 이렇게 해줘야 state 비동기 문제가 발생 안한다.
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            // 위에서 setState 4번 연달아 일어나는 거 아니냐 ??
            // 이것을 react가 알아서 처리해준다. 그래서 위의 state변경 코드들은 비동기 코드이다. setState를 모아서 한번에 처리
            inputRef.current.focus(); // 함수 컴포너트에서는 input이 아닌 current.focus(); 사용
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus(); 
        }
    }

    console.log('렌더링'); // state가 바뀌면 "함수 자체"가 통째로 다시 실행된다, class에서는 render 부분만 재실행
    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="number" value={value} onChange={onChangeInput} />
                <button>입력 !</button>    
            </form>      
            <div  id="result">{result}</div>
        </>
    );
    }

module.exports = GuGuDan; // 파일을 쪼갰으면(외부 파일에서 쓰이고 있다면 Ex_require) module.exports해주어야 외부에서 사용가능