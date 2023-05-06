import Container from 'react-bootstrap/Container';
import { prjContext } from '../App';
import React, { useContext } from 'react';
import $ from 'jquery';

const About = () =>
{  
  const loadRemote = (e) => {
    fetch('https://wallpaperstock.net/nice-scenery-trees--lake_wallpapers_45090_1920x1080_1.html', {
      method: "GET",
      headers: {
        accept: "text/html",
      },
    })
      .then((response) => response.text())
      .then(data =>   {
        const x = $.parseHTML(data);
        $('#ibm').html(x);
      })
      .catch((error) => alert(error));
  };
//loadRemote();
  const identifer  = useContext(prjContext);
  return (<Container> This is a Hackathon project V1.0 for  {identifer}
  <div id="ibm"></div>
  </Container>);
}; 
export default About;