const React = require('react');
const { useState, useRef } = React;
// npm에서 리액트를 불러와줘야한다.
// 분리할 때 쓰이는 애들을 꼭 다시 불러와야한다.

const WordRelay = () => {
    const [word, setWord] = useState("기러기");
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus;
        }
        else {
            setResult('땡');
            setValue('');
            inputRef.current.focus;
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button>🕵️</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;
