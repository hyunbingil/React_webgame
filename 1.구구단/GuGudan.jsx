// 이 파일은 원래 2.끝말잇기에서 실행하던 파일이니 다시 돌리고 싶으면 2.끝말잇기로 옮겨서 돌리기
// 이 폴더에 다시 깔기 귀찮음.(용량도 없음)

const React = require('react'); // script로 안해주고 node require 이용해서 한다.
const { useState, useRef } = React;
const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    // 초기값 넣어주기 (setState를 하나하나씩 분리해준다.)
    // 구구단 컴포넌트안에 꼭 넣어줘야한다.
    // 이게 바로 구조분해 문법(구조 분해 할당)이다..!
    const inputRef = useRef();
    // ref 사용하려면...!

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult(`딩동댕!`);
            // prevResult 사용하는 경우에는 함수형으로 바꿔줄 수 있음
            /* setResult((PrevResult) => {
                return `딩동댕!`
            }) 
            counter 같은 거 할 때 비동기 문제 생기지 X*/
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue(''); // 비동기인 이유 set할때마다 rendering 하는게 아니라 set을 다 모아서 한꺼번에 rendering 해주기 때문에.!
            // 동기였으면 4번 일어나겠죠
            inputRef.current.focus(); // document.querySelector(input).focus()랑 같은 역할.
        }
        else {
            setResult(`땡!`);
            setValue('');
            inputRef.current.focus(); // DOM에 접근
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }
    // value 값 변경하기
    // gugudan_class.html 에서 onChange = (e) => {this.setState({ value: e.target.value });};와 같은 역할.
    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onsubmit={onSubmitForm}>
                <input ref = {inputRef} onChange = {onChangeInput} value = {value} />
                <button>입력!</button>
            </form>
            <div id = "result">{result}</div>    
        </>
    )
    }
module.exports = GuGudan;