import React, { useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const DATA_API_URL = 'http://localhost:8080/question';
const API_URL = 'http://localhost:8080/user';
const GIT_API_URL = 'https://github.com/login/oauth/authorize';
const GIT_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GIT_QUERY = `?client_id=${GIT_CLIENT_ID}`;

// 1. Git Auth 서버에 리다이렉트

function App() {
  const loginBtnOnClick = () => window.location.assign(GIT_API_URL + GIT_QUERY);
  const logoutBtnOnClick = () => axios.get(API_URL + '/logout');
  const getDataBtnOnClick = () => {
    axios
      .get(DATA_API_URL)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const postAccesToken = (token) => {
    axios
      .post(API_URL, { code: token, type: 'github' })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const RESPONSE_GIT_URL = new URL(window.location.href);
    const gitCode = RESPONSE_GIT_URL.searchParams.get('code');
    postAccesToken(gitCode);
  }, []);

  return (
    <React.Fragment>
      <button onClick={loginBtnOnClick}>로그인</button>
      <button onClick={logoutBtnOnClick}>로그아웃</button>
      <button onClick={getDataBtnOnClick}>데이터 받아오기</button>
    </React.Fragment>
  );
}

export default App;
