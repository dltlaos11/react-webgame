import React from 'react';
import { BrowserRouter, HashRouter, Link, Route, Switch, Routes } from 'react-router-dom';
import NumberBaseball from '../3. 숫자야구/NumberBaseball'
import RSP from '../5. 가위바위보/RSPClass'
import Lotto from '../6. 로또/Lotto'
import GameMatcher from './GameMatcher';

const Games = () => {
    // function component인 경우🟢
    // const Games = ({ match, location, history }) => {
    // props자리에 params가 있다. class 컴포넌트는 this.props로 접근

    return (
        <BrowserRouter>
        {/* 🔵공통적인 Layout🔵 */}
            <div>
                공통인 부분
                <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
                {/* 브라우저 상에는 <a>태그로 나타나는데 실제로는 Link다, Link태그 사용해야 <Route>태그랑 매칭이 된다. 
                    주소가 바뀌면서 마치 페이지가 여러개인 것 처럼 느껴지는데, 실제로는 페이지가 하나다. <Route>로 등록해놓은 컴포넌트가 화면에 렌더링되는거지
                    페이지가 여러개 있는 것이 아니다. 그것을 증명할 수 있는 게 http://localhost:8080/lotto-generator에서 새로고침을 했을 떄 
                    Cannot GET /lotto-generator라는 에러가 뜬다.🥶🥶 이게 바로 실제로는 페이지가 여러개 있지 않다는 증거이다. 왜냐면 
                    새로고침을 하거나 주소창에 /lotto-generator 입력하는 것은 서버쪽에 요청을 보내는 것이다. 서버는 /lotto-generator이런 것이 있는줄 모른다.
                    아래 적힌 3개의 가상의 주소는 클라이언트이면서 프론트엔드인 react-router만 알고있는 애들이다. 그러니까 브라우저에서만 이주소들이 유효하고🟢🟢
                    새로고침 하는 행위나 주소를 입력하는 행위는 서버쪽에 요청전달이 되서 서버는 나몰라라 한다. 
                    실제로 페이지가 여러개 있는게 아니라 프론트엔드의 react-router가 여러개 있는 척하는거다. 그래서 서버쪽에 해당주소로 요청해보면 나몰라라한다.  

                    🟢HashRouter
                    http://localhost:8080/#/rock-scissors-paper, 중간에 #가 들어있다 해서 HashRouter라 불림
                    HashRouter는 새로고침 해도 동작을 한다. #/rock-scissors-paper 이 부분은 브라우저만 아는 부분이다. 하지만 서버는 이 주소를 모른다.🔵
                    SEO에 좋지 못함.🔵 BrowserRouter를 사용해도 SEO을 위해 따로 세팅이 필요하긴 하다.
                */}
                {/*
                     쿼리스트링🟢
                 "/game/number-baseball?query=10&hello=zerocho&bye=react" 주소에 데이터 전송 ?뒤에 key=value하고 &로 구분한다.
                 쿼리스트링에 대한 정보는 loaction에 search부분에 존재, search에서 데이터를 가지고 오면된다.
                 search: "?query=10&hello=zerocho&bye=react"
                 */}
                &nbsp;
                <Link to="/game/rock-scissors-paper">가위바위보</Link>
                &nbsp;
                <Link to="/game/lotto-generator">로또생성기</Link>
                &nbsp;
                <Link to="/game/game/index">게임 매쳐</Link>
            </div>
            {/* 🟣바뀌는 화면들이 나오는 부분🟣 */}
            <div>
            {/* <Route path="/number-baseball" component={NumberBaseball} />
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/> */}
            
            {/* 동적라우팅 🟢 보통 이 방식을 사용하다 자식에게 props를 넘기거나 할 떄는 component대신 render를 사용
            <Route path="/game/:name" component={GameMatcher}/> */}
            {/* Route들이 너무 늘어나면 문제가 되기 떄문에 효율적으로 Route 갯수를 관리할 수 있는 동적 Route 매칭, 🟢
                :name -> params라 부름, 이 부분이 동적으로 바뀜  
            */}

            {/*🟣 Games에서 GameMatcher로 props 넘기기 🟣*/}
            {/* 1️⃣ */}
            {/* <Route path="/game/:name" component={() => <GameMatcher props="123456" />}/> */}
            {/* 2️⃣ render, 부모의 props를 자식에게 전달 가능, props에 history, match, location 존재*/}
            <Route path="/game/:name" render={(props) => <GameMatcher {...props} />}/>
            
            {/* 🟣Switch: Route 중에서 첫번째로 일치하는 것만 되게 하고싶은 경우 사용, 첫 번째것과 일치하면 그 다음것이 일치하더라도 화면에 렌더링이 안됨.
                          동시에 Route여러개 되는 것을 방지, 상위 주소랑 하위 주소가 있는 경우(/, /number..) 상위 주소도 일치하는 것으로 처서 exact를 적용해서 해결🟢 
             */}
            <Switch>
                <Route path="/game/:name" render={(props) => <GameMatcher {...props} />}/>
                <Route path="/game/number-baseball" render={(props) => <GameMatcher {...props} />}/>
            </Switch>
            
            {/* exact🟢 */}
            <Switch>
                <Route exact path="/" render={(props) => <GameMatcher {...props} />}/>
                {/* /game/number-baseball인데 /도 일치한다고 생각한다. 그래서 2개의 컴포넌트가 렌더링 됨. 이런경우 Switch도 해결 못함.🟢  그런 경우 exact를 붙여서 해결 ! */}
                <Route path="/game/:name" render={(props) => <GameMatcher {...props} />}/>
            </Switch>

            {/* ------------------------------------------------------------------------------------------------  */}
            {/*🟣 Ver 6 🟣*/}
            {/* npm outdated로 최신 업데이트 유지, react-router github에서 package.json이나 version 비교
                우측에 Release 클릭해서 이전 버전과 비교하거나, ChangeLog라고 해서 변경 확인 가능, 그리고 변경된 것이 많은 경우 Migration이라고해서 급격하게 변하면 guide확인 가능🟢🟢
                <Switch> -> <Routes>로 변경🟢
                exact가 사라졌다.🟢
                component, render 다사라지고 element🟢통일
                if문으로 동적라우팅 처리안하고 Routes로 router로 처리 GameMatcher는 /game/:name의 하위주소에서 상대경로로 하면 :name에 알아서 들어간다.🟢
                history.goBack -> navigate(-1)🟢

                typescript가 아니라 javascript로 version up하는 경우 codemod 라이브러리를 사용하면 정확하게 모든파일 싹다 버전 업이 가능🟢🟢
            */}
            <Routes>
                <Route path="/" element={<GameMatcher />}/>
                <Route path="/game/:name" element={<GameMatcher />}/>
            </Routes>

 
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