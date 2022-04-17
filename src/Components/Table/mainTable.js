import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import Column from './column';
import Row from './row';
import axios from 'axios';
import ColumnData from './columnData'
import { Link } from "react-router-dom";
import Controls from "../Controls/controls";

const MainTable = () => {
  const [rowsData, setRowsData] = useState([{}])

  useEffect(() => {
    const getData = () => {
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
    }
    getData()
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
      <br />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Controls.Button
          text="Back To Form"
          color="default" />
      </Link>
    </Container>
  );
}
export default MainTable;