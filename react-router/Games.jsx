import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import NumberBaseball from '../3. 숫자야구/NumberBaseball'
import RSP from '../5. 가위바위보/RSPClass'
import Lotto from '../6. 로또/Lotto'

const Games = () => {

    return (
        <BrowserRouter>
        {/* 🔵공통적인 Layout🔵 */}
            <div>
                공통인 부분
                <Link to="/number-baseball">숫자야구</Link>
                {/* 브라우저 상에는 <a>태그로 나타나는데 실제로는 Link다, Link태그 사용해야 <Route>태그랑 매칭이 된다. 
                    주소가 바뀌면서 마치 페이지가 여러개인 것 처럼 느껴지는데, 실제로는 페이지가 하나다. <Route>로 등록해놓은 컴포넌트가 화면에 렌더링되는거지
                    페이지가 여러개 있는 것이 아니다. 그것을 증명할 수 있는 게 http://localhost:8080/lotto-generator에서 새로고침을 했을 떄 
                    Cannot GET /lotto-generator라는 에러가 뜬다.🥶🥶 이게 바로 실제로는 페이지가 여러개 있지 않다는 증거이다. 왜냐면 
                    새로고침을 하거나 주소창에 /lotto-generator 입력하는 것은 서버쪽에 요청을 보내는 것이다. 서버는 /lotto-generator이런 것이 있는줄 모른다.
                    아래 적힌 3개의 가상의 주소는 클라이언트이면서 프론트엔드인 react-router만 알고있는 애들이다. 그러니까 브라우저에서만 이주소들이 유효하고🟢🟢
                    새로고침 하는 행위나 주소를 입력하는 행위는 서버쪽에 요청전달이 되서 서버는 나몰라라 한다. 
                    실제로 페이지가 여러개 있는게 아니라 프론트엔드의 react-router가 여러개 있는 척하는거다. 그래서 서버쪽에 해당주소로 요청해보면 나몰라라한다.  
                */}
                &nbsp;
                <Link to="/rock-scissors-paper">가위바위보</Link>
                &nbsp;
                <Link to="/lotto-generator">로또생성기</Link>
            </div>
            {/* 🟣바뀌는 화면들이 나오는 부분🟣 */}
            <div>
            <Route path="/number-baseball" component={NumberBaseball} />
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/>
            </div>
        </BrowserRouter>
        // react-router을 사용하고 싶으면 컴포넌트의 최상위를 BrowserRouter로 감싸줘야 한다. 아니면 client에서 Games 컴포넌트를 감싸줘도 된다.🟢
        // react-router가 여러개의 페이지를 동시에 렌더링해주기 떄문에 number-baseball, rock-scissors-paper, lotto-generator라는 가상의 페이지 주소를 만들어서
        // 거기에 각각 컴포넌트를 연결해준 것이다. 하나의 페이지에서 html따로따로 만들었던 것들을 동시에 사용 가능 
    );
};

export default Games;

// npm i react-router: 뼈대
// npm i react-router-dom: 웹에서 사용하는 라이브러리, 이거까지 깔아야 웹에서 사용가능
// react-router-dom이 react-router를 내부적으로 사용, 우리는 react-router-dom을 사용

// react-router Ver5🟢
// "react-router": "^5.0.1",
// "react-router-dom": "^5.0.1"