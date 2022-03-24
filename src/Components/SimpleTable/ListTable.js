import  React, {useState, useEffect } from 'react'
import { getAllDonations, getAllUsers } from '../../Api/DonationsApi'
import { Loading } from '../../Pages/Loading';


import { DataGrid } from '@mui/x-data-grid';

import { getFormattedDate, getFormattedTime } from '../../Components/Utils';

function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    Promise.all([getAllDonations(), getAllUsers()])
    .then((values) => {
      setData(values[0].data.donations);
      setUsers(values[1].data.users)
      setLoading(false);
    })
  }, []);

  const columns = [
    { field: 'date', headerName: 'תאריך', width: 130, valueGetter: (params) => getFormattedDate(params.row.time), },
    { field: 'time', headerName: 'שעה', width: 130, valueGetter: (params) => getFormattedTime(params.row.time), },
    { field: 'user', headerName: 'משתמש', width: 250, valueGetter: (params) => getUserName(params.row.user) },
    { field: 'Tashloumim', headerName: 'תשלומים', width: 100},
    { field: 'Amount', headerName: 'סך', width: 100 },
    { field: 'Currency', headerName: 'מטבע', width: 90, valueGetter: (params) => params.row.Currency === '1' ? 'ש"ח' : '$' },
    { field: 'LastNum', headerName: '4 ספרות א.', width: 90 },
    { field: 'Confirmation', headerName: 'אישור', width: 90 },
    { field: 'Comments', headerName: 'הערות', width: 200 },
  ];

  const getUserName = (id)=> {
    const user =  users.find(user => {
      return user.id === id
    })
    return user.firstName + ' ' + user.lastName
  }

  //   return (
  //     <TableContainer component={Paper}>
  //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell align="right">שם</TableCell>
  //             <TableCell align="right">כתובת</TableCell>
  //             <TableCell align="right">קטגוריה</TableCell>
  //             <TableCell align="right">תיאור</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {LinksCtx.links.map((row, i) => (
  //             <TableRow
  //               key={row[i]}
  //               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //             >
  //               <TableCell align="right" component="th" scope="row">
  //                 {row.title}
  //               </TableCell>
  //               <TableCell align="right">{row.path}</TableCell>
  //               <TableCell align="right">{getCategory(row, LinksCtx.categories)}</TableCell>
  //               <TableCell align="right">{row.description}</TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
  return loading ? <Loading />
    : (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    );
}
export default BasicTable;