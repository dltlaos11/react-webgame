import React, { useState, useRef, useEffect } from 'react';

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

const RSP = () => { // state, props 바뀔 떄마다 함수 컴포넌트 전체 다시 시작
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위); 
    const [score, setScore] = useState(0);
    const interval = useRef(null);


    // Hooks에서는 React 라이프사이클 ❌ useEffect가 대체한다🟢🟢
    // 🟢🟢componentDidMount & componentWillUnmount & componentDidUpdate 대신 useEffect의 등장🟢🟢
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        console.log('다시 실행'); //🟢
        interval.current = setInterval(changeHand, 100); // setInterval 시작🟢
        return () => { // componentWillUnmount 역할
        console.log('종료'); // 🟢
        clearInterval(interval.current);  // setInterval 꺼짐❌ 🏃 번복 !!
        }
    }, [imgCoord/*, score, value*/]);
    // useEffect의 두 번쨰 인수 배열에 넣은 값(예제에서는 imgCoord)들이 바뀔 떄 useEffect가 실행된다.🟢
    // imgCoord가 계속 바뀌므로 console 부분이 계속 실행되므로🟢
    // 매번 clearInterval을 하기 떄문에 Class에서처럼 setTimeout을 하는 것과 동일하다.🟢
    // 만일🔵🔵 2번쨰 인자값이 없으면 한번 실행하고 값이 뭐가 바뀌든 다시 실행되지 않음 -> [] 이면 componentdidMount와 유사🔵🔵
    // 배열이 있으면 componentDidUpdate와 유사🔵🔵
    

    console.log("다시 시작????");
    const changeHand = () => {
            if (imgCoord === rspCoords.바위) {  // imgCoord 값 변경😮
                setImgCoord(rspCoords.가위);
            } else if (imgCoord === rspCoords.가위) {
                setImgCoord(rspCoords.보);
            } else if (imgCoord === rspCoords.보) {
                setImgCoord(rspCoords.바위);
            }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current); // Hooks에서 ref -> current
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult("비겼습니다");
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() =>{
            interval.current = setInterval(changeHand, 100);
        }, 1000); 
    };

    return (
        <>
        {/* 이미지를 background position으로 빠르게 전환(3분할) */}
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} /> 
        <div>
          <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
}

export default RSP;