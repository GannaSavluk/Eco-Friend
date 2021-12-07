import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import {
  confirmPointDataThunk,
  deletePointThunk,
} from "../../store/map/actions";

import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteUser = ({ setIsOpenDeleteUser, pointId }) => {
  const dispatch = useDispatch();

  //   showModal = () => {
  //     this.setState({
  //       visible: true,
  //     });
  //   };

  //   hideModal = () => {
  //     this.setState({
  //       visible: false,
  //     });
  //   };
  // const confirm =() =>{
  //     Modal.confirm({
  //       title: 'Confirm',
  //       icon: <ExclamationCircleOutlined />,
  //       content: 'Bla bla ...',
  //       okText: '确认',
  //       cancelText: '取消',
  //     });
  //   }

  return (
    <>
      <Modal
        title="Modal"
        visible={true}
        onOk={() => {
          setIsOpenDeleteUser(false);
          dispatch(deletePointThunk(pointId));
        }}
        onCancel={() => {
          setIsOpenDeleteUser(false);
          dispatch(deletePointThunk(pointId));
        }}
        okText="yes"
        cancelText="no"
      >
        <p>Woud you like to ban user?</p>
      </Modal>
    </>
  );
};

// ReactDOM.render(
//   <Space>
//     <LocalizedModal />
//     <Button onClick={confirm}>Confirm</Button>
//   </Space>,
//   mountNode,
// );
export default DeleteUser;
