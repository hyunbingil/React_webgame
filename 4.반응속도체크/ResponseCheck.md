## React 조건문, 반복문
: render안에 return에는 조건문, 반복문 (if, for 등)을 사용하지 못함.
> jsx에서 for, if를 사용 X.
>> 쓸 수는 있는데 지저분해짐.
### 그럼 어떻게 사용하나?\
### 1. 삼항 연산자(조건부 연산자) 사용하기.
``` jsx
{this.state.result.length === 0
    ? null
    : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c / this.state.result.length}ms</div>}
```            
> false, undefined, null은 JSX에서 태그없음을 의미.

### 2. boolean 연산자 사용하기.
``` jsx
{this.state.result.length !== 0
    && <div>평균 시간 : {this.state.result.reduce((a, c) => a + c / this.state.result.length}ms</div>}
```
## setTimeout
1. 
``` jsx
timeout;
this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '🍀지금이라9🍀'
                })
            }, Math.floor(Math.random() * 1000) + 2000);
```
> timeout으로 setTimeout 받아서 초기화 시켜줘야 클릭 후에 안움직이고 기다린다구
2. 시작시간, 끝시간 정해주기\
: class안에 startTime, endTime 하나씩 받아주기!\
: 안의 값들이 변해도 rendering이 다시 안되기 때문에 ~.~
3. clearTimeout()
> call stack으로 넘어가서 실행이 되는데 setTimeout은 call stack으로 넘어가더라도 clearTimeout으로 취소 해줄 수 있다.

## Hooks로 만들기
### ref를 사용하기
: 시작시간, 끝시간 정해주기\
: ref는 DOM에 직접적으로 접근할 떄 사용했는데 Hooks에서는 this의 속성들을 ref로 표현한다고 보면 된다.
> ref가 추가적인 기능을 더 가지는 것.
``` jsx
const timeout = useRef(null);
const startTime = useRef();
const endTime = useRef();
```
: 그대신 ref를 사용할 때는 .current 꼭 붙여주기!
``` jsx
clearTimeout(timeout.current);
```

### state와 ref의 차이점
- useState\
: return 부분이 다시 실행된다.(rendering)
- useRef\
: 값을 바꿔도 return 부분이 다시 실행되지 않는다.\
: 그래서 값이 바뀌어도 rendering되지 않았으면 하는 것들은 useRef 사용해주기
> 불필요한 rendering을 막을 때 좋다.
>> ex) timeout이나 interval같은 것들은 ref 사용함.
#### 정리하자면... ref의 기능
1. DOM에 접근
2. 값이 바뀌어도 화면에는 영향을 미치고 싶지 않을 때 사용.(rendering X)
> 변하는 값을 잠깐 기록해둔다고 생각하면 된다.

## return안에 for, if 사용하기 (Hooks, Class 공통)
: jsx에서 중괄호를 치면 javascript 사용 가능\
-> 이것을 이용해서 사용한다.
: jsx안에서는 사용 못하지만 함수 안에서는 if 사용이 가능하니까\
-> 사용할 수 있음.
> 코드 지저분

: 단, 즉시 실행 함수로 만들어 줘야한다.
``` () => {} ```
1. if
``` jsx
{(() => {
    if (result.length === 0) {
        return null;
    } else {
        return <>
            <div>💡평균 시간 : {result.reduce((a, c) => a + c) / result.length} ms</div>
        </>
    }
})}
```
2. for
``` jsx
{(() => {
    const array = [];
    for (let i = 0; i < tries.length; i++) {
        array.push(<Try key = {`${i+1}차 시도 : ${v.try}`} tryInfo={v}/>);
    }
    return array;
})}
```
> 코드 지저분

### 코드 지저분한거 해결 방법
1. 함수로 빼기
2. 자식 컴포넌트로 만들기 (💡강추💡)

### 배열안에 jsx 문법 담아서 return
: 유효한 문법
> 많이 쓰이지는 않지만 알아두면 좋을 것 같아서 알려드립니다.
``` jsx
return [
    <div key="감">감</div>,
    <div key="복">복숭아</div>,
    <div key="귤">귤</div>
]
```
> 대신 key 넣어주기

: 껍데기 태그를 더 많이쓴다. <> </>

