import React from 'react';
import {BrowserRouter, HashRouter, Route, Link}from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = memo(() => {

    return (
            <BrowserRouter>
            <div>
            <Link to="/game/response-check">반응속도체크</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또추첨기</Link>
            &nbsp;
            <Link to="/game/index">게임 매쳐</Link>
            </div> {/* 공통인 부분 (레이아웃) */}
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                </Switch>
            </div> {/* 바뀌는 부분 */}
            </BrowserRouter>
    );
});

export default Games;