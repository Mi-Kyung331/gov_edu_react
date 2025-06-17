/** @jsxImportSource @emotion/react */
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

/**
    유효성 검사(Validation Check)
    : 사용자가 입력한 데이터가 정해진 규칙이나 형식에 맞는지 확인하는 과정
 */

// 반복되고 있는 코드 줄이기 (컴포넌트 분리)
function useSignInAndUpInput({ type, name, placeholder, value, valid}) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    };
    const [ inputValue, setInputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle);

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnBlur = (e) => {
        if (isEmpty(e.target.value)) {
            setStatus(STATUS.idle);
            return;
        }

        if (valid.enabled) {
            setStatus(valid.regex.test(e.target.value) ? STATUS.success : STATUS.error);
            return;
        }
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        inputValue,
        element: <SignInAndUpInput 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={inputValue}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.message} />
    }
}

function SignInAndUpInput({type, name, placeholder, value, valid, onChange, onBlur, status, message}) {
    
    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
                    {
                        status !== "idle"
                        && (
                            status === "success"
                            ? <div><MdOutlineCheckCircle /></div>
                            : <div><MdOutlineErrorOutline /></div>
                        )
                    }
            </div>
            <InputValidatedMessage status={status} message={message} />
        </div>
    );
        
}

function PasswordInputHiddenButton() {
    const [ isShow, setShow ] = useState(false);

    const handleOnClick = () => {
        setShow(prev => !prev)
    }

    return <p onClick={handleOnClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

// 메시지 커스텀 훅으로 만들기
function useInputValidatedMessage({defaultMessage}) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    }
    const [ status, setStatus ] = useState(STATUS.idle);
    const [ message, setMessage ] = useState(defaultMessage || "");

    return {
        status,
        setStatus,
        message,
        setMessage,
        element: <InputValidatedMessage status={status} message={message} />
    }
}

function InputValidatedMessage({status, message}) {
    const ERROR = "error";

    if (status === ERROR) {
        return <div css={s.messageContainer()}>{message}</div>
    }

    return <></>  
}



function Singup(props) {
    const [ inputState, setInputState ] = useState({
        username: {
            value: "",
            message: "아이디는 3자 이상, 15자 이하의 영문자, 숫자를 포함해야 합니다.",
            regex: /^(?=.*[A-Za-z])(?=.*\d).{3,15}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        password: {
            value: "",
            message: "비밀번호는 8자 이상, 20자 이하로 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        checkPassword: {
            value: "",
            message: "비밀번호가 일치하지 않습니다.",
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        fullName: {
            value: "",
            message: "이름은 한글로 2자 이상, 20자 이하로 입력해 주세요.",
            regex: /^[가-힣]{2,20}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        email: {
            value: "",
            message: "유효한 이메일 주소를 입력해 주세요.",
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
    });

    const [ showPassword, setShowPassword ] = useState(false);
    const [ submitDisabled, setSubmitDisabled ] = useState(true);

    const [ inputs, setInputs ] = useState([
        {
            type: "text",
            name: "username",
            placeholder: "사용자이름",
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d).{3,15}$/,
                message: "아이디는 3자 이상, 15자 이하의 영문자, 숫자를 포함해야 합니다.",
            },
        },
        {
            type: "password",
            name: "password",
            placeholder: "비밀번호",
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                message: "비밀번호는 8자 이상, 20자 이하로 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
            },
        },
        {
            type: "password",
            name: "checkPassword",
            placeholder: "비밀번호 확인",
            value: "",
            valid: {
                enabled: false,
                regex: null,
                message: "비밀번호가 일치하지 않습니다.",
            },
        },
    ]);

    const inputItems = inputs.map(input => useSignInAndUpInput(input));

    const handleOnChange = (e) => {
        setInputState(prev => ({
            ...prev,
            [e.target.name] : {
                ...prev[e.target.name],
                value: e.target.value,
            }
        }));
    }

    const handleOnBlur = (e) => {
        // 무조건 한 글자 이상이 있어야 검사가능
        if (!(/^.+$/.test(inputState[e.target.name].value))) {
            setInputState(prev => ({
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    status: "idle",
                }
            }));
            return;
        }

        if (e.target.name === "checkPassword") {
            if (inputState.password.status === "success") {
                setInputState(prev => ({
                    ...prev,
                    "checkPassword" : {
                        ...prev["checkPassword"],
                        status: prev["checkPassword"].value === prev["password"].value ? "success" : "error",
                    }
                }));
            }
            return;
        }

        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                status: prev[e.target.name].regex.test(prev[e.target.name].value) ? "success" : "error",
            }
        }));
    }

    useEffect(() => {
        setSubmitDisabled(!!Object.values(inputState).map(obj => obj.status).find(status => status !== "success"));
    }, [inputState]);

    return (
        <div css={s.layout}>

            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>

            <button css={s.submitButton} disabled={submitDisabled}>가입하기</button>

        </div>
    );
}

export default Singup;
/**
 * username, password, checkpassword, fullname(한글), email
 * javascript 정규표현식을 각각 만들어주고 error메세지도 만들어줘
 */