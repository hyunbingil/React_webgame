## useReducer
: redux의 핵심부분이 이건데 이 부분을 그대로 들여왔음\
: react에서 redux와 비슷한 효과를 낼 수 있음.
> 그렇다고 redux를 대체할 순 없음.
>> 비동기적인 작업을 할 때는 redux 써야한다.
- 언제 사용?\
: state가 많아지면 관리가 힘들고, setState를 자식에게 넘겨줄 때 너무 많아서 복잡.\
: 사용하면 하나의 setState로 통일이 가능하기 때문에 사용한다.

``` jsx
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
    /* 이거 대신 써준거... 
    const [winnner, setWinner] = useState('');
    const [turn, setTurn] = useState('0');
    const [tableData, setTableDate] = useState([['','',''],['','',''],['','','']]);
    */
};

const reducer = (state, action) => {
    // state를 어떻게 바꿀지 적어준다.
};
// 배열의 reduce 함수처럼 뭔가를 줄인다는 뜻.
const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // 세번째 인자에 지연초기화까지 넣어주는데 복잡해질때만 사용.
    return (
        <>
        <Table />
        {winner && <div>{winner} 승🐱‍🏍</div>}
        </>
    )
};
```