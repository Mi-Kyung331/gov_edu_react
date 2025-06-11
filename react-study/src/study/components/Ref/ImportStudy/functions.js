// 기본값은 두개가 될 수 없기 때문에 default는 하나밖에 쓰지 못한다. 
// 때문에 하나만 정의를 할 수 있다.
// default는 중괄호를 사용하지 않는다.
// 하지만 나머지는 중괄호를 사용한다.

export default function fx1() {
    return "fx1입니다.";
    // 함수
}

export function fx2() {
    return "fx2입니다.";
    // 함수
}

export function fx3() {
    return "fx3입니다.";
    // 함수
}

// 변수, 혹은 상수 class도 export가 가능하다.
export let data = 10;