import {useState} from 'react';
import Button from 'react-bootstrap/Button';

const Miscellaneous = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter1 = () => {
    setCounter(aCounter => aCounter + 1 );
  };
  
  return (
    <>
      <p>Counter Value: {counter}</p>
      <Button className="btn-outline-danger" variant='warning'  onClick={incrementCounter1}>Increment1</Button>
    </>
  );
}
export default Miscellaneous;
