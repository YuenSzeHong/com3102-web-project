import {Container} from 'react-bootstrap'; 
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

interface studentinfo{
  id: string
  module: modulelist[]
}

interface modulelist{
  code: string
}

const Dummy:studentinfo = {
  id: 'Thomas',
  module: [
    {code:'COM2001'},
    {code:'ENG1002'},
    {code:'MAT1002'},    
  ]
};


const data: LineData[] = [
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

interface LineItem {
  module?: string,
  duedate?: string,
  reldate?: string,
  duetime?: string,
  reltime?: string,
  ass?: string,
  desc?: string
}

const Calendar1:React.FC = () => {

  const [datashow, datashowList] = useState<LineItem[]>([]);

  function showdata (info:LineData[], student: studentinfo){



    for (let i = 0; i < info.length; i++) {

      if (info[i].module === "undefined"){
        datashowList([...datashow, { module: info[i].module, duedate: info[i].duedate, reldate: info[i].reldate, 
          duetime: info[i].duetime,  reltime: info[i].reltime,  ass: info[i].ass,  desc: info[i].desc,}]);
      }
      else {
           for (let z = 0; z < student.module.length; i++) {

      }
      }
    }
    
  }
  return (   
    <div>
        {data.map(item => 
            <ShopItem key={item.module} item={item} onAdd={() => showdata(data, Dummy)} />)}
    </div>
  );
}

const ShopItem: React.FC<{
  item: LineData;
  onAdd: () => void;
}> = function ({ item, onAdd }) {
  const { module, duedate, reldate, 
    duetime,  reltime, ass, desc } = item
  return (
      <div>
                <p>Module: {module}</p>
                  <p>Release date: {reldate}</p>
                  <p>due date: {duedate}</p>
                  <p>Release time: {reltime}</p>
                  <p>due time: {duetime}</p>
                  <p>Assessment: {ass}</p>
                  <p>Description: {desc}</p>
                  <br/>
      </div>
  )
}
 
export default Calendar1;