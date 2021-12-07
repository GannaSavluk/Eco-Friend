import { Table, Tag, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import classes from "./DrawerBody.module.css";

import { deleteUserThunk } from "../../store/auth/actions";

const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Confirmed",
    dataIndex: "confirmed",
    key: "confirmed",
    render: (confirmed) => <p>{String(confirmed)}</p>,
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
    render: (author) => (
      <div className={classes.author}>
        <p>{author.name}</p>
        {/* <CloseOutlined onClick={}/> */}
      </div>
    ),
  },
  //   {
  //     title: "Author",
  //     dataIndex: "author",
  //     key: "author",
  //     render: (author) => <a>{author.name}</a>,
  //   },
];

const DrawerBody = ({ mapData }) => {
  console.log(1111, mapData);
  return (
    <Table columns={columns} dataSource={mapData} />
    // <div>
    //   {mapData.map((point) => (
    //     <>
    //       <p>{point.author.name}</p>
    //       {/* <p>{point.author.name}</p> */}

    //       <p>{point.adress}</p>
    //       <p>{point.confirmed}</p>
    //       <p>{point.category}</p>
    //       <a href={point.img}>{point.img}</a>
    //     </>
    //   ))}
    // </div>
  );
};
export default DrawerBody;
