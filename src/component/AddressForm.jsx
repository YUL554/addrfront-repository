import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
} from '@mui/material';
import { useState } from 'react';

function AddressForm(props) {
  //1. open
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setAddress({ zip: '', addr: '' });
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  //2. address
  const [address, setAddress] = useState({
    zip: '',
    addr: '',
  });
  const changeHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  //3. save
  const saveHandler = () => {
    //저장로직추가
    props.addAddress(address);
    closeHandler();
  };

  return (
    <div>
      <Button onClick={openHandler}>입력</Button>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>새 주소</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              label='우편번호'
              name='zip'
              value={address.zip}
              onChange={changeHandler}
              autoFocus
              // variant='standard'
            />
            <br />
            <TextField
              label='주소'
              name='addr'
              value={address.addr}
              onChange={changeHandler}
              autoFocus
              // variant='standard'
            />
            <br />
          </Stack>
        </DialogContent>
        <DialogActions>
          <button onClick={closeHandler}>취소</button>
          <button onClick={saveHandler}>저장</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddressForm;
