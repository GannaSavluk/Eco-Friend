import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { Table, Button } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import classes from "./DrawerBody.module.css";

import { deleteUserThunk } from "../../store/auth/actions";
import {
  confirmPointDataThunk,
  deletePointThunk,
} from "../../store/map/actions";
import DeleteUser from "./DeleteUser";

const DrawerBody = ({ mapData }) => {
  const dispatch = useDispatch();
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const user = useSelector((store) => store.auth.user);
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Confirm",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        setCurrentUserId(id);
        console.log("ID", currentUserId);
        return (
          <>
            <div className={classes.btns}>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(confirmPointDataThunk(id));
                }}
              >
                <CheckOutlined style={{ color: "green" }} />
              </Button>
              <Button
                onClick={() => {
                  setIsOpenDeleteUser(true);
                }}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </div>
            {isOpenDeleteUser && (
              <DeleteUser
                setIsOpenDeleteUser={setIsOpenDeleteUser}
                pointId={id}
                userId={currentUserId}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "adress",
      key: "adress",
      render: (adress) => <p>{adress}</p>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => {
        setCurrentUserId(author?._id);

        return (
          <div className={classes.author}>
            <p>{author?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Picture",
      dataIndex: "img",
      key: "img",
      render: (picture) => <a href={{ picture }}>{"photo"}</a>,
    },
  ];
  const unconfirmedPoints = mapData.filter((point) => !point.confirmed);
  // console.log(1111, unconfirmedPoints);
  return <Table columns={columns} dataSource={unconfirmedPoints} />;
};
export default DrawerBody;
