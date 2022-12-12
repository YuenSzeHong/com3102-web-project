import {Accordion, Button} from 'react-bootstrap'; 
import { useState } from 'react';



interface LineData {
  module?: string,
  duedate?: string,
  reldate?: string,
  duetime?: string,
  reltime?: string,
  ass?: string,
  desc?: string
}


const DummyData: LineData[] = [
  {
    module: 'COM2001',
    ass: "project"  
  },
  {
    module: 'COM1001',
    ass: "gg" 
  },
  {
    module: "ENG1002",
    duedate: "12/4",
    reldate: "12/5",
    duetime: "12:00",
    reltime: "12:00",
    ass: "test",
    desc: "range: P.1-3"
  },
  {
    duedate: "6/4",
    reldate: "9/5",
    duetime: "10:00",
    reltime: "13:00",
    ass: "open day",
    desc: "very happy"
  },
];

interface DataShow {
    module?: string,
    duedate?: string,
    reldate?: string,
    duetime?: string,
    reltime?: string,
    ass?: string,
    desc?: string
  }


const Calendar1:React.FC = () => {

    const [Data, setData] = useState<DataShow[]>([]);


    

    function removeItem(index: number) {
        DummyData.splice(index, 1);
        setData([...Data]);       
      }


  return (   
    <div>
      <a href="admin">  <Button>Back to admin page</Button> </a>
      <a href="adminevent">  <Button>Go to add event page</Button> </a>
      <br/>
      <br/>
        {DummyData.map((item, index) => 
            <ShopItem key={item.module} item={item} onRemove={() => removeItem(index)}/>)}
            
    </div>
  );
}

const ShopItem: React.FC<{
  item: LineData;
  onRemove: () => void;
  
}> = function ({ item, onRemove, }) {
  const { module, duedate, reldate, 
    duetime,  reltime, ass, desc } = item
  return (
      <div>
      <p>Module: {module}</p>

      <Button onClick={onRemove}>Remove event</Button>  
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header><p>Assessment: {ass}</p></Accordion.Header>
        <Accordion.Body>
        <p>Release date: {reldate}</p>
        <p>Due date: {duedate}</p>
        <p>Release time: {reltime}</p>
       <p>Due time: {duetime}</p>
        <p>Description: {desc}</p>

        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

                  
      </div>
  )
}
 
export default Calendar1;