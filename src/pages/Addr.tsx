import { Button, FormControl, TextField } from '@mui/material';
import Header from '../component/Header';
import { useState } from 'react';
import SearchAddr from '../component/modal/SearchAddr';


function Addr() {

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





  return (
    <>
      <TextField
        label="base_addr"
        name="base_addr"
        value={formDatas.base_addr}
        onChange={handleChange}
        margin="normal"
      />

      <Button type="button" onClick={openModal}>주소찾기</Button>

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


      {isOpen && <div className='addr_modal__background'>
        <SearchAddr setAddr={setAddr} closeModal={closeModal} ></SearchAddr>
      </div>}
    </>
  )
}

export default Addr;


