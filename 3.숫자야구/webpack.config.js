const path = require('path');
const webpack = require('webpack'); // 플러그인 설정 하기 위해서 불러와야함.

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스에서는 production으로 바꾸면 된다.
    devtool: 'eval', //빠르게 하겠다.
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // 제일 중요한 애들
    entry: {
        app: ['./client'], // 배열로 나타내주기
        // client.jsx가 WordRelay.jsx를 불러오기 때문에 따로 적을 필요 X.
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/, // 정규표현식 : js 파일이랑 jsx 파일을 이 rules를 적용하겠다.
            loader: 'babel-loader',
            options: {
                presets: [
                    //[
                    '@babel/preset-env'/* , {
                        targets: {
                            browsers: ['last 2 chrome versions'],
                        },
                        debug: true,
                    }],*/
                    , '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            },
        }],
    },
    /* plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true}),
    ], */
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js', // entry안에 있는 친구들을 합쳐서 이 친구로 만들어준다.
        publicPath: '/dist/',
        /*가상 경로라고 생각하기. node를 안다면?
        미래의 나야 화이팅!
        appuse('/dist', express.static(__dirname, 'dist'))*/
        // 지금 있는 곳 안에 들어있는 폴더인 dist안에 있는 파일로 server 돌려서 hot 실행하려면
        // 지정해줘야한다. (대신 적고 나면 새로고침 해주기 : npm run dev)
    }, // 출력
};
// entry에서 받아와서 모듈을 적용하고 output으로 뺀다.
//웹팩은 webpack.config.js에서 모든게 돌아간다.