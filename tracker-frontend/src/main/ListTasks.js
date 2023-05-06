import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { properties } from './messageProperties';

const ListTasks = (props) => {
const [tasks, setTasks] = useState([]);
const [message, setMessage] = useState('');
const [weekId, setWeekId] = useState(0);
const [remoteApp, setRemoteApp] = useState('');
const [selectedRowHighlighted, setSelectedRowHighlighted] = useState('');


useEffect(() => {
      if (props.week.trim().length > 0)
      {
            const newTasks = updateMatchingRow ();
            setTasks(newTasks);
            clearSelection();
      }
      }, [props.task]);

      const clearSelection = () =>
      {
        setSelectedRowHighlighted('');
      }
const save = (e) => {
  const week = props.week;
  const id = weekId !== "undefined" ? weekId : 0;

  return fetch("http://localhost:8500/tracker/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, week, tasks }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => 
    {
      setWeekId(data);
      setATimedMessage(data);
    })
    .catch((error) => alert(error));
};


    
      const load = (e) => {
        if (
          props.week == "" ||
          props.week === "undefined" ||
          props.week === null
        ) {
          alert("Please, Enter Date");
          return;
        }
        fetch(`http://localhost:8500/tracker/api/get?week=${props.week}`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const { id, tasks } = data; //deconstruct
            setTasks(tasks);
            if (id === 0 || id === null) {
              alert("Week doesn't exist.");
            }
            setWeekId(id);
          })
          .catch((error) => alert(error));
      };
const updateMatchingRow = () =>
{
       let newTasks = [...tasks];
       let foundIt = false;
       for (let i = 0; i < tasks.length; i++) {
         if (newTasks[i].name.toUpperCase() == props.task.name.toUpperCase()) 
         {
            newTasks[i] = copy(props.task);
            foundIt = true;
            break;
         }
       }
       if (!foundIt && props.task.name.trim().length > 0)
       {
        newTasks = [copy(props.task), ...tasks]
       }
       return newTasks;
   }
  //  const copy = (task) =>
  //  {
  //     const copy = {};
  //     copy.name =  task.name;
  //     copy.hour = task.hour;
  //     copy.min = task.min;
  //     copy.comment = task.comment;
  //     copy.myKey = task.myKey === 0 ? Date.now() : task.myKey;
  //     return copy;
  //  }  
   const copy = (task) =>
   {
     const copy = {...task};
     copy.myKey = task.myKey === 0 ? Date.now() : task.myKey;
     return copy;
   }   
   const close = (event) =>
   {
    save(event)
    .then(data => 
      {
        console.log('dd');
        clear();
      });
   }
   const deleteRow = () =>
    {
      tasks.splice(selectedRowHighlighted, 1);
      setSelectedRowHighlighted(-1);
    }
   const setATimedMessage = (id) =>
   {
    const msg = properties.savedData.replace("[0]", `[${id}]`);
    setMessage(msg);
    setTimeout( () => {setMessage('');}, 3000);
   }

   const clear = () =>
   {
     props.clearButtonRef.current.click();
     setTasks([]);
     setWeekId(0);
     props.clearBoundedElements();
   }
 
  return (
  <Container className={props.className}>
    <div id="messageId" className='messageArea'>{message}</div>
    <div style={{ height: '320px', overflowY: 'scroll' }}>
      <ListGroup>
        {tasks.map((text, index) => (
          <ListGroup.Item 

          style={{
            
            fontWeight: selectedRowHighlighted === index ? 'bold' : 'normal',

            backgroundColor: selectedRowHighlighted === index ? 'cyan' : 'white'
          }}
          
          onDoubleClick={() => {props.populate(text);setSelectedRowHighlighted(index);}}  

          onClick={() => setSelectedRowHighlighted(index)} 

          key={index}>{text.name}-{text.hour}:{text.min}[{text.comment}]
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      <Row className='App'>
       <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' >
            calculate
      </Button>
      </Col>
      
      <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' >
            list
      </Button>
      </Col>
      <Col>
      <Button className="text-uppercase  btn-outline-dark  btn-sm gap" variant='none' onClick={save} >
              save
            </Button>
            </Col>
      <Col>
       <Button className="text-uppercase btn-outline-danger  btn-sm gap"  variant='none' onClick={deleteRow}>
            Remove
      </Button>
      </Col>
      <Col>
       <Button className="text-uppercase btn-outline-primary  btn-sm gap"  variant='none' onClick={close}>
            close
      </Button>
      </Col>

      <Col>
       <Button className="text-uppercase btn-outline-warning  btn-sm gap"  variant='none' onClick={load}>
            load
      </Button>
      </Col>
      </Row>
    </Container>
  );
};
export default ListTasks;