import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import i18n from "i18next";

const ListTasks = (props) => {
const [tasks, setTasks] = useState([]);
const [message, setMessage] = useState('');
const [weekId, setWeekId] = useState(0);
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
        setSelectedRowHighlighted(-1);
      }

      const listView = () =>
      {
        let display = '';
         const myTasks = aggregateTasks();
         myTasks.forEach(element => {
          if (element.hour > 0)
          {
              display += element.name + ": " + element.hour.toFixed(2) + "\n";
          }
          else
          {
            display += element.name + ": 0." + element.min + "\n";
          }
         });
         alert(display);
      }

      const aggregateTasks = () =>
      {
        const aggregatedArray = [];
    
        tasks.forEach(item => {
        const index = aggregatedArray.findIndex(x => x.name.toUpperCase() === item.name.toUpperCase());
        if (item.name.length > 0)
        {
          let hr = isNaN(parseInt(item.hour)) ? 0 : parseInt(item.hour);
          const mn = isNaN(parseInt(item.min)) ? 0 : parseInt(item.min);
    
            if (index === -1) 
            {
              aggregatedArray.push({ name: item.name, hour: hr + mn/60, min: 0 });
            } 
            else 
            {
              aggregatedArray[index].min  = aggregatedArray[index].min + mn;
              aggregatedArray[index].hour  = aggregatedArray[index].hour + hr + aggregatedArray[index].min/60;
              aggregatedArray[index].min = 0;
            }
        }
      });
      return aggregatedArray;
      }
      const calculateHour = (myTasks) =>
      {
        const sum = myTasks.reduce((accumulator , currentValue) => 
        {
            const value = Boolean(currentValue.included) === true ? parseInt(currentValue.hour) : 0 ;
            if (isNaN(value)) 
            {
              return accumulator;
            } 
            else
            {
              return accumulator + value;
            }
        }, 0);
        return sum;
      }
      const calculateMin = (myTasks) =>
      {
        const sum = myTasks.reduce((accumulator , currentValue) => 
        {
            const value = Boolean(currentValue.included) === true ? parseInt(currentValue.min) : 0 ;
            if (isNaN(value)) 
            {
              return accumulator;
            } 
            else
            {
              return accumulator + value;
            }
        }, 0);
        return sum;
      }
      const calculateAndDisplay = () =>
      {
          alert(calculate(tasks));
      }
      const calculate = (myTasks) =>
      {
          const minToHours = calculateMin(myTasks) / 60 ;
          const hours = calculateHour(myTasks) + minToHours;
          return(hours.toFixed(2) + ' Hours');
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
         if (newTasks[i].name.toUpperCase() == props.task.name.toUpperCase() && newTasks[i].myKey == props.task.myKey && props.task.myKey !==0) 
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
    const msg = i18n.t('savedData', {ns: "message"}).replace("[0]", `[${id}]`);
    setMessage(msg);
    setTimeout( () => {setMessage('');}, 3000);
   }

   const clear = () =>
   {
     props.clearButtonRef.current.click();
     setTasks([]);
     setWeekId(0);
     props.clearAll();
     setSelectedRowHighlighted(-1);
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
       <Button className="text-uppercase btn-outline-success  btn-sm "  variant='none' onClick={calculateAndDisplay}>
            {i18n.t("calculate", {ns: "label"})}
      </Button>
      </Col>
      
      <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm "  variant='none' onClick={listView}>
      {i18n.t("list", {ns: "label"})}
      </Button>
      </Col>
      <Col>
      <Button className="text-uppercase  btn-outline-dark  btn-sm " variant='none' onClick={save} >
      {i18n.t("save", {ns: "label"})}
            </Button>
            </Col>
      <Col>
       <Button className="text-uppercase btn-outline-danger  btn-sm "  variant='none' onClick={deleteRow}>
       {i18n.t("remove", {ns: "label"})}
      </Button>
      </Col>
      <Col>
       <Button className="text-uppercase btn-outline-primary  btn-sm "  variant='none' onClick={close}>
       {i18n.t("close", {ns: "label"})}
      </Button>
      </Col>

      <Col>
       <Button className="text-uppercase btn-outline-warning  btn-sm "  variant='none' onClick={load}>
       {i18n.t("load", {ns: "label"})}
      </Button>
      </Col>
      </Row>
    </Container>
  );
};
export default ListTasks;