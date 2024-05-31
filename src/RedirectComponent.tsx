import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const logToConsoleAndStorage = (message: string) => {
  console.log(message);

  let logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(message);
  localStorage.setItem('logs', JSON.stringify(logs));
};

const RedirectComponent = () => {
  const { shortedUrl } = useParams();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(`http://localhost:8083/shorted/${shortedUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          logToConsoleAndStorage(`Redirecting to: ${result.originUrl}`);
          window.location.href = result.originUrl; // 원래 URL로 리다이렉트
        } else {
          logToConsoleAndStorage("단축된 URL을 찾을 수 없습니다.");
          // URL이 없을 경우 처리 로직 추가 가능
        }
      } catch (error) {
        logToConsoleAndStorage(`요청을 보내는 도중에 오류가 발생했습니다: ${error}`);
        // 오류가 발생할 경우 처리 로직 추가 가능
      }
    };

    fetchOriginalUrl();
  }, [shortedUrl]);

  return <div>리다이렉트 중...</div>;
};

export default RedirectComponent;
