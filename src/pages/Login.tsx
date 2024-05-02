import { Button, FormControl, TextField } from '@mui/material';
import Header from '../component/Header';
import { useState } from 'react';


function Login() {

  const [formDatas, setFormDatas] = useState({
    name: "",
    password: "",
    email: "",
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8083/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDatas)
      });

      if (response.ok) {
        console.log('폼 데이터가 성공적으로 전송되었습니다.');
        // 성공적으로 요청을 보낸 후에 추가적인 작업을 수행할 수 있습니다.
      } else {
        console.error('서버에서 오류 응답을 받았습니다.', response.statusText);
      }
    } catch (error) {
      console.error('요청을 보내는 도중에 오류가 발생했습니다:', error);
    }
  }



  return (
    <>
      <Header></Header>
      <main style={{ margin: '10px' }}>
        <form onSubmit={handleSubmit}>
          <FormControl>

            <TextField
              label="name"
              name="name"
              value={formDatas.name}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              type="password"
              label="Password"
              name="password"
              value={formDatas.password}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              type="email"
              label="email"
              name="email"
              value={formDatas.email}
              onChange={handleChange}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>

          </FormControl>
        </form>
      </main>
    </>
  )
}

export default Login;


