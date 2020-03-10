웹 개발 목표로 리액트 배우는 사람들에게 이때까지 했던 내용들은 크게 도움이 되지 않을것같다.
> 예...?

게임 8개는 만들었는데 정작 웹사이트는 어떻게 만드는 지 모르겠다! 그런분들을 위해, 감을 잡아주기 위해 만들었습니다...

## single page application
: 리액트같은 프레임워크에서는 웹사이트를 구성할 때\
: page가 하나지만, 실제로는 page가 여러개가 보이는 눈속임을 한다.
> React Router
>> 어떻게 눈속임을 하는지, 이걸 토대로 웹사이트를 만들 수 있을지...
>>> React Router hooks api 사용 X.

## React Router
> 웹, 앱에서 사용 가능.
1. ``` npm i react-router``` 설치\
: 뼈대, 기본적인 것들만 모여있음.
2. ``` npm i react-router-dom``` 설치\
: 웹에서 사용하는 라이브러리, 설치해주어야 웹에서 사용가능.
> 우리는 react-router-dom 이것을 사용할 것. react-router-dom가 react-router는 필요로 해서 같이 깔아둔 것.
3. Router들 가져오기
- ``` import {BrowserRouter}from 'react-router-dom'; ```\
: 가장 많이 사용한다.
- ```import {HashRouter}from 'react-router-dom';```
- ```import {StaticRouter}from 'react-router-dom';```\
: 서버쪽에서 사용한다.

### BrowserRouter
1. Router로 감싸준다.
- 컴포넌트의 최상위를 Router로 감싸준다.
``` jsx
const Games = memo(() => {

    return (
        <BrowserRouter>
            <div>
            </div>
        </BrowserRouter>

    );
});
```
- Hot 컴포넌트를 Router로 감싸줘도 된다.
``` jsx
ReactDom.render(<BrowserRouter><Hot /></BrowserRouter>, document.querySelector('#root'));
```
2. Route 를 가져와서 페이지를 만든다.
``` jsx
<BrowserRouter>
    <div>
        <Route path="/number-baseball" component={NumberBaseball} /> {/* 주소를 임의로 지정*/}
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} />
    </div>
</BrowserRouter>
```

: 리액트 라우터가 여러개의 페이지를 동시에 rendering 해주기 때문에 하나하나 안넣어줘도 가상의 페이지 주소(```path="/number-baseball"```)를 만들어서 거기에 각각 컴포넌트들을 연결해준것.

## React Router의 React에서의 역할
## React Router의 웹사이트 개발시의 역할
## React와 React Router를 연동하는 방법
## React Router의 간단한 기능들