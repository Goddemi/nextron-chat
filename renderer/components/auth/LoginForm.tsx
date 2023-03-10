import { useState, useRef } from "react";
import { loginRequest } from "./api/auth";
import InputForm from "./formElement/InputForm";
import Notification from "../notification/Notification";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../store/auth/loginUser";
import { useRouter } from "next/router";
interface Props {
  goToSignup: () => void;
}

const LoginForm = ({ goToSignup }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loginRequestResult, setLoginRequestResult] = useState();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await loginRequest(email, password);

    const { message, userEmail }: any = response;
    setLoginRequestResult(message);

    message === "로그인 성공" && dispatch(setLoginUser(userEmail));
    message === "로그인 성공" && router.push("/userList");
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <InputForm label={"아이디(이메일)"} id={"email"} ref={emailRef} />
        <InputForm label={"비밀번호"} id={"password"} ref={passwordRef} />

        <div className="flex justify-between">
          <button className="bg-orange-400 py-1 px-3 rounded-md">로그인</button>
          <button
            type="button"
            className="bg-blue-400 py-1 px-3 rounded-md"
            onClick={goToSignup}
          >
            회원가입
          </button>
        </div>
        {loginRequestResult && (
          <Notification id="login" result={loginRequestResult} />
        )}
      </form>
    </>
  );
};

export default LoginForm;
