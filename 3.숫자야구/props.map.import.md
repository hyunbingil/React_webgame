## require
: node의 모듈 시스템\
1. 
- 내가 만든 jsx 파일에서 class를 export 해주면
``` jsx
class NumberBaseball {

}
module.exports = NumberBaseball;
```
- 다른파일에서 (client.jsx에서) 가져다 쓸 수 있음
``` jsx
const NumberBaseball = require('./NumberBaseball');
```
2. 남이 만든 스크립트도 가져다 쓸 수 있음.
``` jsx
const React = require('react');
```
3. 구조분해 문법으로 되어있는 친구
: export 되는 게 객체나 배열이면 구조 분해할 수 있음.
``` const { hot } = require('react-hot-loader/root');```

## import
: ES 2015의 모듈
1. 구조분해 문법으로 되어있는 친구
> 변수나 값같은 것들 export 따로 해줄 수 있어서.. 
``` jsx
export const hello = 'hello'; // import { hello }
export default NumberBaseball; // import NumberBaseball;
```
> default는 한번만 사용 가능

## require와 import의 호환
``` jsx
const React = require('react');
const ReactDom = require('react-dom');
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
import React from 'react';
import ReactDom from 'react-dom';
```

### 노드의 모듈 vs ES 2015의 모듈
: 두개가 다른데 일부분은 호환이 가능.
- 노드의 모듈 문법 : common JS
``` jsx
const React = require('react');
const { Component } = React;

class NumberBaseball extends Component {

}

exports.hello = 'hello';
module.exports = NumberBaseball;
```
- ES 2015의 모듈 문법
``` jsx
import React, { Component } from 'react';

class NumberBaseball extends Component {

}

export const hello = 'hello';
export default NumberBaseball;
```

: 실제로는 export default랑 module.exports는 다름\
> 근데 호환은 된다.

: node에서는 노드의 모듈 문법만 지원한다.!
> 근데 babel이 import도 require로 바꿔준다..
>> 대단한 녀석.

### node에서는 require 쓰고 react에서는 import랑 export 사용한다.
> webpack.config.js에 import 쓰면 에러 -> node가 돌려서

## map이 뭘까?
: react에서의 반복문을 쓰는 방법.\
: react가 key를 보고 같은 컴포넌트인지 아닌지 판단하기 때문에\
~> key를 꼭 적어주기! 고유한 값으로 적어주기!
> 중복 X.
``` jsx
['안', '녕', '하', '신', '가'].map((v) => {
    return (
        <li key = {v.hello}>{v}</li>
    );
}
```
> 총 5번 실행
>> 안에 내용들을 배열로 만들어서 반복해주면 된다.
- 쌍으로 이루어져 있다면?
1. 이차원 배열
``` jsx
[['안','1'],
 ['녕', '2'],
 ['하', '3'],
 ['신', '4'],
 ['가', '5']].map((v) => {
    return (
        <li key = {v.hello}>{v[0]} - {v[1]}</li>
    );
}
```
: 이 배열 자체가 v가 된다.

2. 객체
``` jsx
[{hello: '안', number: '1'},
 {hello: '녕', number: '2'},
 {hello: '하', number: '3'},
 {hello: '신', number: '4'},
 {hello: '가', number: '5'}].map((v) => {
    return (
        <li key = {v.hello}>{v.hello} - {v.number}</li>
    );
}
```
: 객체 한개(한줄) 자체가 v가 된다

- key 설정
``` jsx
['안', '녕', '하', '신', '가'].map((v, i) => {
    return ( // i는 몇번째 돌아가는가? 0,1,2,3,4
        <li key = {i}>{v}</li>
    );
}
```
: key에 고유한 값 넣으라고 했지? 그러면 i는 고유하니까 key에 다가 넣어야지^^?
> 안됩니다유.

: key 넣는 이유 중에 하나가 성능 최적화인데, 성능 최적화할 때 문제가 생겨유.
> 요소가 추가만 되는 배열인 경우에는 i를 써도 되긴 한다.
>> but 삭제 X.
>>> react에서 key를 기준으로 element를 추가하거나 수정, 삭제를 판단하기 때문에 배열의 순서가 바뀌면 문제가 생긴다.

## 하지만 이런식으로 하면 가독성이 떨어지기 때문에
1. map 앞에 들어가는 배열을 밖으로 뺀다.
``` jsx
hello = [{hello: '안', number: '1'},
 {hello: '녕', number: '2'},
 {hello: '하', number: '3'},
 {hello: '신', number: '4'},
 {hello: '가', number: '5'}];
// 밖에서 배열 선언해주고 원래 있던 곳에는
this.hello.map((v) => {
    return (
        <li key = {v.hello}>{v.hello} - {v.number}</li>
    );
}
```
2. return 안에 값이 많아진다면 따로 파일(컴포넌트)로 뺄 수가 있다.\
: 파일로 빼면\
원래 있던 곳 ```import Try from './Try';``` 해주기 !
> 재사용성, 성능 최적화할 때 좋음.

: 그런데, 원래 있던 곳에서 사용하던 ex) v, i 같은 친구들을 다른 파일에서 사용하지 못하는데..?\
그래서 준비했습니다.
↓↓↓↓↓↓↓↓↓↓↓↓
## Props
> html 속성(attributes)이랑 비슷하지만 부르는 명칭이 다름.
1. 가져 올 연결 고리 생성하기
``` jsx
{[].map((v, i) => {
    return (
    <Try value={v} index={i}/>
    );

})}
```
2. 다른 컴포넌트에서 받아오기
``` jsx
<b>{this.props.value.fruit}</b> - {this.props.index}
```
> maps를 사용하면 번거롭고 가독성이 떨어지기 때문에 나온 친구.

: props를 이용하면 부모, 자식 관계가 형성이 된다.
> 부모 컴포넌트가 자식 컴포넌트에게 props를 물려준다.

- 그런데 만약 조부모(?) 컴포넌트가 자식 컴포넌트에게 물려 줄 일이 발생하면?
> redux, context, 모벡스(?) 같은 것들이 사용된다.(은행 역할)
>> 상속 관계가 복잡해질때

## 꿀팁
1. 초반에는 컴포넌트로 쪼개는게 익숙하지 않아서 힘들다.\
그래서 일단 한 곳에다가(큰 컴포넌트에다가) 다 적고\
보통은 반복문 단위로 끊어주니까\
끊어서 새로운 컴포넌트로 옮기기(작은 컴포넌트로)\
이렇게 하다보면 된다.

2. Props에서 리액트의 문제, 복잡함이 시작된다.

3. 리액트(.jsx)에서 주석 사용\
```{/* */}```
> 지금까지 // 이거 사용했는데 되던데 뭐지 ...

4. 화살표 함수 안에서의 this\
: 리액트 (안에 state도 들어있고 fruits도 들어있고 그런당)

## 리액트에서의 배열
1. 배열에서 push 사용하면 안된다.\
: 새로운 배열이 만들어지는게 아니라 원래 배열에 값이 들어가는 것이기 때문에\
react에서는 변화 감지를 못한다.
> 리액트가 rendering 할 때 = 예전 state랑 현재 state랑 다르면

__그러면 어떻게 해야하나?__
2. 새로운 배열안에 기존 배열을 펴주고(spread) 넣어준다.
``` jsx
const array = [1];
const array2 = [...array, 2];

array === array2 // false
```
> 참조가 바뀌어야하기 때문에...

## 꿀팁2
1. 클래스로 만들 때 this.state가 번거롭다면?\
: 비구조화 할당해주면 된다.
``` const { result, value, tries} = this.state; ```
> 그러면 hooks 처럼 간단하게 만들 수 있음

2. 함수를 바깥에 뺄 때 / 안 뺄 때\
: this를 사용하지 않으면, 그리고 다른 곳에서 사용할 수도 있음 / this를 사용하면
> numberbaseball에서는 getnumbers()

## map을 더 자세히
1. 배열을 1:1로 짝 짓는게 map (기본적으로)\
``` [1,2,3].map((v)=> v*2) ```
2. JSX로 받으면 배열을 JSX로 받아서 화면에 표시

> 함수형 프로그래밍에서 굉장히 중요한 친구다.

## 꿀팁3
1. 옛날 state로 현재 state을 만들 때는 함수형 setState 사용하기
``` jsx
this.setState((prevState) => {
    return {
        result: '홈런!',
        tries: [...prevState.tries, { try: value, result: '홈런!'}],
    }
})
```
> setState 연달아 사용할 때 문제가 안생김.