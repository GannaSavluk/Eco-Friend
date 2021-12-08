import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import {
  confirmPointDataThunk,
  deletePointThunk,
} from "../../store/map/actions";
import { deleteUserThunk, logoutThunk } from "../../store/auth/actions";

import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteUser = ({ setIsOpenDeleteUser, pointId, userId }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const adminId = user.id;
  console.log("adminId", adminId, 'userId', userId);

  return (
    <>
      <Modal
        title="Modal"
        visible={true}
        onOk={() => {
          setIsOpenDeleteUser(false);
          dispatch(deletePointThunk(pointId));
          dispatch(deleteUserThunk(adminId, userId));
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
