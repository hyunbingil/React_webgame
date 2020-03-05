### Hooks랑 함수 컴포넌트 비교
: Hooks는 ```import React, { useState, useRef } from 'react';``` 필요

## 꿀팁
1. CSS 사용\
: Styled Components 사용하기
> 나중에 찾아보고 해보기
2. let과 클로저\
: let을 사용하면 클로저 문제 생기지 않는다.
3. setTimeout 같은것들 삭제된다면\
: 원하지 않았는데 (부모에 의해서) 컴포넌트가 사라질 경우가 있다!\
: 꼭 clear 해주어야 한다.
> 안하면,, 메모리 문제...와 의도하지 않은 에러들이 생긴다,..
>> componentWillUnmount 사용해서 clear 해주기
