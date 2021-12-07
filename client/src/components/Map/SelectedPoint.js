import { useSelector, useDispatch } from "react-redux";

import { Popup } from "react-map-gl";

import classes from "./SelectedPoint.module.css";
import { Card, Button, Progress } from "antd";

import { confirmPointDataThunk } from "../../store/map/actions";

const { Meta } = Card;

const SelectedPoint = ({ selectedMapPoint, setSelectedMapPoint }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  // console.log("selectedMapPoint", selectedMapPoint.properties.pointId);
  return (
    <Popup
      latitude={selectedMapPoint?.geometry.coordinates[1]}
      longitude={selectedMapPoint?.geometry.coordinates[0]}
      onClose={() => {
        setSelectedMapPoint(null);
      }}
    >
      <div className={classes.confirm_info}>
        {selectedMapPoint.properties.confirmed ? (
          <Progress type="circle" percent={100} width={50} />
        ) : (
          <Progress type="circle" percent={50} width={50} />
        )}
      {!selectedMapPoint.properties.confirmed && 

        (user?.role === 0 ? (
          <Button
            className={classes.confirmed_btn}
            type="primary"
            danger
            onClick={() => {
              dispatch(
                confirmPointDataThunk(selectedMapPoint.properties.pointId)
              );
              console.log('(((((selectedMapPoint)))))',selectedMapPoint)
              setSelectedMapPoint({...selectedMapPoint, properties : {...selectedMapPoint.properties, confirmed: true }})
            }}
          >
            Сonfirm
          </Button>
        ) : (
          <Button className={classes.confirmed_btn} type="primary" danger>
            Awaiting confirmation
          </Button>
        ))
      }
      </div>
      <Card
        className={classes.card}
        hoverable
        style={{ width: 240 }}
        cover={
          selectedMapPoint?.properties.img ? (
            <img alt="" src={selectedMapPoint?.properties.img} />
          ) : (
            <img
              alt=""
              src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            />
          )
        }
      >
        <Meta
          title={selectedMapPoint?.properties.category}
          description={selectedMapPoint?.properties.adress}
        />
      </Card>
    </Popup>
  );
};

export default SelectedPoint;
