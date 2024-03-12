import { spatial_ref_sys_all_reduced as spatialData2} from "../data/spatial_ref_sys_all_reduced";
import './SrsDialogSearch.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


const SrsDialogSearch = (props) => {

  const { onClose, open, onOptionSelect } = props;

  const [text, setText] = useState('')
  
  const handleClose = () => {
    onClose();
  };

  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    let inputValue = event.target.value.toLowerCase();
    console.log('input is', inputValue);
    const newFilteredOptions = spatialData2.filter((option) =>
      option.name.toLowerCase().includes(inputValue) || 
      option.auth_id.toLowerCase().includes(inputValue)
    );
    setText(event.target.value)
    setFilteredOptions(newFilteredOptions);
  }

  function chooseOption(e,option){
    onOptionSelect(e);
    setText(e.auth_id)

  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td': {
      border: 0,
    },
  }));

  return (
  <Dialog 
  onClose={handleClose} 
  open={open} 
  maxWidth="xl"
  fullWidth={true}
  >

    <DialogTitle>Scegli un Projection System</DialogTitle>
    <TextField id="outlined-basic" 
    label="Proj" variant="outlined"  
    onChange={handleInputChange}
    value={text}
    placeholder={props.value && props.value.auth_id}/>

    

    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, minHeight:200}} 
        aria-label="Pro">
        <TableHead>
          <StyledTableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Auth ID</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        {filteredOptions && filteredOptions.length>0 ?
          (filteredOptions.map((option) => (
            <StyledTableRow
              key={option.name+'-'+option.auth_id+'-'+Math.random()*100}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => chooseOption(option)} 
              hover={true}
            >
              <TableCell component="th" scope="row" >{option.name}</TableCell>
              <TableCell align="center">{option.auth_id}</TableCell>
              
            </StyledTableRow>
          ))): (
          <TableRow className="no-results">
            <TableCell colSpan={2} align="center">No projections available</TableCell>
          </TableRow>
          )}
         
        </TableBody>
      </Table>
    </TableContainer>
    
  </Dialog>   
  )
}

export default SrsDialogSearch;

SrsDialogSearch.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  
};
