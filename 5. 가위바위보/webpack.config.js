const path = require('path'); // path라고 node에서 경로 쉽게 조작할 수 있도록 준다.(node안에 깔려있다.)
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // 받았던 plugin  require   

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실 서비스에서는 production으로 변경 
    devtool: 'eval', // 'eval': 빠르게 하겠다는 것을 의미 
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // entry에서 css, json, js 등 여러가지 파일이 들어갈 수 있는데 resoleve{extensions: []}를 사용하면 
    // entry에 확장자 표기 안해줘도 된다.
    
    // 🖐중요🖐
    entry: {
        app: ['./client'], 
        // 근데 clients.jsx에서 이미 RSP를 불러오고 있다. 이런걸 webpack이 알아서 다 파악한다.(뭐가 뭐를 불러오는지)
        // 그래서 이미 다른 파일이 불러오는 파일은 적어줄 필요가 없다. RSP를 안적어줘도 된다.) 파일 쪼갤 때 사용하던
        // react랑 react-dom도 같이 불러오고 !!🟢

    }, // 입력, 목표: client, RSP를 app.js 파일 하나 만들어서 html이 실행할 수 있게 해주는 것. 

    // 웹팩으로 빌드하기🟢
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [ // presets에 대한 설정🟢 
                ['@babel/preset-env', { 
                    targets: {
                        browsers: ['> 5% in KR','last 2 chrome version'], 
                        // 지원하고자 하는 브라우저에만 맞춰서 설정 가능, browserslist 사이트 참고 !!  😎
                    }, // preset-env는 자동으로 옛날 브라우저 지원해주는 것, 더 구체적으로 명시 가능
                    debug: true, // 개발용에서..
                }], // plugins 설정하고 싶다면 배열로 만든 뒤 첫번째 요소에 preset이름 적고 두번째 요소에 설정을 적는 것
                '@babel/preset-react',
            ], // babel의 options들을 넣어준다. 이전에  다운받았던 preset 들을 넣어주면 된다.(npm i -D @babel/core @babel/preset-env)
            plugins: [
                '@babel/plugin-proposal-class-properties', // Class 내부의 속성들을 선언할 떄 바벨 플러그인이 없으면 오류가 난다. (클래스가 인스턴스화 되면서 속성을 초기화, 클래스에 static property를  사용하고 싶을 떄) 2가지 케이스를 처리
                'react-refresh/babel' // babel-loader에 이 plugin을 넣으면 babel이 최신문법을 옛날 js로 변환할 떄 hot-leloading기능까지 추가해준다🟢 
            ],    
        },
        }], // 여러개의 규칙들을 정할 수 있기에 rules는 배열이다.
        // /\.jsx?/,: 정규표현식, js랑 jsx파일에 rule을 적용하겠다.
        // 어떤 rule? babel-loader rule, js, jsx 파일에 바벨 적용해서 최신이나 실험적인 문법을 옜날 브라우저에서도 돌아갈
        // 수 있는 문법으로 바꿔주겠다.   
    },  
    // 웹팩 설정할 떄🟢 순서에 맞게 entry는 파일을 읽고 modules을 적용한 후 output에 뺀다.
    // 결국엔 웹팩 설정으로 알아서 jsx, js 파일을 babel 적용해준다.
    // npx webpack or npm run dev로 빌드하면 dist에 app.js파일 생긴다.
    // 이후에 터미널에 성공 메세지 확인이 가능하다. asset app.js [emitted] client.jsx RSP[built]😀


    plugins: [
        new RefreshWebpackPlugin() // 플러그인이 장착 된 것, 앞으로 빌드 할 때마다 이 부분이 실행 된다.
    ], // 플러그인 

    output: {
        path: path.join(__dirname, 'dist'), // node 기술이 들어간다.
        filename: 'app.js',
        // path.join하면 경로를 알아서 합쳐준다. 
        // (__dirname, 'dist'), __dirname: "현재 풀더" 경로(2. 끝말잇기) 안에 dist 폴더가 된다.
        // 실제 dist폴더 경로는 C:\Users\Administrator\react\react-webgame\2.끝말잇기\dist이다.
        // 근데 path.join을 하면 현재 폴더 안에 dist 경로를 자동으로 만들어준다.
        publicPath: '/dist', // webpack-dev-server가 사용하는 결과물간의 상대 경로 🟢
    }, // 출력
    devServer: { // webpack이 1년 단위로 대대적으로 바뀐다 한다🤣, webpack-dev-server 4버전과 react-refresh-webpack-plugin 5버전의 수정사항
        devMiddleware: { publicPath: '/dist' }, // "나중에 웹팩이 생성해주는 경로", 웹팩 명령어 실행(빌드)하면 dist폴더에  빌드한 파일들.
        // devSever인 경우에는 "메모리"에 생성.  🟢
        static: { directory: path.resolve(__dirname) }, // index.html은 실제로 존재하는 파일, static: "실제로 존재하는 정적 파일들의 경로 기입".🟢
        //  __dirname(첫번째 인자), 두번째 인자로는 폴더 위치를 기입, index.html이 src에 있었다면 (__dirname, 'src'). 현재는 같은 폴더에 있어서 2번째 인자 필요 ❌
        
        // webpack-dev-server의 역할: webpack.config.js에 적어준 대로 build해서 결과물을 
        // 돌린 다음에 '/dist'풀더에 결과물을 저장해둔다 메모리로, 그래서 index.html을 실행하면 저장했던 메모리를 제공
        // 근데 webpack-dev-server는 한가지 기능이 있다. -> hot-leloading🟢, 소스코드에 변경점이 생기면 감지할 수 있다.
        // 그에 따라서 저장했던 결과물을 수정해준다🧐 이후 npm run dev하면 수정사항이 실시간으로 반영된다.
        // 한가지 의문이 드는데🧐
        // 핫 리로딩을 위해서 다운받았던 '@pmmmwh/react-refresh-webpack-plugin'이랑 'react-refresh/babel' 2개 없어도 리로딩 되는데 라고 생각할 수 있는데 
        // 그것은 "리로딩"이다 "핫 리로딩"이랑 다르다.🟢 리로딩은 새로고침이다. webpack-dev-server가 변경점을 탐지하면 새로고침은 원래 시켜준다. 저 2개가 없어도 !
        // 새로고침의 단점: 기존 데이터가 다 날아가고 새로운 화면을 띄우는 것, 핫 리로딩: 기존 데이터 유지하면서 화면 바꿔주는 것🟢
        // 기존 데이터를 유지하냐 안하냐가 중요한 차이
        hot: true,  
    }, // 개발용 서버, 프론트 개발 편의를 위한 서버 
};
// 웹팩은 webpack.config.js로 모든게 돌아감.
// 터미널에 webpack이란 명령어는 없다. 고로
// webpack이 명령어로 등록이 안되어 있을 떄 명령어로 등록을 해주거나 package.json에 scripts에 적어주는 방법이 있다.
// "scripts": {
//     "dev": "webpack"
//   }
// npm run dev하면 webpack이 실행.🟢
// 그리고 npx webpack하면 실행이 된다.🟢 
// webpack을 실행하면 dist에 app.js가 생겼다.
// entry를 읽어서 한 파일로 만들어준 것.