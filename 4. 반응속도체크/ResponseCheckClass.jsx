import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting', // 색
        message: '클릭해서 시작하세요.',
        result: [], // 평균시간
    };

    timeout; // 🟢setTimeout함수 넣을 this.timeout선언
    startTime; // 여기에 저장, state에 넣으면 랜더링 되지만 여기서 변하면 랜더링 ❌
    endTime; 

    onClickScreen = () => {
        const { state, message, reuslt } = this.state;
        if (state === 'waiting') { // 파란 화면일떄 클릭을 한 경우 빨간색 화면으로 변경
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요',
            }); // 빨간색 된다
            this.timeout = setTimeout(() => {
                this.setState({ // 초록색이 된 순간부터 시간을 재야 반응속도
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date(); // startTime은 변하긴 하는데 state로 하면 랜더링이 일어나기 떄문에 timeout처럼 this.startTime으로 선언🟢
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 후 초록색
        } else if (state === 'ready') { // 빨간색일 떄는 클릭❌ , 성급하게 클릭🟢
            clearTimeout(this.timeout); // 기존 setTimeout을 없애줘야 한다. clearTimeout으로 초기화🟢 초록화면으로 안넘어감 
            // setTimeout은 호출스택으로 넘어가도 clearTimeout으로 취소할 수 있다.
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요!', 
                // 여기서 setTimeout의 초기화가 필요🟢 아니면 위에서 setTimeout코드 떄문에 초록화면으로 넘어간다.
            });
        } else if (state === 'now') { // 초록색에서 클릭 하여 반응속도 체크🟢, 처음 화면
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요!',
                    result: [...prevState.result, this.endTime - this.startTime], // React에서 push🟢 옛날 배열에 추가 -> 함수형으로
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        })
    }

    renderAverage = () => { // result가 하나 들어가는 순간 자동으로 평균시간 컴포넌트 만들어준다.🟢
        const { result } = this.state;
        return result.length === 0
        ? null 
        : <>
            <div>평균 시간: {result.reduce((a, c) => a+c) / result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
         </>
    };

    render() { // render의 retur 안에서 for이랑 if를 못써서 다른 방식으로 표현해야 한다.🟢  
        const { state, message } = this.state;
        return (
            <>
            <div
                id="screen"
                className={state} // css className
                onClick={this.onClickScreen}
            >
                {message}
            </div>
            {// 조건문🟢  
             // 삼항연산자🔵
                // this.state.result.length === 0
                //  ? null // jsx에서 false, undefined, null은 태그없음을 의미
                //  : <div>평균 시간: {this.state.result.reduce((a, c) => a+c) / this.state.result.length}ms</div>
                // reduce 함수에서 a: 누산기. 콜백함수의 반환값을 누적, c: 처리할 현재 요소🟢
                // 합계 구해서 전체 길이로 나누면 평균, result가 빈 배열인데 빈 배열일 때는 합계 구하는 걸 못쓴다. result가 없을 떄는 조건문으로 위의 div태그를 없애기

              // 보호연산자 &&🔵
              //   this.state.result.length !== 0
              //   && <div>평균 시간: {this.state.result.reduce((a, c) => a+c) / this.state.result.length}ms</div>

              // 함수로 표현🔵 코드 지져분할때 함수로 랜더링하는 부분 뺴는 것
              this.renderAverage() 
              // reset 버튼을 누를 떄 result가 달라지면 state, message가 바뀌는 쓸데없는 리렌더링이 일어나므로 이함수 부분을 컴포넌트로 바꾼다🟢
              //  result가 바뀌는거랑 state, message 상관❌ 다른 컴포넌트는 분리 
              // 성능체크 -> React dev tools에서 컴포넌트 살펴보면서 하이라이트 잘 보기🟢   
            }
            </>
        );
    }
}

export default ResponseCheck;