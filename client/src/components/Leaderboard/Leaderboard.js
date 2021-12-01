import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, ListGroup } from "react-bootstrap";
import style from "./Leaderboard.module.css";
import {  useSelector } from "react-redux";

const Leaderbord = () => {

  const todo = useSelector((store) => (store.user.todo))
  

   const [massive, setMassive] = useState() 
   const [img, setImg] = useState()


   useEffect(() => {
    imgHandler()
    // const interval = setInterval(() => {
    //   imgHandler()
    // }, 5000); 
    // return () => {clearInterval(interval)}
  }, [])

   const searchHandler = async () => {
    try {
      let res = await fetch("http://localhost:5000");
      
      if (!res.ok) {
        console.log(res);
        throw new Error( res.statusText || res.status );
      }
      
      let data = await res.json();
      // console.log('api',data);
      const cat = data.cat;

      console.log(">!<", cat)
      setMassive(cat[0].name)
      
    } catch (err) {
      console.error(err);
      alert('Произошла ошибка...');
    }
  }

  const imgHandler = async () => {
    try {
      let res = await fetch("https://pixabay.com/api/?key=24601395-dfb4c1c0ad1e4a945dbc42303=yellow+flowers&image_type=photo");
      // let res = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
      if (!res.ok) {
        console.log(res);
        throw new Error( res.statusText || res.status );
      }
      
      let data = await res.json();
      // console.log('api',data);
      

      
      setImg(data.hits[Math.floor(Math.random() * 20)].webformatURL)
      
    } catch (err) {
      console.error(err);
      alert('Произошла ошибка...');
    }
  }

  return (
    <div className="d-flex ">
      <div className="border border-secondary border-5 rounded-3 w-50 p-2 m-1">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button onClick={searchHandler} variant="outline-success">Search</Button>
        </Form>

        <ListGroup className="d-flex mt-1 w-100  ">
          {todo.map((item) => (

          <ListGroup.Item key={item.id} action variant="success">
            <div className="d-flex justify-content-between mt-1">
              <div>{item.item}</div>
              <div>{item.status}</div>
            </div>
          </ListGroup.Item>
          
          ) )}
          <ListGroup.Item action variant="success">
            <div className="d-flex justify-content-between mt-1">
              <div>{massive}</div>
              <div>4.6</div>
            </div>
          </ListGroup.Item>
          
        </ListGroup>
      </div>
      <div className="border border-secondary border-5 rounded-3 w-50 p-2 m-1 ">
      <img src={img} width='100%' height='400px'></img>
      </div>
    </div>
  );
};

export default Leaderbord;
