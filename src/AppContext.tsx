import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useCallback } from 'react';

interface AppContextType {
  data: Record<string, any>;
  setData: Dispatch<SetStateAction<Record<string, any>>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

function getCookiesMap() {
  // 모든 쿠키를 문자열로 가져오기
  const cookiesString = document.cookie;

  // 쿠키 문자열을 세미콜론으로 분리하여 각 쿠키의 배열을 만들기
  const cookiesArray = cookiesString.split('; ');

  // 쿠키를 Map 객체로 저장하기
  const cookiesMap = new Map();

  cookiesArray.forEach(cookie => {
    // 각 쿠키를 '='로 분리하여 이름과 값을 가져오기
    const [name, value] = cookie.split('=');
    // Map 객체에 저장
    cookiesMap.set(name, value);
  });
  return cookiesMap;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>({
    isLogin: false,
    menus: ['로그인'],
  });

  const changeData = useCallback((access_token: any) => {
    setData((prevData) => ({
      ...prevData,
      isLogin: !!access_token,
      menus: access_token ? ['로그아웃하기'] : ['로그인하기']
    }));
  }, []);

  useEffect(() => {
    const cookiesMap = getCookiesMap();
    const access_token = cookiesMap.get("Access-Token");
    changeData(access_token);
  }, [changeData]);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
