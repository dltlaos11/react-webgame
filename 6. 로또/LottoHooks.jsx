import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

const Lotto = () => {
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumber(), []); // getWinNumber의 retrun값을 기억🔘🔘
    // useMemo, useEffect, useCallback은 두번째 인자가 있다.
    // useMemo🔘🔘: 복잡한 함수 결괏값을 기억,  useRef: 일반 값을 기억🔘🔘
    // 두 번쨰 인자가 바뀌지 않는 한, 첫 번째 인자:함수의 실행은 다시 실행되지 않는다.
    // 단, 두 번째 배열의 요소가 바뀌면 첫 번째 인자:함수도 다시 실행된다. 
    // 만일, useMemo의 2번쨰 빈배열안에 winBalls를 넣으면 winBalls는 계속 변하기 떄문에 getWinNumbers가 계속 실행.😨
    // 빈 배열이라면 값이 변하지 않을 테니 실행되지 않겠지? 😀😀
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
     // 이부분이 계속 실행된다. Class와 다르게 Hooks는 함수 컴포넌트 전체 부분이 렌더링 되서🟢
     // 이런 경우 getWinNumber의 로또숫자들을 캐싱해 놓는 방법은 useMemo를 사용🟢🟢 useMemo
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // Hooks는 실행 순서가 있다. state가 관련되어 있을 수 있으며 순서에 유의해야 한다. 그리고
    // 조건문 안에 절대 넣으면 안 되고 함수나 반복문 안에도 웬만하면 넣으면 안된다.🟢🟢

    useEffect(() => {
        console.log('useEffect');
        for (let i =0; i < winNumbers.length -1; i++) { // let 사용은 클로저 문제를 안일으킴
            // timeouts.current가 바뀌는 시점이 아니다❌❌
            // current에 직접 넣은게 아니라 current배열에 요소로 넣어준 것이다.
            // 즉, timeouts.current이 바뀌지 않는다.🟢🟢, useEffect가 감지하지 못함.
            timeouts.current[i] =setTimeout(()=>{
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i+1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
         }, 7000);

         return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
         }; // componentWillUnmount는 return안에서🔘
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일🔘
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행🔘
    // 여기서가 문제🤔🤔
    // 조건을 어떻게 적어줘야 하는지가 문제다. Class에서는 winBalls.length === 0이었는데 []안에서 저 조건이 맞을지..??🤔
    // 즉 원하는 조건을 배열안에서 수행되도록 했을 떄 componentDidMount랑 componentDidUpdate 기능을 둘다 수행 할 수 있는 것이다. 
    // Class Version에서의 ComponentDidUpdate의 조건과 완벽하게 일치하지 않는다.🟢🟢
    // useEffect는 timeouts.current 변경 시 새로 실행.


    // state별로 componentDidUpdate 할 것이 다른 경우 useEffect를 여러번 수행 가능하다.🟢🟢
    // useEffect(() => {
        // console.log('로또 숫자를 생성합니다.')
    // }, [winNumbers]); winNumbers가 변하는 경우에만 변화를 주고 싶은 경우 useEffect 한번 더 사용 가능.
    // Class안에서는 componentDidUpdate에서 조건문으로 나눠주지만 Hooks에서는 useEffect을 원하는 만큼 사용 가능

    // useEffect에서의 Ajax🔘🔘🔘 componentDidMount/componentDidUpdate
    // useEffect(() => {
        //// ajax
    // }, []);  componentDidMount에서만 하고싶다 !!🟢🟢🟢
    
    // useEffect가 componentDidMount에서 실행되는 것은 어쩔 수 없다. 실행은 되지만 아무것도 안하고
    // 이후에는 바뀌는 값에 따라서 ajax 실행
    // const mounted = useRef(false);
    // useEffect(() => {
        // if (!mounted.current){
            // mounted.current = true;
        // }
        // else {
            //// ajax
        // }
    // }, [바뀌는값])  componentDidUpdate만, componentDidMount X🟢🟢🟢


    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers); 
        // useCallback🟢🟢
        // 모든 함수를 꼭 기억해야되는 건 아니다. 기억해야 좋을 때가 있고 기억하지 않아도 될 떄가 있다.
        // 값을 기억하게 하고싶지 않다면 두 번째 파라미터 빈 배열에 사용되는 state를 기입🟢🟢
        // 로또 숫자들을 계속 기억한다🤔🤔, 이럴떈 useCallback의 2번쨰 인자인 빈 배열 안에 winNumbers를 넣어준다.
        // 배열안의 값이 바뀔 떄마다 함수를 새로 실행한다.🟢🟢
        setWinNumbers(getWinNumber());
        setWinBalls([]);
        setBonus(null);
        setRedo(false); 
        timeouts.current = []; 
        // timeouts.current가 바뀌는 시점🟢🟢, current에 직접 넣어줘서 예전 current랑 달라짐
        // useEffect가 감지 
    }, [winNumbers]); // useMemo는 값을 기억🔘🔘 useCallback은 함수를 기억🔘🔘

    return(
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number = {v} />) // map의 쓰임 경우 key가 들어감을 잊지말자, map-key는 세트🟢
            // 반복문을 기점으로 자식 컴포넌트로 분리, props로 전달하기 좋은 기점 
            }
        </div>
        <div>보너스!</div>
        {bonus && <Ball number = {bonus} />}
        {/* 🟢🟢자식 컴포넌트에게 props로 함수를 넘길 경우 useCallback을 꼭 해줘야 한다.🟢🟢 그래야 자식 컴포넌트의 리렌더링을 막는다.
            useCallback이 없으면 매번 새로운 함수 실행. 자식 컴포넌트에게 매번 새로운 함수가 전달되면
            자식 컴포넌트가 매번 새로 렌더링을 해버린다.
        {bonus && <Ball number = {bonus} onClick ={onClickRedo}   />} */}
        {/*🟢 <button onClick={redo🟢 ? this.onClickRedo : () => {}}> 한번  더!</button> 실수다 실수도 기억해라🟢 조건문   */}
        {redo && <button onClick={onClickRedo}> 한번  더!</button>}
        </>
    );
}

export default Lotto;
