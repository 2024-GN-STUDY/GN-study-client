import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // App 컴포넌트의 경로를 확인하세요.
import RedirectComponent from '../RedirectComponent'; // 리다이렉트 컴포넌트 추가

const Loading = <div>Loading...</div>;
const Basic = lazy(() => import('../pages/Basic'));
const Login = lazy(() => import('../pages/Login'));
const Join = lazy(() => import('../pages/Join'));
const ShortenURL = lazy(() => import('../pages/ShortenURL')); // ShortenURL 컴포넌트 추가

const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={Loading}>
            <Basic />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={Loading}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'join',
        element: (
          <Suspense fallback={Loading}>
            <Join />
          </Suspense>
        ),
      },
      {
        path: 'shorten-url', // 새로운 경로 추가
        element: (
          <Suspense fallback={Loading}>
            <ShortenURL />
          </Suspense>
        ),
      },
      {
        path: 'shorted/:shortedUrl', // 리다이렉트 경로 추가
        element: (
          <Suspense fallback={Loading}>
            <RedirectComponent />
          </Suspense>
        ),
      },
    ],
  },
]);

export default rootRouter;
