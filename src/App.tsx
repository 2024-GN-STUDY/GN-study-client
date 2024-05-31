import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppProvider } from './AppContext';

const logToConsoleAndStorage = (message: string) => {
  console.log(message);

  let logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(message);
  localStorage.setItem('logs', JSON.stringify(logs));
};

const loadLogsFromStorage = () => {
  let logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.forEach((log: string) => console.log(log));
  localStorage.removeItem('logs');  // 로그를 불러온 후, 저장된 로그를 삭제합니다.
};

const App = () => {
  useEffect(() => {
    loadLogsFromStorage();
  }, []);

  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default App;
