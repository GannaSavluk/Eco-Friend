import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, ListGroup } from "react-bootstrap";
// import style from "./Leaderboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showUsersListThunk } from "../../store/usersList/actions";
import Carousel from "./Carousel/Carousel";
import LeaderProfile from "./LeaderProfile/LeaderProfile";
import "./Leaderboard.css";

const Leaderboard = () => {
  const data = useSelector((store) => store.userList.userList);
  console.log("users--->", data);

  const [value, setValue] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(
      data.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [value, data]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUsersListThunk(data));
  }, []);

  const quantity = data.length;
  console.log("col", quantity);
  return (
    <div>
      <div className="top">
        <Carousel />
      </div>
      <div className="d-flex ">
        <div className="border border-secondary border-5 rounded-3 w-50 p-2 m-1 ">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2 w-75"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {/* <Button variant="outline-success">Search</Button> */}
            <div>
              {" "}
              <p>We already have:</p> {quantity} people
            </div>
          </Form>

          <ListGroup className="d-flex mt-1 w-100 scroll">
            {filter.map((user) => (
              <ListGroup.Item
                key={user._id}
                action
                variant="success"
                id="list-example"
                class="list-group"
              >
                <div
                  className=" d-flex justify-content-between mt-1 "
                  data-bs-spy="scroll"
                >
                  <div>{user.name}</div>
                  <span  class="badge bg-primary rounded-pill">{user.rating}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="border border-secondary  border-5 rounded-3 w-50 p-2 m-1 ">
          <img
            src="https://cdn.pixabay.com/photo/2021/11/26/20/44/lantern-6826687_640.jpg"
            width="100%"
            height="400px"
            alt="img"
          ></img>
          {/* <img src={img} width='100%' height='400px' alt="img"></img> */}
        </div>
      </div>
      <LeaderProfile />
    </div>
  );
};

export default Leaderboard;

// const [img, setImg] = useState()

//  useEffect(() => {
//   imgHandler()
//   const interval = setInterval(() => {
//     imgHandler()
//   }, 5000);
//   return () => {clearInterval(interval)}
// }, [])
// const imgHandler = async () => {
//   try {
//     let res = await fetch("https://pixabay.com/api/?key=24601395-dfb4c1c0ad1e4a945dbc42303=yellow+flowers&image_type=photo");
//     let res = await fetch("http://localhost:3700/img");

//     if (!res.ok) {
//       console.log("api>>>>".res);
//       throw new Error( res.statusText || res.status );
//     }

//     let data = await res.json();
//     console.log('api',data);

//     setImg(data.cat[Math.floor(Math.random() * 20)].name)

//   } catch (err) {
//     console.error(err);
//     alert('Произошла ошибка...');
//   }
// }
