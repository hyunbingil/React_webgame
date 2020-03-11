import React, { Component } from 'react';
import ResponseCheck from '../4.반응속도체크/ResponseCheck';
import RSP from '../5.가위바위보/RSP';
import Lotto from '../6.로또/Lotto';

export default class GameMatcher extends Component {
    render() {
        if (this.props.match.params.name === 'response-check') {
            return <ResponseCheck />
        } else if (this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP />
        } else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto />
        }
        return (
            <div>
                일치하는 게임 X.
            </div>
        );
    }
}