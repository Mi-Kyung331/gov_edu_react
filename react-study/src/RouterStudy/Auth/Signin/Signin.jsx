/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRefreshStore } from '../Stores/storeStudy';
import { useQueryClient } from '@tanstack/react-query';


/**
    반복되고 있는 코드 줄이기 (컴포넌트 분리)를 Signup에서 하였기 때문에 Signin에서 코드짜는 것은 
    삭제만 하면 되었기 때문에 상대적으로 훨신 쉬웠음

        → 컴포넌트 분리를 하는 이유
 */

function useSignInAndUpInput({ id, type, name, placeholder, value, valid }) {
    const STATUS = {
        idle: "idle",
        success: "success",
        error: "error",
    };
    const inputRef = useRef();
    const [ inputValue, setInputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle);

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnBlur = (e) => {
        if(isEmpty(e.target.value)) {
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
        name: name,
        value: inputValue,
        status: status,
        ref: inputRef,
        element: <SignInAndUpInput 
            key={id}
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={inputValue}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.message}
            inputRef={inputRef} />
    }
}

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message, inputRef}) {
    const { isShow, element: PasswordInputHiddenButton } = usePasswordInputHiddenButton();

    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type === "password" ? isShow ? "text" : "password" : type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} ref={inputRef} />
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
    )
}

function usePasswordInputHiddenButton() {
    const [isShow, setShow] = useState(false);

    const handleOnClick = () => {
        setShow(prev => !prev);
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

function Signin() {
    const queryClinet = useQueryClient();

    const navigate = useNavigate();
    const location = useLocation();
    // const { refresh } = useRefreshStore();
    const { setValue:setRefresh } = useRefreshStore();
  
    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    const inputs = [
        {
            id: 1,
            type: "text",
            name: "username",
            placeholder: "사용자이름",
            value: location.state?.username || "",
            valid: {
                enabled: true,
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },
        {
            id: 2,
            type: "password",
            name: "password",
            placeholder: "비밀번호",
            value: location.state?.password || "",
            valid: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
                message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            },
        },
    ];

    const inputItems = inputs.map(input => useSignInAndUpInput(input));
    // [input, input] -> [useSignInAndUpInput(리턴값), useSignInAndUpInput(리턴값)]

    useEffect(() => {
        inputItems.forEach(inputItem => {
            inputItem.ref.current.focus();
            inputItem.ref.current.blur();
        });
    }, []);

    useEffect(() => {
        setSubmitDisabled(!!inputItems.find(inputItem => inputItem.status !== "success"))
    }, [inputItems]);

    const handleRegisterOnClick = async () => {
        const url = "http://localhost:8080/api/users/login";

        // 컨트롤러 메소드명 Login
        // Dto명 LoginDto
        // Post요청

        let data = {};

        inputItems.forEach(inputItem => {
            data = {
                ...data,
                [inputItem.name]: inputItem.value,
            }
        });

        // 로그인
        try {
            const response = await axios.post(url, data);
            const accessToken = response.data?.accessToken;
            if (!!accessToken) {
                localStorage.setItem("AccessToken", accessToken);
                queryClinet.invalidateQueries({
                    queryKey: ["principalUserQuery"],
                });
                navigate("/");
            }
        } catch(error) {
            const { response, status } = error;
            console.log(response.data);
            alert("로그인 오류");
        }
        
    }

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>로그인</h1>
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled} onClick={handleRegisterOnClick}>로그인하기</button>
        </div>
    );
}

export default Signin;
