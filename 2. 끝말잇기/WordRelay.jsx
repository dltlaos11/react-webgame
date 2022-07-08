const React = require('react'); // componet 분리할 때마다 반복, 파일을 쪼개는 경우🟢
const { Component } = React; // React.Component => Component, 파일을 쪼개는 경우🟢
// 쪼갠 파일에서 필요로 하는 패키지나 라이브러리 가지고 오는 부분

class WordRelay extends Component {
    state = {
        word: '주용준1',
        value: '',
        result: '', // 데이터 바뀌는 부분이 state
    };
// [HMR]: hot-module-reloader, [WDS]: HMR로 변경사항 받아서 Webpack-dev-server가 서버를 재시작해서 업데이트
     onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        } else {
            this.setState({
                result: '떙',
                value: '',
            });
            this.input.focus();
        }
    }; // 클래스 메서드는 무조건 화살표 함수 사용, 화살표 함수를 사용하면 부모의 this를 가르킨다.
    
    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    };

    input; // this.input을 생성

    onRefInput = (c) => {
        this.input = c;
    };

    render () {
        return (
            <>
            <div>{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
            <label htmlFor="wordInput">글자를 입력하세요</label>
            {/* htmlFor, className 예약어 */}
            <input id="wordInput" className="wordInput" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
            {/* ==  <input ref={this.onRefInput} defaultValue = {this.state.value} /> */}
                {/* value와 onChange는 세트🟢 && 그게 아니면 defaultValue  */}
                <button>신기하다 정말 ~ ^^</button>
                <h1>핫로더 최고해 ~ </h1>
            </form>
            <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay; // 파일을 쪼개는 경우🟢
// 쪼갠 파일에서 쓰는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것.
// 이게 노드의 모듈 시스템 
// module.exports를 추가하면 외부에서 불러올 수 있다.

// 이후 npm run dev 웹팩으로 빌드
// 근데 항상 오류날 떄마다 수동으로 빌드해주면 너무 귀찮은 일😅, 자동으로 매번 빌드된도록 해줘야 한다.
// 웹팩 데브 서버와 핫 리로딩🟢
// npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D 
// npm i -D webpack-dev-server 개발용 서버 설치

// 원래 react-hot-loader로 refresh했었는데 react-refresh로 바뀌었다.🟢
// "scripts": {
//     "dev": "webpack-dev-server --hot"
//   }, webpack-dev-server가 달라진 것이 아니라, webpack-cli가 4버전이 되면서
// "scripts": {
//     "dev": "webpack serve --env development"🟢
//   }, 이렇게도 webpack-dev-server를 실행할 수 있게 바뀜  