import { React, useContext } from 'react'
import LinksContext from '../../store/login-context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'שם', width: 130 },
  { field: 'path', headerName: 'כתובת', width: 130 },
  { field: 'categoryId', headerName: 'קטגוריה', width: 90 },
  { field: 'description', headerName: 'תיאור', width: 90 },
];

const getCategory = (link, categories)=>{
    var category = categories.find(category => category._id === link.categoryId);
    return category.title;
}

export default function BasicTable() {
    const LinksCtx = useContext(LinksContext);
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
return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={LinksCtx.links}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}