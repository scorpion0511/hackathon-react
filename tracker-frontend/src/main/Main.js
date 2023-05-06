import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Header from '../header/Header'
import ListTasks from './ListTasks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import {useState, useRef, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import $ from 'jquery';
import { properties } from './messageProperties';
import { prjContext } from '../App';

const Main = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [week, setWeek] = useState('');
  const [task, setTask] = useState({name:'',hour:0,min:0,comment:'',myKey:0});
  
  const clearButtonRef = useRef(null);

  

  const update = (event) =>
  {
    //prevent page reload
    event.preventDefault();
    const newTask = updateValues(event);
    if (validate (newTask))
   { 
     setTask(newTask);
     clearButtonRef.current.click();
     setName('');
   }
  }
  const clearBoundedElements = () =>
  {
     setSelectedDate('');
     setName('');
  }
  const handleNameChange = (event) =>
  {
    setName(event.target.value);
  }
  const updateValues = (event)=>
  {
    const task = {name:'',hour:0,min:0,comment:'',myKey:0};
    task.name = name;
    task.hour = event.target.formTaskHour.value;
    task.min = event.target.formTaskMin.value;
    task.comment = event.target.formTaskComment.value;
    return task;
  }
  const populate = (data) => 
  {
    setName(data.name);
    $('#formTaskHour').val(data.hour);
    $('#formTaskMin').val(data.min);
    $('#formTaskComment').val(data.comment);
    task.myKey = data.myKey; 
  }
  
  const validate = (task) =>
  {
    let result = true;
    let error = properties.missingInfo;
    if (task.name.trim() === '') 
    {
      result = false;
      error += properties.missingName;
    }
    
    if (task.hour === '0' && task.min === '0') 
    {
      result = false;
      error += properties.missingTime;
    }
    
    if (selectedDate === '') 
    {
      result = false;
      error += properties.missingDate;
    } 
    if (!result)
    {
      alert(error);
    }
    return result;
  }
    const handleDateChange = (date) => {
    
        const startOfWeek = moment(date).startOf('isoWeek');
        const endOfWeek = moment(date).endOf("isoWeek");
        const weekText = startOfWeek.format("D") + "-" + endOfWeek.format("D") + "/" + startOfWeek.format("MM") + "/" + startOfWeek.format("YYYY");
        setSelectedDate(date);
        setWeek(weekText);

      };
      const identifer  = useContext(prjContext);

    return (
      <Container>
        
        <Header version = {'1.0' + identifer} className='general-border' />
        <Row>
          <Col>
              <Form onSubmit={update} >
                  <Form.Group>
                    <Form.Label>Pick Date</Form.Label> 
                    <DatePicker className='datePicker' 
                    selected={selectedDate} 
                    onChange={date => handleDateChange(date)}/>
                  </Form.Group>
              
               <Form.Group  controlId="formTaskName">
                     <Form.Label>Task Name</Form.Label>
                     <Form.Control type="text"
                        value = {name}
                        onChange={handleNameChange} 
                        placeholder="Enter name or #" />
                </Form.Group>

                <Form.Group controlId="formTaskHour" className="control-inline">
                    <Form.Label className="control-block-label">Hour:Min</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      max="24"
                      className="control-inline"
                      defaultValue='0'/>
                  </Form.Group>

                  <Form.Group controlId="formTaskMin" className="control-inline">
                    <Form.Label className="control-dot">:</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      className="control-inline"
                      max="59"
                   defaultValue = '0' />
              </Form.Group>
              <Form.Group  controlId="formTaskComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text"
                    placeholder="Enter Comment" />
                    <Form.Text className="text-muted">
                          You can write a short comment.
                    </Form.Text>
              </Form.Group>
              <div className='general-border center'>
              <Button type = "submit" className="text-uppercase  btn-outline-danger gap" variant='none' >
              add/update
            </Button>
            <Button ref={clearButtonRef} type = "reset" className="text-uppercase  btn-outline-warning" variant='none'  >
              clear
            </Button>
            </div>

              </Form>

          </Col>
          <Col>
              <ListTasks className = "list-border"  week= {week} clearButtonRef={clearButtonRef} task={task} clearBoundedElements={clearBoundedElements} populate={populate}
              />
          </Col>
        </Row>
        </Container>
    );
  }
  export default Main;
  

