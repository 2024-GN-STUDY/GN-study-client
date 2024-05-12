import { Button, FormControl, TextField } from '@mui/material';
import Header from '../component/Header';
import { useState } from 'react';
import SearchAddr from '../component/modal/SearchAddr';


function Login() {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [formDatas, setFormDatas] = useState({
    base_addr: "",
    detail_addr: "",
  })



  const setAddr = (addr: string) => {
    setFormDatas({
      ...formDatas,
      base_addr: addr,
    })
  }

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
      console.log(response)
      if (response.ok) {
        console.log('폼 데이터가 성공적으로 전송되었습니다.');
        // 성공적으로 요청을 보낸 후에 추가적인 작업을 수행할 수 있습니다.
      } else {
        console.error('서버에서 오류 응답을 받았습니다.');
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
              label="base_addr"
              name="base_addr"
              value={formDatas.base_addr}
              onChange={handleChange}
              margin="normal"
            />

            <button type="button" onClick={openModal}>주소찾기</button>

            <TextField
              type="detail_addr"
              label="detail_addr"
              name="detail_addr"
              value={formDatas.detail_addr}
              onChange={handleChange}
              margin="normal"
            />


            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>

          </FormControl>
        </form>
      </main>

      {isOpen && <div className='addr_modal__background'>
        <SearchAddr setAddr={setAddr} closeModal={closeModal} ></SearchAddr>
      </div>}
    </>
  )
}

export default Login;


