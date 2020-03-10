### useReducer
state가 여러개일때, state를 하나로 묶어주고\
state를 바꿀 때 action을 dispatch해서 바꾸는 것.
> redux는 동기적으로 state가 바뀌고 Reducer는 비동기적으로 바뀐다.

## Context API
### 부모 컴포넌트
1. createContext 추가하기
``` jsx
import {createContext} from 'react';
```
2. createContext 받아오기 + 초기값 설정
``` jsx
const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});
```
3. context api에서 접근할 수 있는 데이터들에 접근하고 싶은 컴포넌트를 context api의 provider로 묶어줘야한다.
4. TableContext.Provider로 감싸주면 그 밑에 있는 컴포넌트에서 데이터에 접근할 수 있음
5. 자식 컴포넌트에 바로 전달해 줄 데이터는 value안에 넣는다.
``` jsx
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TableContext.Provider value={{tableData: state.tableData, dispatch}}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};
```
6. createContext를 export 한다.
``` jsx
export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});
```
### 자식 컴포넌트
1. useContext 추가하기
``` jsx
import {useContext} from 'react';
```
2. useContext 받아오기
``` jsx
const {dispatch} = useContext(TableContext);
```

## 꿀팁
- context api가 성능최적화하기가 정말 힘듦.
ex) MineSearch가 새로 rerendering 될 때 마다 ```<TableContext.Provider value={{tableData: state.tableData, dispatch}}>```에서 value 안에 객체가 새로 생긴다.
> context api를 사용하는 자식 컴포넌트 들도 계속 rerendering 되기 때문에 성능적으로 굉장히 좋지 않다.

: 그래서 useMemo로 value 값들은 caching을 해주어야한다. (중요)
- useMemo로 객체값을 기억해준다.
``` jsx
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({tableData: state.tableData, dispatch}),[state.tableData])

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};
```
> 성능 저하가 덜 일어난다.
>> dispatch는 항상 같게 유지되기 때문에 바뀌는 목록에 안적어주어도 된다. ([]여기 안에)

## 꿀꿀팁
1. 마우스 왼쪽/오른쪽 클릭
``` jsx
<td
      style={getTdStyle(data)}
      onClick={onClickTd} // 왼쪽
      onContextMenu={onRightClickTd} // 오른쪽
    >{getTdText(data)}</td>
```
> 오른쪽 클릭시 메뉴 안나오게 하려면 ```e.preventDefault();``` 사용하기

2. 뜬금없이 vs code 같은 단어 선택 ctrl + d

## 지뢰 찾기 시 눌렀을 때 한방에 나오게 하려면...
> 재귀를 사용해야한다.
>> 재귀 잘못다루면 callstack 터지니까 조심..!
~> 그래서 한 번 연칸은 cashing 해주어야한다.

- 위, 아래가 없을 경우는 만들어 줘야한다.
- 왜 왼쪽, 오른쪽이 없는 경우는 신경안쓰나?\
: 왼쪽, 오른쪽이 없을 경우는 알아서 undefined가 되어서 filter를 적용시켰을 때 사라지기 때문이다.

## useContext를 사용하면
: 로직(?) 전체가 한번은 리렌더링 된다...\
: 근데 return 부분이 계속 리렌더링 되는건 문제가 되기 때문에 해결해주어야함.\
1. useMemo 사용하기
``` jsx
return useMemo(() => (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
), [tableData[rowIndex][cellIndex]]);
```
2. 컴포넌트를 나눠서 memo 사용하기
``` jsx
// 위에는
return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
// 작성하고
const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});
```
