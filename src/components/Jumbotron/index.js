import React from "react";

const Jumbotron = (props) => {
  return (
    <div class=" text-sm-center p-5 bg-light"  style={{margin:"5rem",background:'#fff'}}>
      {props.children}    
    </div>
  );
};

export default Jumbotron;
