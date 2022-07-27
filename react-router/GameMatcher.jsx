import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NumberBaseball from '../3. 숫자야구/NumberBaseball'
import RSP from '../5. 가위바위보/RSPClass'
import Lotto from '../6. 로또/Lotto'

class GameMatcher extends Component {
    render() { 
        // URLSearchParams🟢
        // console.log(new URLSearchParams(this.props.location.search.slice(1))); // slice(1): 앞에 ? 떼네는 것
        // URLSearchParams {} 가 나오는데 이것은 빈 객체가 아니다.🟣🟣
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('hello'));
        // zerocho라는 결과 값이 콘솔에 출력🟢 이렇게 Parsing은 따로 해줘야 한다.

        if (this.props.match.params.name === 'number-baseball') {
            return <NumberBaseball />
        }
        else if (this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP />
        }
        else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto />
        }
        // Route -> history, match, loaction🟢
        // history: 페이지에 대한 기억이 존재. goBack, goForward, push, replace 등의 함수들이 있어서 프로그래밍적으로 페이지 이동이 가능
            //      이게 왜 필요하냐면 react-router는 눈속임이다. 실제로 페이지가 바뀌는게 아니라 페이지가 바뀌는 척읋 하는 것이기 떄문에 브라우저가 말을 안 들을 수 있다.🥲
            //      실제로 페이지가 바뀌는게 아니라 눈속임을 하는것이기 때문에 페이지가 넘나드는 api도 브라우저가 제공하는 것 말고 react-router가 제공하는 history를 사용,
            //      기본 브라우저의 동작과 다르다.🔵react-router 눈속임을 위한 method들
            //      브라우저 개발자 모드 콘솔에서 history.pushState('', '', '/hello')는 브라우저의 history api고 react-router의 history api는 this.props.history이다.🟢🟢
            //      react-router에서는 this.props.history를 사용해야 한다. 내부적으로 브라우저의 history api를 사용하고 있다는 것을 알아두자🔵🟣 의존 관계를 염두해두자 
        // match: :name -> params라고 했는데 match안에는 params에 해당 주소 정보가 들어있음 params: {name: "number-baseball"} 처럼🔵동적 주소 라우팅할 떄 params정보 
        // loaction: pathname, hash, search등이 들어있다.🔵주소에 대한 정보
          
        // history, match, loaction이 출력, Route 컴포넌트에서 GameMatcher가 연결되어 있는데 history, match, loaction을 알려준다.
        // 근데 Route연결이 안된 컴포넌트에서 쓰고 싶다면 HoC(Higher Order Component)패턴으로 감싸주면 history, match, loaction이 생김   
        // export default withRouter(GameMatcher);🟢 Hoc
        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        );
    }
}

export default GameMatcher;