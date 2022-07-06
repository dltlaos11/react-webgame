const React = require('react'); // node 모듈 문법🟢
const { Component } = React; // node 모듈 문법🟢
// 위를 import로 바꿔보자 !
import React, { Component} from 'react'; // 'react'에서 가져오는 것을 합쳐줄 수 있다. ES2015 모듈 문법🔵


class NumberBaseball extends Component { // ES2015 모듈 문법🔵

}


// { Component } 중괄호로 되어있는 것들은 default로 export한게 아니다.
export const hello = 'hello'; // 변수나 값 같은 것들은 export 따로 할 수 있다. 🟢default로 export 안 한 것들은 => import { hello } from '폴더'; 이런 식으로 가져오는 것이다. // ES2015 모듈 문법🔵
export const bye = 'hello'; // import { hello, bye } from '폴더'; export default는 한 번만 쓸 수 있고 export const는 여러번 가능하다. // ES2015 모듈 문법🔵

module.exports = NumberBaseball; // node 모듈 문법🟢
// 위를 아래처럼 ! module.exports는 export default NumberBaseball;
export default NumberBaseball; // ES2015문법인데, node의 모듈이랑 ES2015 모듈이랑 둘이 다른데 일부분은 호환이 되기 떄문에 같이 써줄 수 있다. 🟢default로 export 한 것들은 가져올 떄 => import NumberBaseball from 폴더; 이런 식으로 가져오고 // ES2015 모듈 문법🔵
// exports되는 게 객체나 배열이면 구조 분해할 수 있다🟢 

// 그렇다면 import React, { Component} from 'react'; => React는 export default(=module.exports, 엄밀히 따지면 둘이 다른데 react하는 정도면 호환된다. 깊게 들어가면 달라서 애먹을 수도..😅  ) 되어 있을 거고, {Component}는 export const로 되어있을 것이다.

// ES2015 모듈 문법🔵
// export const hello = 'hello';
// export const bye = 'hello'; 

// export default NumberBaseball; 

// ES2015 모듈 문법🔵과 node 모듈 문법🟢 둘 다 사용된다. 근데 기본적으로 node로 webpack을 돌려서 node에서는 node 모듈 문법🟢만을 지원한다. 그래서 지난 webpack.config.js 파일들에서 const ~ 로 시작한다.
// 여기서 드는 의문점이 다른 파일에서(.jsx)는 import를 쓰고 있는데 그 이유는 webpack에 있는 babel이 import도 require로 바꿔준다. 그래서 import를 사용할 수 있는 것이다🟢
// 결론적으로 쉽게 생각하면 node에서는 'require' react에서는 import랑 export 쓴다. 결국엔 require로 돌아가는 것이다🟢🟢 export default(=module.exports 호환이 된다.. 정도 알아두기 !!)

// node 모듈 문법🟢 === CommonJS
// const React = require('react');
// exports.hello = 'hello'; 
// module.exports = NumberBaseball; 

// 노드 모듈 시스템에서
// module.exports = { hello: 'a'};
// exports.hello = 'a';는 같다.