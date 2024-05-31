import { Button, FormControl, TextField } from "@mui/material";
import Header from "../component/Header";
import { useContext, useState } from "react";
import { AppContext } from '../AppContext';
import { useNavigate } from "react-router-dom";

function ShortenURL() {

  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('ShortenURL must be used within an AppProvider');
  }
  const { data, setData } = context;

  const [urlData, setUrlData] = useState({
    url: "",
  });
  const [urlError, setUrlError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrlData({
      ...urlData,
      [e.target.name]: e.target.value,
    });
    if (name === "url") {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(value)) {
        setUrlError("유효한 URL을 입력하세요.");
      } else {
        setUrlError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8083/shorted/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlData),
        credentials: 'include' // 도메인 다를 때 인증정보 전송, 저장 허용 ex)쿠키 저장 시
      });
      console.log(response);
      if (response.ok) {
        console.log("URL이 성공적으로 단축되었습니다.");
        let result = await response.json();
        setData((prevData) => ({
          ...prevData,
          shortenedUrl: result.shortenedUrl,
        }));

        navigate("/");
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
      <h1>URL 단축</h1>
      <main style={{ margin: "10px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              type="url"
              label="URL"
              name="url"
              value={urlData.url}
              onChange={handleChange}
              margin="normal"
              error={!!urlError}
              helperText={urlError}
            />

            <Button type="submit" variant="contained" color="primary">
              단축하기
            </Button> 
            <Button type="button" color="primary" onClick={() => navigate("/")}>
              돌아가기
            </Button>
          </FormControl>
        </form>
      </main>
    </>
  );
}

export default ShortenURL;