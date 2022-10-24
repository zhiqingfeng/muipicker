import React, { useState } from 'react'; 

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import moment from 'moment';


function Todolist() {

  const columns = [
    {headerName: 'Date', field: 'date', sortable: true},
    {headerName: 'Description', field: 'description', sortable: true},
    {headerName: 'Priority', field:'priority', sortable: true, filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},
  ]

    const[todo, setTodo] = useState({ description: '', date: '', priority: ''});
    const[todos, setTodos] = useState([]); 

    const [selectedDate, handleDateChange] = useState(new Date());
    
    const addTodo = () => {
      setTodos([...todos, todo])
    }
    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <h1>Simple todo list</h1>
            <Stack 
            spacing={2}
            direction='row'
            alignItems='center'
            justifyContent='center'
            >
                <TextField
                    label='Description'
                    variant='standard'
                    name='description'
                    value={todo.description}
                    onChange={inputChanged} />

                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker value={selectedDate} onChange={handleDateChange} />
                      <TimePicker value={selectedDate} onChange={handleDateChange} />
                      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>


                <TextField
                    label='Priority'
                    variant='standard'
                    name='priority'
                    value={todo.priority}
                    onChange={inputChanged}
                />
                <Button onClick={addTodo} variant="contained">Add</Button>
            </Stack>
            <div className='ag-theme-material' style={{height: 400, width: 700, margin: 'auto'}}>
            <AgGridReact
                rowData={todos}
                columnDefs={columns}
            />
        </div>
           
        
        </div>
    ); 
}

export default Todolist;