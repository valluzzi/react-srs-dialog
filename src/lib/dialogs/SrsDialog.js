import { spatial_ref_sys_all as spatialData} from "../data/spatial_ref_sys_all";
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';





const SrsDialog = (props) => {
  const { onClose, open, onOptionSelect } = props;
  const handleClose = () => {
    onClose();
  };

  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleAutocompleteChange = (event, option) => {
    if (option) {
      console.log('sono la option',option);
      onOptionSelect(option.auth_id); 
    }
  };

  function functionProva(e,option){
    console.log(e);
    console.log(option);
  }

  
  const handleInputChange = (event, value)=> {
    const inputValue = value.trim().toLowerCase();

    const newFilteredOptions = spatialData.filter((option) =>
      option.name.toLowerCase().includes(inputValue) || 
      option.auth_id.toLowerCase().includes(inputValue)
    );

    setFilteredOptions(newFilteredOptions);
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  


  return (
  <Dialog 
  onClose={handleClose} 
  open={open} 
  maxWidth="xl"
  fullWidth={true}>

    <DialogTitle>Scegli un Projection System</DialogTitle>
    
    <Autocomplete
      value={props.selectedOption}
      onChange={handleAutocompleteChange}
      disablePortal
      id="combo-box-demo"
      onInputChange={handleInputChange}
      options={spatialData}
      sx={{ width: 300, margin: 3}}
      getOptionLabel={(option) => `${option.auth_id} - ${option.name}`}
      renderInput={(params) => <TextField {...params} value={props.selectedOption} />}
      renderOption={(props, option) => (
        <li className="results" {...props} key={`${option.name}-${option.auth_id}-${Math.random()*100}`}>
        
          {option.auth_id} - {option.name}
        </li>
      )}
    />

    <Grid container spacing={1}>
    {filteredOptions.map((option) => (
      <React.Fragment key={`${option.name}-${option.auth_id}`}>
        <Grid item xs={8} onClick={functionProva}>
          <Item>{option.name}</Item>
        </Grid>
        <Grid item xs={4} onClick={() => handleAutocompleteChange(option)}>
          <Item>{option.auth_id}</Item>
        </Grid>
      </React.Fragment>
        ))}
    </Grid>
    
  </Dialog>   
  )
}

export default SrsDialog;

SrsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  
};
