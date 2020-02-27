const React = require('react');
const { Component } = React;
// npm에서 리액트를 불러와줘야한다.
// 분리할 때 쓰이는 애들을 꼭 다시 불러와야한다.

class WordRelay extends Component {
    state = {
        word: "기러기",
        value: '',
        result:'',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        }
        else {
            this.setState({
                result: '땡',
                value: '',
            });
            this.input.focus();
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };
    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button>🕵️</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;
// 노드의 모듈 시스템
// 파일 분리할 때 가져와야 할 것들 1,3,14번째 줄
