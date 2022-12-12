import {Accordion, Button} from 'react-bootstrap'; 


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


const Calendar1:React.FC = () => {

  return (   
    <div>
      <a href="teacher">  <Button>Back to edit page</Button> </a>
      <br/>
      <br/>
        {DummyData.map(item => 
            <ShopItem key={item.module} item={item} />)}
            
    </div>
  );
}

const ShopItem: React.FC<{
  item: LineData;
}> = function ({ item }) {
  const { module, duedate, reldate, 
    duetime,  reltime, ass, desc } = item
  return (
      <div>
      <p>Module: {module}</p>
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

                  <br/>
      </div>
  )
}
 
export default Calendar1;