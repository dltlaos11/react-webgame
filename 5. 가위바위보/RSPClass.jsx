import React, { Component } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };
  
  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };

const computerChoice = (imgCoord) => { // 컴퓨터가 묵-찌-빠 중 뭘 내고 있는지
    return Object.entries(rspCoords).find((v)=> v[1] ===imgCoord)[0]; // imgCoord와 동일한 갹체 1개🟢🟢
    // return Object.entries(rspCoords).find(function(v) {
    //     return v[1] === imgCoord;
    //   })[0];
};

// Hooks가 아닌 Class를 사용하는 경우🟢 Hooks를 사용하는 경우 무시해두..! ❌
// 항상 시작은 Component로 먼저 만들고 Component에서 성능 issue가 있을 것 같으면 react devtools로 확인 후
// 그 다음 PureComponent로 넘어갈지 고민해봐야 한다. 쓸데없이 리렌더링 계속되면 PureComponent 사용

// 🔵클래스 컴포넌트의 라이프 사이클🔵
// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount🟢
//  -> (setState/props 바뀔떄) -> shouldComponentUpdate(true🟢) -> render -> componentDidUpdate🟢
// 부모가 나를 없앴을 떄 -> componentWillUnmount🟢 -> 소멸
class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    // React 라이프사이클🟢🟢
    // RSP 컴포넌트가 client에서 불려와서 렌더링 되는데 렌더링 될 떄 DOM에 붙는 순간이 있다. 그 순간에 특정한 동작이 가능
    // render함수가 실행되면 react가 이 jsx를 DOM에 붙여준다. 붙여주고 난 바로 그 순간에 특정한 동작을 할 수 있다.

    interval; 

     componentDidMount() { // 컴포넌트가 첫 렌더링 된 후🔵 여기에 비동기 요청을 많이 한다.🔵
        // 렌더가 처음 실행되고 렌더가 성공적으로 실행됐다면 componentDidMount()가 실행된다.
        // 하지만 setState같은 것으로 리렌더링이 일어나면 실행되지 않는다.🟢 

        // const {imgCoord} =  this.state; ❌, 비동기 함수 바깥에 있는 변수를 참조하면 클로저 문제 발생.  
        this.interval = setInterval(this.changeHand, 100 ); 
        // setInterval은 일정 시간동안 반복작업을 해주는 것  
        // 랜더링 후에 componentDidMount 실행해서 반복작업을 계속 해줄 것이다.
        // 만약 어떤 이유에서 RSP 컴포넌트가 사라지면 setInterval부분을 아무도 취소를 안해준다.🟢 -> 이 컴포넌트가 사라졌다 하더라도 'asdf'는 계속 실행된다.
        // 고로, RSP 컴포넌트가 화면에 생겼다가 사라지면 setInterval이 한번 돌아가고 있다. 또 RSP 컴포넌트가 화면에 붙었다가 또 사라지면 기존에 있던 setInterval에 
        // 하나가 더해져서 2개가 같이 돌아가게 된다.🟢 Ex) NumberBaseball에 Try(자식)컴포넌트가 10번 찍히는데 Try에 setInterval을 해주면 setInterval이 10번이나 같이 돌아가는 것이다.
        // 누군가 setInterval을 취소해주지 않는 이상 계속 돌아간다. -> componentWillUnmount로 취소해야🟢
     }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
        // return true; return값이 true이면 리랜더링을 해줘야 한다, false면 안 리랜더링❌
    // }

    //  componentDidUpdate() {  리렌더링🔵
    // setState나 props가 바뀌면 render함수가 재실행 되는데 리렌더링 후에는 componentDidUpdate()가 실행
    //  }

    componentWillUnmount() { //컴포넌트가 제거되기 직전🔵 비동기 요청 정리를 많이 한다.🔵
    // 필요한 이유: 가위바위보 이미지가 정적인 이미지다. 처음에 주먹인데, 컴포넌트가 성공적으로 렌더링 되면 묵-찌-빠-..로 바꿔줘야 한다. 그 부분을 실행할 곳이 없다.🟢
    // render() 안에서 setState를 사용하면❌ 무한 렌더링이 되기 떄문에 !🟢🟢 setState를 써야 하는데 어디서 써야할지 모르는 경우 ComponentDidMount에서 사용 가능하다🟢
    // 그리고 componentWillUnmount()에서 componentDidMount에서 했던 작업들을 제거하는 용도 ! componentDidMount - componentWillUnmount는 짝이다. 🟢
    // 부모 컴포넌트가 자식 컴포넌트를 없앴을 떄 componentWillUnmount()가 실행

    clearInterval(this.interval); // setInterval 취소
    // componentDidMount()나 componentDidUpdate()에서 뭔가 비동기 요청을 했는데 그게 남아있으면 문제가 되기 떄문에 그런 애들을 정리해주는 것이 componentWillUnmount🟢
    // componentDidMount&componentDidUpdate - componentWillUnmount는 짝이다. 
    // setInterval같은거 안 없애면 콘솔에 계속 찍히는 것도 문제지만, setInterval&setTimeout 모두 메모리다. 취소를 안해주면 메모리 누수로 이어짐.
    // 완료되지 않은 비동기 요청은 componentWillUnmount에서 정리해줘야 한다.🟢

    // 여기서는 넣으나 안넣으나 체감하기는 힘들다. 가위바위보 컴포넌트를 제거안하기 떄문, 나중에 자식 컴포넌트의 경우라면 메모리 누수 문제 때문에 꼭 넣어줘야한다.🟢🟢 
    }

    changeHand = () => { 
        const {imgCoord} =  this.state; // 🟢🟢 
        // console.log('asdf');
            if (imgCoord === rspCoords.바위) {
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보,
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
        }; // 함수 중복 제거

    onClickBtn = (choice) => (/*e*/) => {
        // e.preventDefault(); 🟢 고차함수, 함수 연달아 쓰기   
        const {imgCoord} = this.state;
        console.log(imgCoord);
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        // setState가 연달아 있을 경우 한 번에 모아 처리, but setInterval 속에 콜백함수는 렌더링 각각된다🟢
        if (diff === 0) {
            this.setState(
                {
                result: '비겼습니다 !',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) =>{ // 옛날 값을 사용하는 경우 함수형으로 변환🟢
                return { 
                    result: '이겼습니다 !',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) =>{ // 옛날 값을 사용하는 경우 함수형으로 변환🟢
                return { 
                    result: '졌습니다 !',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() =>{
            clearInterval(this.interval);
            this.interval = setInterval(this.changeHand, 100); 
        }, 2000); 
    };

    render() {
        const { result, score, imgCoord } = this.state; // imgCoord 이미지 좌표
        return (
            <>
            {/* 이미지를 background position으로 빠르게 전환(3분할) */}
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} /> 
            <div>
              <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
            {/* onClick={() => this.onClickBtn('바위')}🟢
            onClick 메서드 안에 함수를 호출하는 부분이 들어있다. 그러면 간단하게 만드는 방법은 메서드 부분을 뺴서 함수 부분에서 적용🟢(함수 연달아 쓰기)
            <button id="rock" className="btn" onClick={(e) => this.onClickBtn('바위')}>바위</button>
             메서드 안에 함수 호출하는 부분이 있다. onClick이다보니 메서드에 e가 들어가는 경우 위에 함수에서 그대로 적용 가능 !!
               onClickBtn주석 확인해봐 !!!!🔵🔵  🟢🟢 고차함수: 함수를 값으로 사용가능  */} 
              <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
              <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
          </>
        );
    }
}

export default RSP;