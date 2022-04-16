import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Column from './column';
import Row from './row';
import axios from 'axios';
import ColumnData from './columnData'
import { Link } from "react-router-dom";

const MainTable = () => {

  const [rowsData, setRowsData] = useState([{}])

  useEffect(() => {
    let data = '';
    const config = {
      method: 'get',
      url: 'https://localhost:7155/api/UserList',
      headers: {},
      data: data
    };

    axios(config)
      .then(function (response) {
        setRowsData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);


  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <Column data={ColumnData} />
          </TableHead>
          <TableBody>
            <Row data={rowsData} />
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/">Back To Form</Link>
    </Container>
  );
}
export default MainTable;