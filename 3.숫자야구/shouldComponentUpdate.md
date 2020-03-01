## Props를 사용하게되면서 생기는 문제점
1. 렌더링\
: 렌더링이 자주 일어나서 성능이 안좋아지는 문제가 있음.
- 찾아내는 방법
- 해결하는 방법

## 꿀팁
1. 배포모드와 개발모드\
: chrome 확장 프로그램이 파랗게, 빨갛게 보인다.
> 배포모드는 소스 코드가 압축 및 최적화 되어있음.
2. 렌더가 될때는 언제?\
: state나 props가 바뀌었을 때.
> 나중에 다시 복습할 때 앞에 정리해둔거랑 같이 합쳐서 정리해야할듯.
3. react 개발도구\
: 에서 톱니바퀴 누르고 highlight updates눌리면 render 될 때 마다 컴포넌트가 반짝거린다.
> rendering이 빠른 시간으로 많이 일어나면 빨강, 초록으로 나타남.
>> 파란색이 괜찮은거.

: 다른 컴포넌트도 다시 렌더링 되는 경우가 발생하는데 그게 쌓이면 성능에 문제가 생김.
> ex) NumberBaseball에서 input에 값 입력하는데 tries가 반짝거린다.
>> 애꿎은 tries가 왜 렌더링 되는건가

이것을 해결하는 방법을 알려드리겠습니다.
↓↓↓↓↓↓↓↓↓↓↓↓↓

## 클래스에서
## shouldComponentUpdate
: 리액트가 생각보다 똑똑하진 않아서 setState만 호출해도 (값을 안바꿔줘도) 렌더링이 다시 일어난다.\
: 그래서 이 때 리액트에서 지원하는 메서드인 shouldComponentUpdate를 사용.\
: 어떤 경우에 rendering을 다시 해주어야 할지 적어줘야한다.
``` jsx
shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
        return true;
    }
    return false;
}
```

간단하게 하고 싶다면
↓↓↓↓↓↓↓↓↓↓↓↓↓

## Component를 PureComponent로 바꾼다.
> shouldComponentUpdate를 알아서 구현한 컴포넌트
- 어떻게 작동하나?\
: 여러가지 state가 있으면 state안에 값들이 바뀌는지 안바뀌는지 자동으로 체크해준다.
- 단점?\
: 객체나 배열같은 좀 복잡한 구조(참조 관계)를 판단할 때는 좀 어려워해한다.
> ex) 그냥 배열에다가 값 push해도 같은 배열이라고 나오기 때문에 알아차리지 못한다.
- __해결방법?__\
1. 배열\
: 기존 array를 펼쳐주고 새로운 값을 추가해야한다.
``` jsx
this.setState({
    array: [...this.state.array, 1],
});
```
2. 객체\
: 기존 객체도 펼쳐주는게 좋다.
``` jsx
this.setState({
    object: {...this.state.object},
});
```
> {a: 1}에서 setState {a: 1}을 할 때 새로 렌더링하므로 state에 객체 구조를 안 쓰는게 좋다.(흐음 무슨말인지 잘 모르겠는데 내가 이해한게 맞는거 같음,,)
>> 객체 안에 배열안에 객체안에 배열 같이 복잡하게 state를 두지 말기.

: 컴포넌트를 잘게 쪼개서 purecomponent 적용해주는게 좋다.
> 컴포넌트가 복잡해지면 purecomponent가 안될 경우가 있으니 purecomponent만 사용해야지 ^^ 이런 생각하면 앙대요.

## Hooks에서
## React.memo
: React.memo 아니면 구조분해해서 memo !
``` jsx
import React, { Component, memo } from 'react';
// memo 추가하고
const Try = memo(({ tryInfo })) => { // props인데 { tryInfo }로 구조분해가 가능.
    return (
        <li>
            <div>{ tryInfo.try }</div>
            <div>{ tryInfo.result }</div>
        </li>
    )
}; // props 사용하면 props.tryInfo.try로 바꿔주기

export default Try;
```

## Class에서 Hooks와 비슷하게 Ref를 만드는 방법
## React.createRef
``` jsx
import React, { Component, createRef } from 'react';

inputRef = createRef();
// 해주면
<input ref={this.inputRef} //...
/> 
// 이렇게 넣어주고 (focus 줄 부분에)
this.inputRef.current.focus();
// 프로그램 실행 후 (?)에 포커스 줄 때 넣어주기
// current 추가
```
- 아니 그러면 처음부터 이렇게 알려주지 왜 함수 사용하는 걸 알려준거야?!\
: 함수안에 console.log 같은 미세한 작업할 때 사용되기 때문에 알아두는게 좋답니다 ^-^

## 꿀팁
1. 함수안에 다른 함수를 넣는게 가능한 자바스크립트! 와!
2. render안에 왜 setState를 쓰면 안될까?\
: 당연히 setState를 하면 render가 실행되는데 render 실행하면 또 setState 실행되면 무한 반복이니까
> 문제가 생긴다.
3. Props는 부모가 바꿔줘야하지 자식에서 바꿀 수 X.\
- 이유?\
props가 부모에서 자식한테 물려준건데 자식이 props를 바꿔버리면 부모의 props가 뜻하지 않게 바뀌어버린다.
> 그래서 이게 문제가 된다.
``` jsx
const Try = memo(({ tryInfo }) => {
    tryInfo.try = 'hello';
    // props인 tryInfo를 자식에서 바꾸기 불가능.
    // ...
});
```
- 바꾸어야 할 상황이 온다면 어떻게 해야하나?\
: props를 state안에 넣어주고 state를 바꾸면 된다.\
1) Hooks
``` jsx
const Try = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    const onclick = () => {
        setResult('1');
    };
    // props인 tryInfo를 자식에서 바꾸기 불가능.
    // ...
});
```
2) Class
``` jsx
class Try extends PureComponent {
    state = {
        result: this.props.result,
        try: this.props.try,
    };
}
```

## Class에서 Constructor 사용해야 할 경우
: 미세한 컨트롤 할 때(다른 동작 할 때)
> 활용도가 엄청 많다.
``` jsx
class Try extends PureComponent {
    constructor(props) {
        super(props);
        const filtered = this.props.filter(() => {

        });
    };
};
```
> constructor, ref 함수, setState 함수.

## context
: 컴포넌트 상속관계에서 A->B->C->D->E 에서 A->E로 props를 넘겨주고 싶은데 쓸데없이 B,C,D가 중간에 끼게 된다.
- 이 방식의 문제점\
: props를 B,C,D에서 다 받아야하고 쓸데없이 rendering이 되는 경우가 발생한다.
- 해결방법\
: A->E로 바로 전달해주면된다.\
=> 그게 바로 context이다.
> 이걸 응용한게 redux.
>> props의 진화형이 context라고 보면 된다.

4강 : ref의 응용법을 배움
5장 : useEffect를 배우는데 알고 있어야 다음으로 넘어갈 수 있음.