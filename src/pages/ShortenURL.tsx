import { Button, FormControl, TextField, Box, Typography } from "@mui/material";
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
    originUrl: "",
  });
  const [urlError, setUrlError] = useState("");
  const [shortedUrl, setshortedUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrlData({
      ...urlData,
      [name]: value,
    });
    if (name === "originUrl") {
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
        credentials: 'include'
      });
      if (response.ok) {
        let result = await response.json();
        setshortedUrl(`http://localhost:3000/shorted/${result.shortedUrl}`); // 프론트엔드에서 최종 URL 생성
        setData((prevData) => ({
          ...prevData,
          shortedUrl: result.shortedUrl,
        }));
      } else {
        console.error("서버에서 오류 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("요청을 보내는 도중에 오류가 발생했습니다:", error);
    }
  };

  const handleRedirect = async (shortedUrl: string) => {
    try {
      let response = await fetch(`http://localhost:8083/shorted/${shortedUrl.split('/').pop()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      if (response.ok) {
        let result = await response.json();
        console.log(result.originUrl);
        window.location.href = result.originUrl; // 원래 URL로 리다이렉트
      } else {
        console.error("단축된 URL을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("요청을 보내는 도중에 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <h1>URL 단축</h1>
      <main style={{ margin: "10px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              type="url"
              label="원본 URL"
              name="originUrl"
              value={urlData.originUrl}
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
        {shortedUrl && (
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="h6">단축된 URL:</Typography>
            <a href="#" onClick={() => handleRedirect(shortedUrl)} target="_blank" rel="noopener noreferrer">
              {shortedUrl}
            </a>
          </Box>
        )}
      </main>
    </>
  );
}

export default ShortenURL;
