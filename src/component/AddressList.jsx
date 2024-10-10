import { useEffect, useState } from 'react';
import { REST_URL } from '../constants';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Snackbar, Stack } from '@mui/material';
import AddressForm from './AddressForm';
import AddressEdit from './AddressEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function AddressList() {
  const [addresses, setAddresses] = useState([]);
  //= useState([{zip:'000000', name='신쨩', rdate='2024', update='2025'}]);
  useEffect(() => fetchAddress(), []); //사용이유: 첫 rendering시에만 실행하고 싶을 때
  const fetchAddress = () => {
    const token = sessionStorage.getItem('jwt');
    fetch(REST_URL + 'api/readdresses', { headers: { Authorization: token } })
      .then((response) => {
        if (!response.ok) {
          throw new Error('로그인 실패' + response.statusText);
        }
        return response.json();
      })
      //.then((data) => console.log(data))
      .then((data) => setAddresses(data._embedded.readdresses))
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: 'zip', headerName: '우편번호', width: 250 },
    { field: 'addr', headerName: '주소', width: 250 },
    { field: 'rdate', headerName: '등록날짜', width: 250 },
    { field: 'udate', headerName: '수정날짜', width: 250 },
    {
      field: '_links.readdress.href',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: (row) => <AddressEdit data={row} editAddress={editAddress} />,
    },
    {
      field: '_links.self.href',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton onClick={() => delHandler(row.id)}>
          <DeleteIcon color='error' />
        </IconButton>
      ),
    },
  ];

  //삭제 로직
  const delHandler = (url) => {
    if (confirm('삭제하시겠습니까?')) {
      const token = sessionStorage.getItem('jwt');
      fetch(url, { method: 'DELETE', headers: { Authorization: 'token' } })
        .then((response) => {
          if (response.ok) {
            fetchAddress();
            setOpen(true);
          } else {
            alert('삭제실패~');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const [open, setOpen] = useState(false);

  //저장 로직
  const addAddress = (address) => {
    const token = sessionStorage.getItem('jwt');
    fetch(REST_URL + 'api/readdresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'token' },
      body: JSON.stringify(address),
    })
      .then((response) => {
        if (response.ok) {
          fetchAddress();
        } else {
          alert('입력실패~');
        }
      })
      .catch((err) => console.error(err));
  };

  //수정 로직
  const editAddress = (address, link) => {
    const token = sessionStorage.getItem('jwt');
    console.log(`#editAddress() link: ${link}`);
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authrization: 'jwt' },
      body: JSON.stringify(address),
    })
      .then((response) => {
        if (response.ok) {
          fetchAddress();
        } else {
          alert('수정 실ㅍㅐ');
          throw new Error('로그인 실패' + response.statusText);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Stack mt={2} mb={2}>
        <AddressForm addAddress={addAddress} />
      </Stack>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={addresses}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          disableSelectionOnClick={true}
        />
        <Snackbar
          autoHideDuration={2000}
          message={'성공'}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
export default AddressList;
