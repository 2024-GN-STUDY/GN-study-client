import { Button, FormControl, TextField } from "@mui/material";
import Header from "../component/Header";
import { useState } from "react";
import "./style/join.css";
import SearchAddr from '../component/modal/SearchAddr';

function Join() {
  const [formDatas, setFormDatas] = useState({
    email: "",
    password: "",
    name: "",
    birth_dt: "",
    phone_num: "",
    age: "",
    baseAddr: "",
    detailAddr: "",
  });

  const [isOpen, setIsOpen] = useState(false); // 주소 모달

  // 이메일 중복체크
  const [emailError, setEmailError] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailError2, setEmailError2] = useState("");

  // 비밀번호
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let filteredValue = value;

    switch (name) {
      case "phone_num":
        filteredValue = value.replace(/\D/g, "");
        break;
      case "age":
        filteredValue = value.replace(/\D/g, "");
        break;

      default:
        break;
    }

    setFormDatas((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("유효한 이메일 주소를 입력하세요.");
      } else {
        setEmailError("");
      }
      setIsEmailChecked(false); // 이메일이 변경될 때 중복 체크 상태 초기화
    }
    if (name === "password") {
      if (!validatePassword(value)) {
        setPasswordError(
          "비밀번호는 최소 8자 이상, 최대 20자 이하이며, 특수문자 1개를 포함해야 합니다."
        );
      } else {
        setPasswordError("");
      }
    }
  };
  const checkEmailDuplication = async () => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/v1/users/check-email?email=${formDatas.email}` //이거를 어떻게 해야될지 모르겠어요
      );
      const isEmailTaken = !response.ok;
      if (isEmailTaken) {
        alert("이메일이 이미 사용 중입니다.");
      } else {
        alert("사용 가능한 이메일입니다.");
        setIsEmailChecked(true); // 중복 체크 완료
      }
    } catch (error) {
      console.error("이메일 중복 체크 중 오류가 발생했습니다:", error);
    }
  };
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailChecked) {
      alert("이메일 중복 체크를 완료해주세요.");
      return;
    }
    if (!validatePassword(formDatas.password)) {
      setPasswordError(
        "비밀번호는 최소 8자 이상, 최대 20자 이하이며, 특수문자 1개를 포함해야 합니다."
      );
      return;
    } else {
      setPasswordError("");
    }

    console.log(formDatas); // 데이터 내용 확인
    try {
      const response = await fetch("http://localhost:8083/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatas),
      });
      console.log(response);
      if (response.ok) {
        console.log("폼 데이터가 성공적으로 전송되었습니다.");
        window.location.href = "/login";
      } else {
        console.error("서버에서 오류 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("요청을 보내는 도중에 오류가 발생했습니다:", error);
    }
  };



  // #region 주소 api 관련
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const setAddr = (addr: string) => {
    setFormDatas({
      ...formDatas,
      baseAddr: addr,
    })
  }

  // #endregion

  return (
    <>
      <Header></Header>
      <main style={{ margin: "10px" }}>
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <div className="form_inner">
              <p>이메일</p>
              <TextField
                type="email"
                label="이메일"
                name="email"
                value={formDatas.email}
                onChange={handleChange}
                variant="outlined"
                error={!!emailError2}
                helperText={emailError2}
              />
              <Button
                className="emailCheck"
                variant="contained"
                color="primary"
                onClick={checkEmailDuplication}
              >
                중복체크
              </Button>
            </div>
            <div className="form_inner">
              <p>비밀번호</p>
              <TextField
                name="password"
                type="password"
                value={formDatas.password}
                onChange={handleChange}
                label="비밀번호"
                variant="outlined"
                error={!!passwordError}
                helperText={passwordError}
              />
            </div>
            <div className="form_inner">
              <p>이름</p>
              <TextField
                name="name"
                type="text"
                value={formDatas.name}
                onChange={handleChange}
                label="이름"
                variant="outlined"
              />
            </div>
            <div className="form_inner">
              <p>생년월일</p>
              <TextField
                name="birth_dt"
                type="date"
                value={formDatas.birth_dt}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <div className="form_inner">
              <p>전화번호</p>
              <TextField
                name="phone_num"
                type="tel"
                value={formDatas.phone_num}
                onChange={handleChange}
                label="전화번호"
                variant="outlined"
              />
            </div>
            <div className="form_inner">
              <p>나이</p>
              <TextField
                name="age"
                type="number"
                value={formDatas.age}
                onChange={handleChange}
                label="나이"
                variant="outlined"
              />
            </div>
            <div className="form_inner">
              <p>주소</p>
              <TextField
                label="baseAddr"
                name="baseAddr"
                value={formDatas.baseAddr}
                onChange={handleChange}
                margin="normal"
                disabled={true}
              />

              <Button type="button" onClick={openModal}>주소찾기</Button>

              <TextField
                type="detailAddr"
                label="detailAddr"
                name="detailAddr"
                value={formDatas.detailAddr}
                onChange={handleChange}
                margin="normal"
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              회원가입
            </Button>
          </FormControl>
        </form>
      </main>

      {isOpen && <div className='addr_modal__background'>
        <SearchAddr setAddr={setAddr} closeModal={closeModal} ></SearchAddr>
      </div>}
    </>
  );
}

export default Join;
