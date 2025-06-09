function Props1(props) {

    // 비구조할당(구조분해)
    // Props2로 넘어가기
    console.log(props);
    const { a, b } = props;


    return <div>
        <p>a - {a}</p>
        <p>b - {b}</p>
    </div>
    
}

export default Props1;