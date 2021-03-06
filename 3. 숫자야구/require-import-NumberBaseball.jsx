const React = require('react'); // node ๋ชจ๋ ๋ฌธ๋ฒ๐ข
const { Component } = React; // node ๋ชจ๋ ๋ฌธ๋ฒ๐ข
// ์๋ฅผ import๋ก ๋ฐ๊ฟ๋ณด์ !
import React, { Component} from 'react'; // 'react'์์ ๊ฐ์ ธ์ค๋ ๊ฒ์ ํฉ์ณ์ค ์ ์๋ค. ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต


class NumberBaseball extends Component { // ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต

}


// { Component } ์ค๊ดํธ๋ก ๋์ด์๋ ๊ฒ๋ค์ default๋ก exportํ๊ฒ ์๋๋ค.
export const hello = 'hello'; // ๋ณ์๋ ๊ฐ ๊ฐ์ ๊ฒ๋ค์ export ๋ฐ๋ก ํ  ์ ์๋ค. ๐ขdefault๋ก export ์ ํ ๊ฒ๋ค์ => import { hello } from 'ํด๋'; ์ด๋ฐ ์์ผ๋ก ๊ฐ์ ธ์ค๋ ๊ฒ์ด๋ค. // ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต
export const bye = 'hello'; // import { hello, bye } from 'ํด๋'; export default๋ ํ ๋ฒ๋ง ์ธ ์ ์๊ณ  export const๋ ์ฌ๋ฌ๋ฒ ๊ฐ๋ฅํ๋ค. // ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต

module.exports = NumberBaseball; // node ๋ชจ๋ ๋ฌธ๋ฒ๐ข
// ์๋ฅผ ์๋์ฒ๋ผ ! module.exports๋ export default NumberBaseball;
export default NumberBaseball; // ES2015๋ฌธ๋ฒ์ธ๋ฐ, node์ ๋ชจ๋์ด๋ ES2015 ๋ชจ๋์ด๋ ๋์ด ๋ค๋ฅธ๋ฐ ์ผ๋ถ๋ถ์ ํธํ์ด ๋๊ธฐ ๋๋ฌธ์ ๊ฐ์ด ์จ์ค ์ ์๋ค. ๐ขdefault๋ก export ํ ๊ฒ๋ค์ ๊ฐ์ ธ์ฌ ๋ => import NumberBaseball from ํด๋; ์ด๋ฐ ์์ผ๋ก ๊ฐ์ ธ์ค๊ณ  // ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต
// exports๋๋ ๊ฒ ๊ฐ์ฒด๋ ๋ฐฐ์ด์ด๋ฉด ๊ตฌ์กฐ ๋ถํดํ  ์ ์๋ค๐ข 

// ๊ทธ๋ ๋ค๋ฉด import React, { Component} from 'react'; => React๋ export default(=module.exports, ์๋ฐํ ๋ฐ์ง๋ฉด ๋์ด ๋ค๋ฅธ๋ฐ reactํ๋ ์ ๋๋ฉด ํธํ๋๋ค. ๊น๊ฒ ๋ค์ด๊ฐ๋ฉด ๋ฌ๋ผ์ ์ ๋จน์ ์๋..๐  ) ๋์ด ์์ ๊ฑฐ๊ณ , {Component}๋ export const๋ก ๋์ด์์ ๊ฒ์ด๋ค.

// ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต
// export const hello = 'hello';
// export const bye = 'hello'; 

// export default NumberBaseball; 

// ES2015 ๋ชจ๋ ๋ฌธ๋ฒ๐ต๊ณผ node ๋ชจ๋ ๋ฌธ๋ฒ๐ข ๋ ๋ค ์ฌ์ฉ๋๋ค. ๊ทผ๋ฐ ๊ธฐ๋ณธ์ ์ผ๋ก node๋ก webpack์ ๋๋ ค์ node์์๋ node ๋ชจ๋ ๋ฌธ๋ฒ๐ข๋ง์ ์ง์ํ๋ค. ๊ทธ๋์ ์ง๋ webpack.config.js ํ์ผ๋ค์์ const ~ ๋ก ์์ํ๋ค.
// ์ฌ๊ธฐ์ ๋๋ ์๋ฌธ์ ์ด ๋ค๋ฅธ ํ์ผ์์(.jsx)๋ import๋ฅผ ์ฐ๊ณ  ์๋๋ฐ ๊ทธ ์ด์ ๋ webpack์ ์๋ babel์ด import๋ require๋ก ๋ฐ๊ฟ์ค๋ค. ๊ทธ๋์ import๋ฅผ ์ฌ์ฉํ  ์ ์๋ ๊ฒ์ด๋ค๐ข
// ๊ฒฐ๋ก ์ ์ผ๋ก ์ฝ๊ฒ ์๊ฐํ๋ฉด node์์๋ 'require' react์์๋ import๋ export ์ด๋ค. ๊ฒฐ๊ตญ์ require๋ก ๋์๊ฐ๋ ๊ฒ์ด๋ค๐ข๐ข export default(=module.exports ํธํ์ด ๋๋ค.. ์ ๋ ์์๋๊ธฐ !!)

// node ๋ชจ๋ ๋ฌธ๋ฒ๐ข === CommonJS
// const React = require('react');
// exports.hello = 'hello'; 
// module.exports = NumberBaseball; 

// ๋ธ๋ ๋ชจ๋ ์์คํ์์
// module.exports = { hello: 'a'};
// exports.hello = 'a';๋ ๊ฐ๋ค.