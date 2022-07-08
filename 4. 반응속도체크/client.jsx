// const React = require('react'); import vs require🟢, import는 react에 딱히 필요는 없지만 많은 소스코드에서 require 대신 import를 사용 ! require는 node의 module.system이다.
// const ReactDOM = require('react-dom'); react랑 react-dom 패키지를 npm에서 설치를 한건데 남이 많든 스크립트다. 남이 만든 스크립트도 require해서 가져올 수 있다 ! 

// require랑 import랑 호환이 되긴 하다 ! 아래처럼 !

import React from 'react'; 
import ReactDOM from 'react-dom'; 

import ResponseCheck from './ResponseCheckClass'; // export default ResponseCheck 때문에 import 사용

ReactDOM.createRoot(document.querySelector('#root')).render(<ResponseCheck />);