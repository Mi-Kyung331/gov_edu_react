/** @jsxImportSource @emotion/react */
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
    유효성 검사(Validation Check)
    : 사용자가 입력한 데이터가 정해진 규칙이나 형식에 맞는지 확인하는 과정

    해당코드들은 클린업 과정을 거친 코드들이며
    나누는 기준은 각각의 코딩들이 어떠한 기능을 하는지에 대한 기준을 나누고 클린업 과정을 거쳐야한다.

    훅 함수는 함수 안에 또다른 훅 함수가 들어가 있다.
    상태를 만드는 애들은 주로 use가 붙으며, use가 쓰여진 함수들은 use hook 함수로 빼놓는다.

 */

// 반복되고 있는 코드 줄이기 (컴포넌트 분리)
function useSignInAndUpInput({ id, type, name, placeholder, value, valid}) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    };
    // inputValue, status는 상태를 나타낸다
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

        setStatus(valid.callback() ? STATUS.success : STATUS.error);
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        // key, value가 같기 때문에 하나만 사용
        name: name,
        value: inputValue,
        status: status,
        // 실제 컴포넌트
        element: <SignInAndUpInput 
            key={id}
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

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message}) {
    const { isShow, element: PasswordInputHiddenButton } = usePasswordInputHiddenButton();
    
    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type === "password" ? isShow ? "text" : "password" : type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
                    {
                        type === "password" && PasswordInputHiddenButton
                    }
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

function usePasswordInputHiddenButton() {
    const [ isShow, setShow ] = useState(false);
    
    const handleOnClick = () => {
        setShow(prev => !prev)
    }

    return {
        isShow,
        element: <PasswordInputHiddenButton isShow={isShow} onClick={handleOnClick} />
    }
}

function PasswordInputHiddenButton({isShow, onClick}) {
    return <p onClick={onClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

function InputValidatedMessage({status, message}) {
    const ERROR = "error";

    if (status === ERROR) {
        return <div css={s.messageContainer()}>{message}</div>
    }

    return <></>  
}



function Singup(props) {
    const navigate = useNavigate();
    const [ submitDisabled, setSubmitDisabled ] = useState(true);

    const inputs = [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
            type: "password",
            name: "checkPassword",
            placeholder: "비밀번호 확인",
            value: "",
            valid: {
                enabled: false,
                regex: null,
                callback: () => inputItems[1].inputValue === inputItems[2].inputValue,
                message: "비밀번호가 일치하지 않습니다.",
            },
        },
        {
            id: 4,
            type: "text",
            name: "fullName",
            placeholder: "성명",
            value: "",
            valid: {
                enabled: true,
                regex: /^[가-힣]{2,20}$/,
                message: "이름은 한글로 2자 이상, 20자 이하로 입력해 주세요.",
            },
        },
        {
            id: 5,
            type: "email",
            name: "email",
            placeholder: "이메일",
            value: "",
            valid: {
                enabled: true,
                regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "유효한 이메일 주소를 입력해 주세요.",
            },
        },
    ];

    // input 호출
    const inputItems = inputs.map(input => useSignInAndUpInput(input));
    // [input, input, input] → [{useSignInAndUpInput(리턴값)}, useSignInAndUpInput(리턴값)]

    useEffect(() => {
        setSubmitDisabled(!!inputItems.find(inputItem => inputItem.status !== "success"))
    }, [inputItems]);

    const handleRegisterOnClick = async () => {
        // async사용 > await 사용 가능
        const url = "http://localhost:8080/api/users";

        let data = {};
        inputItems.forEach(inputItem => {
            data = {
                ...data,
                [inputItem.name]: inputItem.value,
            }
        })

        try {
            const response = await axios.post(url, data);
            alert("사용자 등록 완료");

            navigate("/users/signin", {
                state: {
                    username: response.data.username,
                    password: inputItems.find(inputItem => inputItem.name === "password").value,
                }
            });
        } catch(error) {
            alert("사용자 등록 오류");
        }

    }

    return (
        <div css={s.layout}>

            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>

            <button css={s.submitButton} disabled={submitDisabled} onClick={handleRegisterOnClick}>가입하기</button>

        </div>
    );
}

export default Singup;
/**
 * username, password, checkpassword, fullname(한글), email
 * javascript 정규표현식을 각각 만들어주고 error메세지도 만들어줘
 */