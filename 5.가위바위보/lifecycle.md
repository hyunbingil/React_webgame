#### 가위바위보게임을 만들면서..
: setInterval, clearInterval과 React가 잘 어우러지게 하는 방법에 대해서 배운다.
> class보다는 hooks 만들 때 좀 복잡해지니 주의깊게 보세유

# lifecycle (컴포넌트의 일생...)
: RSP라는 컴포넌트가 client에서 불려와서 렌더링 되는데, 렌더링 되면 컴포넌트가 DOM에 딱 붙는 순간이 있다.\
: render 함수가 실행되면 react가 이 jsx를 DOM에다가 딱 붙여주는데\
: 그 순간에 특정한 동작을 해 줄 수 있음.
### Class일 때, lifecylce 순서 (잘 기억해 두기🔥🔥)
: constructor 부분, 메서드가 class에 갖다 붙음 -> render 첫 실행 -> (ref 실행) -> componentDidMount ->\
setStae/props 바뀔 때 -> shouldComponentUpdate -> render 실행 -> componentDidUpdate ->\
(부모 컴포넌트에 의해서 자식 컴포넌트인 내가 없어질 때 -> componentWillUnmount -> 소멸(화면에서 사라짐))

## 1. componentDidMount
: render가 성공적으로 처음 실행 되었다면 componentDidMount가 실행된다.\
: setState나 props 때문에 rendering이 다시 일어났다면(리렌더링) componentDidMount가 실행 X.\
: setState를 사용하고 싶은데, 어디서 써야할지 모를 경우에 사용.\
: 비동기 요청을 많이 함.

## 2. componentWillUnmount
: 컴포넌트가 제거 되는 경우가 있는데, 그 직전에 componentWillUnmount가 실행된다.\
> 부모 컴포넌트에 의해서 자식 컴포넌트인 내가 없어질 때
: componentDidMount에서 했던 작업들을 제거하는 용도.
> 보통은 componentDidMount와 componentWillUnmount가 짝이다.ㅋ.ㅋ.ㅋ.

: 비동기 요청의 정리를 많이 함.

## 3. componentDidUpdate
: re-rendering이 일어났다면 componentDidUpdate가 실행된다.

## 꿀팁
- setInterval\
: 일정시간동안 계속 반복작업해준다.
``` jsx
setInterval(() => {
    console.log('👸👸');}, 1000);
```
: 취소를 안해주면 계속 돌아간다.\
: 컴포넌트가 삭제된다고 해도 계속계속 돌아감!\
: 메모리 누수가 일어난다
> coreJS에서 자세하게 봤으니까 나중에 정리해둔거 보면서 복습하기.
``` jsx
clearInterval(this.interval);
```
: 그래서 componentDidMount에 setInterval 해주고 componentWillUnmount에서 clearInterval 해준다. 짝꿍💑

## 클로저 문제
: 비동기안에서 바깥에 있는 함수를 참조하면 문제가 생긴다.
``` jsx
componentDidMount() { 
    // const {imgCoord} = this.state; // 이 친구가 여기있으면 error!
    this.interval = setInterval(() => {
        const {imgCoord} = this.state; // 정상
        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });

        }
    }, )
}
```
## 꿀팁2
- setTimeout\
: 일정시간동안 멈췄다가 다시 시작해준다.
``` jsx
setTimeout(() => {
    this.interval = setInterval(this.changeHand, 100); // 1초 후에 다시 시작된다.
}, 1000);
```
## 꿀팁3 (리액트에서 많이 쓰는 패턴)
__고차함수__\
: 메서드안에 함수를 호출하는 부분을 바꿀 수 있다.
- 바꾸기 전
``` jsx
onClickBtn = (choice) => {
    // ...
}
<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>✊</button>
```
- 바꾸고 나서
``` jsx
onClickBtn = (choice) => () => {
    // ...
}
<button id="rock" className="btn" onClick={this.onClickBtn('바위')}>✊</button>
```
> 매개변수 있어도 가능 (e) => 이렇게 !!

### 질문
- setInterval에 시간을 짧게 하면 render와 엇갈리는 경우가 있나?\
: 큐처럼 차기 때문에 ㄴㄴ해.
- setState 여러개 연달아서하면 각각 렌더링 되는건가?\
: 한번에 모아서 렌더링한다.
> 그대신 setInterval 거쳐서 나오는 setState는 각각 렌더링 될 것.



## Hooks...
: Hooks는 lifecycle을 가지고 있지 않음.
> 문제가 된다.

