import {Button,Container,Row,Col} from 'react-bootstrap'; 
import { useState } from 'react';
import DataTable from 'react-data-table-component';

interface userlist {
    id: string,
    type: string
  }

  const columns = [
    {
        name: 'ID',
        selector: (row:userlist) => row.id,
        sortable: true,
    },
    {
        name: 'Type',
        selector: (row:userlist) => row.type,
        sortable: true,
    },
];

  const DummyData: userlist[] = [
    {

        id: "Peter",
        type: "public"
    },
    {
        id: "Tom",
        type: "teacher" 
    },
    {
        id: "Thomas",
        type: "student" 
    },
    {
        id: "Zach",
        type: "student"  
    },    
    {
        id: "Sally",
        type: "teacher" 
    },    {
        id: "God",
        type: "public"
    }
  ];


  
const Calendar1:React.FC = () => {

    return (   
      <div>
        <DataTable
            columns={columns}
            data={DummyData}
        />
        <a href="admin"> <Button>Go back admin page</Button> </a>

      </div>
    );
  }
  
   
  export default Calendar1;