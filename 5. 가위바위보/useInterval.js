// 커스텀 훅으로 우아하게 interval 하기  🟢
import { useRef, useEffect } from 'react';

// const [isRunning, setRunning] = useEffect(true);
// useInterval(() => {
//     console.log('hello');
// }, 1000); 
// 1초마다 반복해서 실행하는 커스텀 훅🟢
// delay를 null로 만들면 interval이 멈춘다.  

function useInterval(callback, delay) {
    const savedCallback = useRef(); // callback 함수를 savedCallback이라는 Ref에 저장

    useEffect(() => {
        savedCallback.current = callback;
    });

    // callback을 tick()이라는 함수에 감싸서 넣은 이유? 🧐
    // useEffect(() => {
        // if (delay !== null) {
            // let id = setInterval(callback, delay);
            // return () => clearInterval(id);
        // }
    // },[delay, callback]);
    // 이렇게 해도 상관은 없다. 하지만 약간의 미묘한 에러가 생긴다.
    
    // setInterval은 호출되고 나서 delay이후에 callback을 실행 따라서 1.1초 + 1초 == 2.1초, 참고로 여기서 callback은 changeHand, 계속 변하므로 deps[]배열에 들어가야 한다.🟢
    // 1초 뒤에 가위
    // 1.1초 뒤에 changeHand
    // 2.1초 뒤에 바위
    // 2.2초 뒤에 changeHand
    // 3.2초 뒤에 보
    // callback 바뀜에 따라서 clearInterval하고 setInterval하는 그 잠깐의 시간만큼씩 딜레이가 발생🟢🟢
    // 그래서 callback을 deps배열에 받으면 안좋다. Interval을 끊었다가 다시 등록하는 과정에서 딜레이 발생 때문에
    // 그래서 그런 과정을 피하려면 useRef를 사용해야 한다.
    // useRef를 쓰면 clearInterval과 setInterval을 delay가 바뀔떄만 실행 된다.
    // useEffect 안에서 callback을 ref에 저장함으로써 callback이 바뀌어도 새로 setInterval이 안되지만 최신 callback을  참조 가능하다🟢🟢
    // changeHand가 바뀌든 말든 setInterval은 최신 callback만 받는 것🟢🟢
   
    // clearInterval하고 setInterval할 떄마다 딜레이가 발생하는데 딜레이를 발생시키지 않는 방법은 애초에 clearInterval을 아예 안하게 하면 된다.🟢
    // 아예 안하게 하는 방법은 callback이 바뀔 떄 clearInterval하는게 아니라 setInterval에서 ref로 최신 callback을 처음 선언부에서 담아 둔 다음에 
    // 최신 callback을 실행하게 만드는 기법
    // function tick() { // 🔵
    //     savedCallback.current();
    // }
    // let id = setInterval(tick, delay);
    
    useEffect(() => { // delay === 1000 일 떄 실행
        function tick() { // 🔵
            savedCallback.current();
        }

        if (delay !== null) { // delay === 1000
            let id = setInterval(tick, delay);
            return () => clearInterval(id); // delay === null 이 되면 return 부분이 실행되서 clearInterval 실행 
        }
    }, [delay]); // delay는 고정 값이긴 하다

    return savedCallback.current;
}

export default useInterval;