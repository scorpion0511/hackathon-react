import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
const Header = (props) => {
const ver = <span className="version">[Version: {props.version}]</span>;

 return(
       <Container className={props.className}>
       <Row>
         <Col>   
           <h3 className='topParag'>Task Tracker{ver}</h3>
         </Col>
         <Col className="right">
          <Image src="logo.png" className="logo"  />
         </Col>
       </Row>
     </Container>
 );
}

export default Header;