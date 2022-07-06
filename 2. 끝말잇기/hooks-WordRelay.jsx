const React = require('react'); 
const {useState, useRef} = React;
// 쪼갠 파일에서 필요로 하는 패키지나 라이브러리 가지고 오는 부분

const WordRelay = () => {
    const [word, setWord] = useState('주용준1');
    // const [value, setValue] = useState('');  언컨트롤드 인풋
    const [result, setResult] = useState('');
    const inputRef = useRef(null); 


    const onSubmitForm = (e) => {
        e.preventDefault();
        console.dir(e.target[0]); // 객체로 보고싶은 경우 console.dir() 사용, form태그 안에 순서대로 input이 들어있다 하면 각각에 0부터 시작하는 인덱스가 붙음
        console.log(e.target.children.word.value);
        if (word[word.length - 1] === e.target.children.word.value[0]) {
            setResult('딩동댕'); 
            setWord(e.target.children.word.value);
            e.target.children.word.value = ''; // html, value를 onSubmit안에서만 쓰는 경우 html로 대체 가능
            // setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            e.target.children.word.value = '';
            // setValue('');
            inputRef.current.focus();
        }
    }; 
     
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // input;

    // onRefInput = (c) => {
    //     this.input = c;
    // };

    return (
        <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
        {/* <input ref={inputRef} value={value} onChange={onChangeInput} /> 컨트롤드 인풋, 아래는 언컨트롤드 인풋*/}
        <input id="word" ref={inputRef} defaultValue="주용준"/>
        {/* input에는 컨트롤드 인풋과 언컨트롤드 인풋이 존재(제어 컴포넌트 vs 비제어 컴포넌트)🟢
         컨트롤드 인풋: input태그에 value와 onChange 그리고 value에는 state(useState)가 들어있고 onChange에서 setState로 value를 바꿔주는 것
         언컨트롤드 인풋: value와 onChange가 없는 것 input의 원시적인 형태와 유사, 기본적으로 react에서는 컨트롤드 인풋 권장
         하지만 간단한 형태의 경우 언컨트롤드 인풋으로도 충분히 가능, 
         언컨트롤드 인풋이 가능한 경우: onSubmit에서만 특정 동작을 하는 경우, 해당되는 함수안에서만 value가 사용되는 경우, 함수 밖에서 사용되면 ❌, 초깃값 지정(defaultValue)
         언컨트롤드 인풋에 value 넣는 순간 컨트롤드 인풋으로 간주
         컨트롤드 인풋이 가능한 경우: 비번이 최소 8자 이상인데 4자를 적는경우 밑에 빨간줄이 뜬다 -> dynamic input, 
         비번이 최소 8자 이상인데 4자를 적는경우 submit button이 안눌리도록 -> conditionally disabling submit button, 등 
         */}
            <button>신기하다 정말 ~ ^^</button>
            <h1>핫로더 최고해 ~ </h1>
        </form>
        <div>{result}</div>
        </>
    );
    }
module.exports = WordRelay; // 파일을 쪼개는 경우🟢
// 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것.
// 이게 노드의 모듈 시스템 
// module.exports를 추가하면 외부에서 불러올 수 있다.

// 이후 npm run dev 웹팩으로 빌드
// 근데 항상 오류날 떄마다 수동으로 빌드해주면 너무 귀찮은 일😅, 자동으로 매번 빌드된도록 해줘야 한다.
// 웹팩 데브 서버와 핫 리로딩🟢
// npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D 
// npm i -D webpack-dev-server 개발용 서버 설치

// 원래 react-hot-loader로 refresh했었는데 react-refresh로 바뀌었다.🟢
// "scripts": {
//     "dev": "webpack-dev-server --hot"
//   }, webpack-dev-server가 달라진 것이 아니라, webpack-cli가 4버전이 되면서
// "scripts": {
//     "dev": "webpack serve --env development"🟢
//   }, 이렇게도 webpack-dev-server를 실행할 수 있게 바뀜  