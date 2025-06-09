// 매개변수에 들어올 때 부터 구조분해
// 속성이 ctrl + space를 했을 때 뜨기 때문에 매개변수에 들어올 때 부터 구조분해를 해서 넣어주어야 한다.
// 만일 값이 들어오지 않는다면 {}를 사용했는지 확인해야한다.
function Props2({ a, b }) {

    return <div>
        <p>a - {a}</p>
        <p>b - {b}</p>
    </div>
    
}

export default Props2;