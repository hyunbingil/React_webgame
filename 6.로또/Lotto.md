### Hooks랑 함수 컴포넌트 비교
: Hooks는 ```import React, { useState, useRef } from 'react';``` 필요

## 꿀팁
1. CSS 사용\
: Styled Components 사용하기
> 나중에 찾아보고 해보기
2. let과 클로저\
: let을 사용하면 클로저 문제 생기지 않는다.
3. setTimeout 같은것들 삭제된다면\
: 원하지 않았는데 (부모에 의해서) 컴포넌트가 사라질 경우가 있다!\
: 꼭 clear 해주어야 한다.
> 안하면,, 메모리 문제...와 의도하지 않은 에러들이 생긴다,..
>> componentWillUnmount 사용해서 clear 해주기

## componentDidUpdate
: 업데이트 하고 싶은 상황을 잘 처리해주어야한다.
> 조건문 사용해서 만들어주기
>> 안하면 state 변동이 있을 때 마다 실행된다.
``` jsx
componentDidUpdate(prevProps, prevState){
    // ...
}
```
> 부모에게 받은 Props가 바뀔 수도 있기 때문에 prevProps 있는 것.

## useEffect
- 배열이 빈배열이면?\
: componentDidMount와 같음
- 배열에 요소가 있으면?\
: componentDidMount랑 componentDidUpdate 둘 다 수행.
- useEffect안 return 부분\
: componentWillUnmount

## useMemo
: Hooks 특성상 함수 컴포넌트 전체가 재실행되는데, 그 안에 있는 다른 함수(ex)getWinNumbers())같은 것들도 계속 재실행(재호출)된다.\
: 이것을 방지하기 위해서 useMemo가 등장했다.\
: (복잡한)함수를 실행해서 return 값(함수 결과값)을 기억해둔다.
> useRef : 일반 값을 기억.
``` jsx
const lottolNumbers = useMemo(() => getWinNumbers(), []);
```
> 두번째 인자인 배열에 요소가 바뀌면 useMemo가 다시 실행된다.

## 꿀팁
: Hooks 처음할 때 추천드리는 방법은, 함수가 있으면 함수 안에는 console.log 하나씩 넣어두고, 내가 필요할 때만 실행되는게 맞는지 봐야한다.

## useCallback
: 함수 자체를 기억함.\
: 함수 컴포넌트가 재실행되도 새로 생성되지 않음.
> useMemo : 함수의 리턴값을 기억. (헷갈 ㄴㄴ)
- 아 그러면 모든 함수를 useCallback으로 감싸면 이득이네?\
: ㄴㄴ 기억을 너무 잘해서 새로운 상태의 ex)winNumbers가 기억되는게 아니라 맨 처음 winNumbers가 기억된다.
> useCallback 적용한 함수 안에서..!
``` jsx
 const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
},[]);
```
- 해결방법?\
: []안에 바뀌는 state를 넣어줘야한다.
> 그니까 state 사용할 때 조심하기...
``` jsx
 const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
},[winNumbers]);
```
### useCallback을 필수로 적용해야할 때
: 자식 컴포넌트에 props로 함수를 넘길때.\
: useCallback 사용을 하지 않으면 계속 새로운 함수가 만들어진다.\
: 자식 컴포넌트 입장에서는 부모로부터 받은 props가 계속 바뀐다고 생각해서\
=> 계속 rendering 된다. (함수는 변함이 없는데...)

## Hooks 시리즈는 순서가 매우 중요.
> useRef, useState, useEffect, useMemo, useCallback
: 바뀌면 안된다.
``` jsx
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);
const [winBalls, setWinBalls] = useState([]);
if(조건){
    const [bonus, setBonus] = useState(null);
}
const [redo, setRedo] = useState(false);
```
> 조건에 따라 순서가 바뀐다.

: 그래서 조건문 안에 절대 넣으면 X, 함수나 반복문 안에도 웬만하면 넣지 X.\
: 시리즈안에 또 시리즈 넣기도 X\
=> 실행 순서가 정확하게 어떻게 되는지 모르기 때문에,,,
``` jsx
useEffect(()=> {
    useState();
},[]);
```
> ❌

### componentDidUpdate 일 때만 useEffect를 사용할 수 없을까?
: 패턴처럼 알아두기!\
: useEffect가 componentDidMount 때 실행되긴한다. 그대신 그때 아무것도 안하면,\
: 비슷한 효과를 낼 수 있다.
``` jsx
const mounted = useRef(false);
useEeffect(()=> {
    if(!mounted.current) {
        mounted.current = true;
    } else{
        //componentDidUpdate 때 할 것들 적기!
    }
}, [바뀌는 값]);
```
> 꼼수 같은 것.
>> componentDidUpdate만 하는 효과를 낼 수 있음.




