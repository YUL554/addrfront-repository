import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
//import { Stack } from '@mui/material/Stack';

function AddressEdit(props) {
  //1. open
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setAddress({ zip: props.data.row.zip, addr: props.data.row.addr });
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
  //3. edit
  const editHandler = () => {
    props.editAddress(address, props.data.id);
    closeHandler();
  };
  return (
    <>
      <IconButton onClick={openHandler}>
        <EditIcon color='primary' />
      </IconButton>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>주소 수정</DialogTitle>
        <DialogContent>
          <input
            type='text'
            placeholder='우편번호'
            name='zip'
            value={address.zip}
            onChange={changeHandler}
          />
          <br />
          <input
            type='text'
            placeholder='주소'
            name='addr'
            value={address.addr}
            onChange={changeHandler}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>취소</Button>
          <Button onClick={editHandler}>수정</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddressEdit;
