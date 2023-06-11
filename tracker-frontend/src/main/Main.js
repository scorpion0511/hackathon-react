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
import i18n from "i18next";
import { prjContext } from '../App';
import LanguageSelect from '../commoncomponents/LanguageSelect';

const Main = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [key, setKey] = useState(0);
  const [included, setIncluded] = useState(true);
  const [week, setWeek] = useState('');
  const [task, setTask] = useState({id:null, name:'',hour:0,min:0,comment:'',myKey:0, included:true});
  
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
   }
  }
  const handleIncludeChange = (event) =>
  {
    setIncluded(!included);
  }


  const updateValues = (event)=>
  {
    const newTask = {...task};
    newTask.name = event.target.formTaskName.value;
    newTask.hour = event.target.formTaskHour.value;
    newTask.min = event.target.formTaskMin.value;
    newTask.comment = event.target.formTaskComment.value;
    newTask.myKey = key;
    newTask.included = included;
    return newTask;
  }
  const populate = (data) => 
  {
    $('#formTaskName').val(data.name);
    $('#formTaskHour').val(data.hour);
    $('#formTaskMin').val(data.min);
    $('#formTaskComment').val(data.comment);
    setKey(data.myKey); 
    setIncluded(data.included);
  }

  const clearAll = () =>
  {
    clearElements();
    setSelectedDate('');
  }
  const clearElements = () =>
  {
    $('#formTaskName').val('');
    $('#formTaskHour').val(0);
    $('#formTaskMin').val(0);
    $('#formTaskComment').val('');
    setKey(0);
    setIncluded(true);
  }

  const validate = (task) =>
  {
    let result = true; 
    let error = i18n.t("main.MissingInfo", {ns: "message"});
    if (task.name.trim() === '') 
    {
      result = false;
      error += i18n.t('main.MissingName', {ns: "message"});
    }
    
    if (task.hour === '0' && task.min === '0') 
    {
      result = false;
      error += i18n.t('main.MissingTime', {ns: "message"});
    }
    
    if (selectedDate === '') 
    {
      result = false;
      error += i18n.t('main.MissingDate', {ns: "message"});
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

        
          <Col md={5}>
            <LanguageSelect/>          

              <Form onSubmit={update} >
                  <Form.Group>
                    <Form.Label>{i18n.t("main.PickDate", {ns:"label"})}</Form.Label> 
                    <DatePicker className='datePicker' 
                    selected={selectedDate} 
                    onChange={date => handleDateChange(date)}/>
                  </Form.Group>
              <Row>
                <Col>
               <Form.Group  className= "taskName" controlId="formTaskName">
                     <Form.Label>{i18n.t("main.TaskName", {ns:"label"})}</Form.Label>
                     <Form.Control type="text"
                        placeholder={i18n.t("main.EnterName", {ns:"label"})} />
                </Form.Group>
                </Col><Col>
                <Form.Group  controlId="formTaskInclude">
                <Form.Label>{i18n.t("main.TaskCounted", {ns:"label"})}</Form.Label>
                     <Form.Control className="includeCheckBox" type="checkbox"
                        checked = {included}
                        onChange={handleIncludeChange} 
                     />
                </Form.Group></Col>
                </Row>
                <Form.Group controlId="formTaskHour" className="control-inline">
                    <Form.Label className="control-block-label">{i18n.t("main.Hour", {ns:"label"})}</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      max="24"
                      className="control-inline"
                      defaultValue='0'/>
                  </Form.Group>

                  <Form.Group controlId="formTaskMin" className="control-inline">
                    <Form.Label className="control-dot">{i18n.t("main.Minute", {ns:"label"})}</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      className="control-inline"
                      max="59"
                   defaultValue = '0' />
              </Form.Group>
              <Form.Group  controlId="formTaskComment">
                    <Form.Label>{i18n.t("main.Comment", {ns:"label"})}</Form.Label>
                    <Form.Control type="text"
                    placeholder={i18n.t("main.EnterComment", {ns: "label"})}/>
                    <Form.Text className="text-muted">
                          {i18n.t("main.ShortComment", {ns: "label"})}
                    </Form.Text>
              </Form.Group>
              <div className='general-border center'>
              <Button type = "submit" className="text-uppercase  btn-outline-danger gap" variant='none' >
              {i18n.t("main.AddUpdate", {ns: "label"})}
            </Button>
            <Button ref={clearButtonRef} type = "reset" className="text-uppercase  btn-outline-warning" variant='none'  onClick={clearElements}>
            {i18n.t("main.Clear", {ns: "label"})}
            </Button>
            </div>

              </Form>

          </Col>
          <Col md={7}>
              <ListTasks className = "list-border"  clearAll= {clearAll} week= {week} clearButtonRef={clearButtonRef} task={task} populate={populate}
              />
          </Col>
        </Row>
        </Container>
    );
  }
  export default Main;
  

