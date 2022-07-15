import { array } from "prop-types";

const answer = [3, 1, 4, 6];
const value = '3214';
let strike = 0;
let ball = 0;
answer.forEach((element, i) => {
    const index = value.indexOf(element);
    console.log(answer[i], index);
    if (index > -1) { // 일치하는 숫자 발견
        if (index === i) { // 자릿수도 같음
            strike += 1;
        } else { // 숫자만 같음
            ball += 1;
        }
    }
})
// forEach🟢
// strike 1
// ball 2


// map, fill🟢
Array(45).fill().map((element, index) => {
    return index + 1;  
}); // map은 forEach역할도 하면서 return이 있어서 기존 배열을 건들지 않고 새로운 배열을 만들어 준다. 새로운 배열을 만든다.
// 배열 만들기  Array(45).fill()
// (45) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]



// 🔘🟢🔘🟢 pop, push, shift, unshift, splice => 배열을 직접적으로 수정, 배열을 직접수정하는 함수들은 쓰면 안된다. 🔘🟢🔘🟢
// concat, slice => 새로운 배열을 만들어냄 

// Sort🟢 - 정렬
// 숫자정렬
// numArray.sort((a, b) => a - b); // 오름차순
// numArray.sort((a, b) => b - a); // 내림차순
// 글자정렬
// items.sort(function(a, b) {
// var nameA = a.name.toUpperCase(); // 대소문자 무시
// var nameB = b.name.toUpperCase(); // 대소문자 무시
// if (nameA < nameB) {
//     return -1;
// }
// if (nameA > nameB) {
//     return 1;
// }

// // names must be equal
// return 0;
// });

// random 수
const num = [1,2,3,4,5];
console.log(num.slice(Math.floor(Math.random() * num.length),1)[0]);

// splice & slice🟢
// splice로 삭제 바꾸기 추가 가능🟢
// splice하면 삭제된 값이 출력🟢
let arr = ['foo', 'bar', 10, 'qux'];

// arr.splice(<index>, <steps>, [elements ...]);

arr.splice(1, 1);			// Removes 1(2번째 파라미터) item at index 1(첫번째 파라미터)
// => ['foo', 10, 'qux']

arr.splice(2, 1, 'tmp');	// Replaces 1 item at index 2 with 'tmp'
// => ['foo', 10, 'tmp']

arr.splice(0, 1, 'x', 'y');	// Inserts 'x' and 'y' replacing 1 item at index 0
// => ['x', 'y', 10, 'tmp']
arr.splice(0, 2, 'z', 'k');	// Inserts 'x' and 'y' replacing 1 item at index 0
// => ['z', 'k', '10', 'tmp']
array.slice(0,4);
// => ['z', 'k', '10', 'tmp']

const FRUITS = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = FRUITS.slice(1, 3); // 정수일 떄 2번쨰 "파라미터-1"까지
// citrus => [ 'Orange', 'Lemon' ]

// Negative values slice in the opposite direction
var fromTheEnd = FRUITS.slice(-3, -1); // 음수일 떄 2번쨰 "파라미터-1"부터
// fromTheEnd => [ 'Lemon', 'Apple' ]

// reduce🟢
// initialValue를 제공하지 않으면, reduce()는 인덱스 1부터 시작해 콜백 함수를 실행하고 첫 번째 인덱스는 건너 뜁니다. initialValue를 제공하면 인덱스 0에서 시작합니다.🟢
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x ); 
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// initialValue 없이 reduce()
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42, 객체의 x속성
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce로 개선 - 비었거나 더 큰 배열에서도 동작함
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );

// reduce 예제🟢🟢🟢
[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr ); // 10

[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
    return accumulator + currentValue;
    // reduce함수의 callback함수는 4가지 인자를 받음
    // accumulator: 누산기는 콜백의 반환값을 누적, 콜백의 이전 반환값 또는, 콜백의 첫 번째 호출이면서 initialValue를 제공한 경우에는 
    //initialValue의 값이 된다. 즉 현재의 reduce함수의 초깃값은 10이므로 accumulator는 10부터 시작
    // currentValue: 처리할 현재 요소
    // 옵션, currentIndex: 처리할 현재 요소의 인덱스 ,initialValue를 제공한 경우 0, 아니면 1부터 시작, 현재 reduce함수는 0이겠지? 
    // 옵션, array: reduce()를 호출한 배열
  }, 10); // 20