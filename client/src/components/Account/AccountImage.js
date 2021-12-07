import { Card, Button } from "react-bootstrap";
import { Image } from "cloudinary-react";

import {
  changeUserProfilePic,
  uploadUserImgThunk,
  clearCurrentImg,
} from "../../store/auth/actions";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import classes from "./UserProfile.module.css";

function AccountImage(props) {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.auth.currentImg);

  const saveProfilePic = () => {
    let link;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(changeUserProfilePic(props.user.id, link));
      dispatch(clearCurrentImg());
    }
  };
  return (
    <Card>
      <label for="upload_profile_img" className={classes.custom_file_upload}>
        {!currentImg && props.user.img && (
          <div className={classes.container}>
            <Image
              className={classes.imgs}
              src={props.user.img}
              fallback="public/img/rest/green_planet.jpeg"
            />
            <div className={classes.middle}>
              <div className={classes.text}>Change Photo</div>
            </div>
          </div>
        )}
        {!currentImg && !props.user.img && (
          <div className={classes.container}>
            <Image
              className={classes.imgs}
              src="img/rest/green_planet.jpeg"
              fallback="img/rest/green_planet.jpeg"
            />
            <div className={classes.middle}>
              <div className={classes.text}>Change Photo</div>
            </div>
          </div>
        )}
        {currentImg && (
          <>
            <Image
              className={classes.imgs}
              cloudName="dwvm712y7"
              publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                saveProfilePic();
              }}
            >
              Save
            </Button>
          </>
        )}
        <input
          id="upload_profile_img"
          style={{ display: "none" }}
          type="file"
          name="file"
          onChange={(e) => {
            dispatch(uploadUserImgThunk(e.target.files[0]));
          }}
        />
      </label>

      <Card.Body>
        <Card.Title>{props.user.name}</Card.Title>
        <Card.Text>Reputation: {props.user.reputation}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AccountImage;
