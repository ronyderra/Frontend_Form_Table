import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Row = ({ data }) => {
    return (
        <>
            {
                data.map((row, key) => (
                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="right">{row.nameH}</TableCell>
                        <TableCell align="right">{row.nameE}</TableCell>
                        <TableCell align="right">{row.birthDate}</TableCell>
                        <TableCell align="right">{row.personalId}</TableCell>
                        <TableCell align="right">{row.city}</TableCell>
                        <TableCell align="right">{row.bank}</TableCell>
                        <TableCell align="right">{row.branch}</TableCell>
                        <TableCell align="right">{row.accountNumber}</TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}
export default Row;