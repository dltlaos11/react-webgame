import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumber() { // 로또 당첨숫자 뽑는 함수
    console.log('getWinNumber');
    const candidate = Array(45).fill().map((v, i) => i + 1); // fill🟢  
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumber(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    timeouts = []; // Hooks에서는 useRef가 setTimeout이나 seTIntervatimersl의 취소 역할을 하기위한 변수로 사용되었었지?🟢

    componentDidMount() { // 첫 렌더링 되자마자 setTimeout을 진행
        const { winNumbers } = this.state;
        for (let i =0; i < winNumbers.length -1; i++) { // let 사용은 클로저 문제를 안일으킴 
            this.timeouts[i] =setTimeout(()=>{
                this.setState((prevState) => {
                    return {
                    winBalls: [...prevState.winBalls, winNumbers[i]], // react에서 state배열에 값을 넣을 떄는 push하지 말고 이렇게 넣어야 한다.
                    };
                });
            }, (i+1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo:true, // 안보이다가 bonus공까지 나왔으면 "한번 더"를 표시
            });
        }, 7000);
    }

    componentWillUnmount () { // Lotto컴포넌트 삭제 시, 메모리 누수문제 해결
        this.timeouts.forEach((v)=> { // forEach(element, index) 
            clearTimeout(v);
        })
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number = {v} />) // map의 쓰임 경우 key가 들어감을 잊지말자, map-key는 세트🟢
                // 반복문을 기점으로 자식 컴포넌트로 분리, props로 전달하기 좋은 기점 
                }
            </div>
            <div>보너스!</div>
            {bonus && <Ball number = {bonus} />}
            {/*🟢 <button onClick={redo🟢 ? this.onClickRedo : () => {}}> 한번  더!</button> 실수다 실수도 기억해라🟢 조건문   */}
            {redo && <button onClick={this.onClickRedo}> 한번  더!</button>}
            </>
        );
    };
}

export default Lotto;