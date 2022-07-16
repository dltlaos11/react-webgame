import React, { useState, useRef, useEffect, useMemo } from 'react';
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
    const lottoNumbers = useMemo(() => getWinNumber(), []); // getWinNumber의 retrun값을 기억🔘🔘
    // useMemo, useEffect, useCallback은 두번째 인자가 있다.
    // useMemo🔘🔘: 복잡한 함수 결괏값을 기억,  useRef: 일반 값을 기억🔘🔘
    // 두 번쨰 인자가 바뀌지 않는 한, 첫 번째 인자:함수의 실행은 다시 실행되지 않는다.
    // 단, 두 번째 배열의 요소가 바뀌면 첫 번째 인자:함수도 다시 실행된다. 
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
     // 이부분이 계속 실행된다. Class와 다르게 Hooks는 함수 컴포넌트 전체 부분이 렌더링 되서🟢
     // 이런 경우 getWinNumber의 로또숫자들을 캐싱해 놓는 방법은 useMemo를 사용🟢🟢 useMemo
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

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
      

    const onClickRedo = () => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumber());
        setWinBalls([]);
        setBonus(null);
        setRedo(false); 
        timeouts.current = []; 
        // timeouts.current가 바뀌는 시점🟢🟢, current에 직접 넣어줘서 예전 current랑 달라짐
        // useEffect가 감지 
    };

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
        {/*🟢 <button onClick={redo🟢 ? this.onClickRedo : () => {}}> 한번  더!</button> 실수다 실수도 기억해라🟢 조건문   */}
        {redo && <button onClick={onClickRedo}> 한번  더!</button>}
        </>
    );
}