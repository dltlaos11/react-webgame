// webpack-config.js 기본적으로 이 이름이여야 한다. 다른 이름인 경우 webpack에 옵션을 따로 붙여줘야 함.
const path = require('path'); // node path 모듈 사용
const webpack = require('webpack'); // 하늘에서 webpack이 떨어지진 않는다 !! 
 
module.exports = {
    mode: 'development', // 개발 시 production으로 바꾸고
    devtool: 'eval', // production일 때는 hidden-source-map 다른 것 도 있긴하다.
    resolve: {
        extensions: ['.js', '.jsx'] 
    }, // 확장자 생략

    entry: {
        app: './client',
    },
    // @babel/preset-env와 plugins🟢
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader', // jsx문법이나 최신문법을  옛날 브라우저에서 지원을 안할 떄 babel-loader로 브라우저에 맞게 설정을 맞춰준다.
            options: {
                presets: [ // presets에 대한 설정🟢 
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR','last 2 chrome version'], 
                            // 지원하고자 하는 브라우저에만 맞춰서 설정 가능, browserslist 사이트 참고 !!  😎
                        }, // preset-env는 자동으로 옛날 브라우저 지원해주는 것, 더 구체적으로 명시 가능
                        debug: true, // 개발용에서..
                    }], // plugins 설정하고 싶다면 배열로 만든 뒤 첫번째 요소에 preset이름 적고 두번째 요소에 설정을 적는 것
                    '@babel/preset-react'
                ],
                plugins: [], // preset만 해보고 error가 난다면 error에서 말하는 plugins까지 같이 해보는 것
            } // 바벨에 대한 설정
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }), // 실무에서 Plugin에 한 10개정도 껴있단다!
        // module: {rules:[{ }] }가 Loader인데 이 Loader options에 debug: true를 넣어주는 것

        // plugins보는 법🟢
        // 당황하지 말고 🧐 Plugin들 빼보고 rules도 최대한 많이 뺴서 에러메세지 보면서 필요한 rules 하나씩 껴가면서 알아보는게 좋다 !!🟢 
    ], // plugin🟢: 확장 프로그램 !! webpack에서 modules이랑 rules 말고 추가적으로 뭔가를 더 하고싶으면 plugin을 붙인다 !
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist') // dist folder에 app.js가 생기는 것 확인 가능
    }
};
// 순서대로 생각하면 좋다. entry 있고 module: {rules:[{ }], }, output 존재.
// 🟢웹팩은 설정의 연속 : entry에 있는 파일들에 babel-loader를 적용하는 것 그리고 babel-loader에 대한 options이 있다
// 그런데 babel-loader안에서 babel-preset-env에 대한 option이 또 있을 수 있다.
// plugins들의 모음이 presets이다. @babel/preset-env이 하나처럼 보여도 그 안에는 수십개의 plugins들이 합쳐져 있다.
// 수십개의 plugins이다 보니 설정할게 많다.  

// 복잡한 webpack설정 깔끔하게 만들기 🟢 
// webpack 공시문서에서 entry: 시작파일, output: 결과가 어떻게 될지, loades: module이다. Plugins: 추가적으로 하고싶은 작업, Mode: 'development' or 'production'
// code작성할 때 entry, module, plugins, output 코드 작성할 때 이 순서대로 작성하기 ! 
// entry에 있는 파일에 module 적용하고 module 다 적용한 후에 추가적으로 plugin 한번 더 적용하고 output으로 결과 도출. 

// 응답 메시지

// 지원하는 브라우저🟢 
// Using targets:
// {
//   "chrome": "102",
//   "edge": "102",
//   "ios": "15.5",
//   "samsung": "17"
// }

// presets: plugins들 모음, 알아서 plugins 적용을 해서 최신문법을 옛 브라우저에서도 돌아가는 문법으로 알아서 바꿔준다.🟢
// Using plugins:
//   proposal-class-static-block { ios, samsung }
//   proposal-private-property-in-object { samsung }
//   syntax-class-properties
//   syntax-numeric-separator
//   syntax-nullish-coalescing-operator
//   proposal-optional-chaining { samsung }
//   syntax-json-strings
//   syntax-optional-catch-binding
//   transform-parameters { ios }
//   syntax-async-generators
//   syntax-object-rest-spread
//   proposal-export-namespace-from { ios }
//   syntax-dynamic-import
//   syntax-top-level-await

// jsx는 바벨에 의존적, cra에서 빌드는 웹팩으로 되는 것🟢🟢