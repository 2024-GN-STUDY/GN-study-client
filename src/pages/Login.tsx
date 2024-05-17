import { Button, FormControl, TextField } from "@mui/material";
import Header from "../component/Header";
import { useState } from "react";

function Login() {
  const [formDatas, setFormDatas] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("유효한 이메일 주소를 입력하세요.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8083/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatas),
        credentials: 'include' // 도메인 다를 때 인증정보 전송, 저장 허용 ex)쿠키 저장 시
      });
      console.log(response);
      if (response) {
        console.log("폼 데이터가 성공적으로 전송되었습니다.");
        // window.location.href = "/";
      } else {
        console.error("서버에서 오류 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("요청을 보내는 도중에 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <h1>로그인</h1>
      <main style={{ margin: "10px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              type="email"
              label="email"
              name="email"
              value={formDatas.email}
              onChange={handleChange}
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              type="password"
              label="Password"
              name="password"
              value={formDatas.password}
              onChange={handleChange}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary">
              로그인
            </Button>
          </FormControl>
        </form>
      </main>
    </>
  );
}

export default Login;
