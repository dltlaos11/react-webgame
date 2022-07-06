const React = require('react');
const ReactDOM = require('react-dom'); // react, react-dom을 불러오기

const WordRelay = require('./WordRelay'); // WordRelay 클래스를  불러온다. module.exports로 외부에서 추가되면

{/* <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> */}
// 예전 class 강좌에서는 script로 불러왔는데 node에 module.system이라고 있는데 위와 같이 npm에 설치했던 것들을 불러올 수 있다.

ReactDOM.createRoot(document.querySelector('#root')).render(<WordRelay />);
// js확장자와 jsx확장자에 의미적 차이가 존재. 안에 jsx라는 문법을 쓰면 jsx로 파일 확장자를 하는 것이 좋다.
// 왜냐면 jsx문법을 담고있으므로 react전용 파일이겠구나를 깨달을 수 있다.