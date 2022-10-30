import React, { useState } from 'react'; 

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

import './App.css';


function Todolist() {

  const columns = [
    {headerName: 'Date', field: 'date', sortable: true},
    {headerName: 'Description', field: 'description', sortable: true},
    {headerName: 'Priority', field:'priority', sortable: true, filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},
  ]

    const[todo, setTodo] = useState({ description: '', date: '', priority: ''});
    const[todos, setTodos] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const addTodo = () => {
      setTodos([...todos, todo]);
      setTodo({description:'', date:'', priority:''});
    }
    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }

    return(
        <div className="App">
          <input name="description" value={todo.description} onChange={inputChanged} />
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={selectedDate} onChange={date => setSelectedDate(date)} />
            </MuiPickersUtilsProvider>
            <input name="priority" value={todo.priority} onChange={inputChanged} />
            <button onClick={addTodo}>Add</button>
        
            <div className='ag-theme-material' style={{height: 400, width: 700, margin: 'auto'}}>
            <AgGridReact
                rowData={todos}
                columnDefs={columns}>
            </AgGridReact>
            </div>
        </div>
    ); 
}

export default Todolist;