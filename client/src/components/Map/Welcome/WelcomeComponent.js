import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signinThunk } from "../../../store/auth/actions";
// import { Modal, Button } from "antd";
import { Modal, Button, Space } from "antd";

import { closeWelcomeComponent } from "../../../store/auth/actions";

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

// const config = {
//   title: "Use Hook!",
//   content: (
//     <>
//       <ReachableContext.Consumer>
//         {(name) => `Reachable: ${name}!`}
//       </ReachableContext.Consumer>
//       <br />
//       <UnreachableContext.Consumer>
//         {(name) => `Unreachable: ${name}!`}
//       </UnreachableContext.Consumer>
//     </>
//   ),
// };

const WelcomeComponent = () => {
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    info();
  }, []);

  function info() {
    Modal.info({
      title: "Welcome",
      content: (
        <div>
          <p>If you want to comment and add points to the map, please login!</p>
          <img
            src="https://i.pinimg.com/originals/f9/04/07/f90407a75a3ecff9d8a28b4789a6a54e.gif"
            alt=""
            style={{ width: "250px" }}
          />
        </div>
      ),
      onOk() {
        console.log("");
        dispatch(closeWelcomeComponent());
      },
    });
  }

  return (
    <Space wrap>
      <Button onClick={info}>Info</Button>
    </Space>
  );
  // return (
  //   <div>
  //     {/* <Modal
  //       title="Basic Modal"
  //       visible={true}
  //       // onOk={setIsOpenWelcomeComponent(false)}
  //       // onCancel={handleCancel}
  //     >
  //       <h3>Welcome</h3>
  //       <p>
  //         {" "}
  //         if you want to comment and add points to the map, please{" "}
  //         <Link to="/signin"> signin</Link> or
  //         <Link to="/signup"> signup</Link> right now.
  //       </p>
  //     </Modal> */}
  //   </div>
  // );
};
export default WelcomeComponent;
