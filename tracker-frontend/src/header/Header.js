import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col';
import i18n from '../lang/i18n'

const Header = (props) => {
  
const ver = <span className="version">[{i18n.t("Version", {ns: "label"})}: {props.version}]</span>;

 return(
       <Container className={props.className}>
       <Row>
         <Col>   
           <h3 className='topParag'>{i18n.t("TaskTracker", {ns: "label"})}{ver}</h3>
         </Col>
         <Col className="right">
          <Image src="logo.png" className="logo"  />
         </Col>
       </Row>
     </Container>
 );
}

export default Header;