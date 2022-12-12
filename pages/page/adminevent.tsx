// App.js 
 
import {Button,Container,Row,Col} from 'react-bootstrap'; 
import { useState } from 'react';


interface LineData {
  module: string,
  duedate: string,
  reldate: string,
  duetime: string,
  reltime: string,
  ass: string,
  desc: string
}

const Calendar1:React.FC = () => {
  const [module, moduleSet] = useState<string>("");
  const [duedate, duedateSet] = useState<string>("");
  const [reldate, reldateSet] = useState<string>("");
  const [duetime, duetimeSet] = useState<string>("");
  const [reltime, reltimeSet] = useState<string>("");
  const [ass, assSet] = useState<string>("");
  const [desc, descSet] = useState<string>("");

  const [Data, setData] = useState<LineData[]>([]);

  function add() {
    setData([...Data, { module:module, duedate:duedate, reldate:reldate, duetime:duetime, reltime:reltime, ass:ass, desc:desc}]);
    duedateSet("");
    reldateSet("");
    duetimeSet("");
    reltimeSet("");
    assSet("");
    descSet("");  
    moduleSet("");
}

function removeItem(index: number) {
  Data.splice(index, 1);
  setData([...Data]);
}
  

  return (   
    <div>      
      <h1 className='text-center'>HSU calendar app</h1>
      <a href="modulemanagement"> <Button>Go back last page</Button> </a>
      <a href="admin"> <Button>Go back admin page</Button> </a>
      <br/>
      <br/>
      
      <Container>
        <Row>
          <Col>
          <p>Please input the data you need</p>
        <label>Module-group  &nbsp;</label>
      <input type='text' value={module} placeholder="COM0000" onChange={x => moduleSet(x.target.value)}/>
      <br/>
      <label>Release date &nbsp;</label>
      <input type='date' value={reldate} onChange={x => reldateSet(x.target.value)}/>
      <br/>
      <label>Due date &nbsp;</label>
      <input type='date' value={duedate} onChange={x => duedateSet(x.target.value)}/>
      <br/>
      <label>Release time &nbsp;</label>
      <input type='time' value={reltime} onChange={x => reltimeSet(x.target.value)}/>
      <br/>
      <label>Due time &nbsp;</label>
      <input type='time' value={duetime} onChange={x => duetimeSet(x.target.value)}/>
      <br/>
      <label>Assessment &nbsp;</label>
      <input type='text' value={ass} onChange={x => assSet(x.target.value)}/>
      <br/>
      <label>Description &nbsp;</label>
      <input type='text' value={desc} onChange={x => descSet(x.target.value)}/>
      <br/>
      <Button onClick={add}>insert event</Button>
      </Col>
      <Col>
      {Data.map((item, index) =>
                <CartItem
                    key={item.duedate}
                    item={item}
                    onRemove={() => removeItem(index)}
                    
                />)}
                </Col>
                </Row>
                </Container>
    </div>
  );
}

const CartItem: React.FC<{
  item: LineData;
  onRemove: () => void;

}> = function ({
  item: lineData,
  onRemove,
}) {
      const {module, reldate, duedate, duetime, reltime, ass, desc} = lineData

          return (
              <div>
                <p>Module: {module}</p>
                  <p>Release date: {reldate}</p>
                  <p>due date: {duedate}</p>
                  <p>Release time: {reltime}</p>
                  <p>due time: {duetime}</p>
                  <p>Assessment: {ass}</p>
                  <p>Description: {desc}</p>
                  <Button onClick={onRemove}>Remove event</Button>                 
              </div>              
          )
          
          
      

  }


 
export default Calendar1;