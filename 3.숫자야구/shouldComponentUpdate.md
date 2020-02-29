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
