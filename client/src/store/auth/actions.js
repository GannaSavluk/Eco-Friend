import ACTypes from "../types";

export const isAuthCheck = (id) => ({
  type: ACTypes.AUTH,
  payload: { id: id },
});
export const checkUserRole = (id, role, name, rating, img) => ({
  type: ACTypes.USER_ROLE,
  payload: { id: id, role: role, name: name, rating: rating, img: img },
});
export const isLogout = (id) => ({ type: ACTypes.AUTH_LOGOUT });

export const saveCurrentImgUser = (img) => ({
  type: ACTypes.CURRENT_IMG_USER,
  payload: { img },
});

export const clearCurrentImg = () => ({ type: ACTypes.CURRENT_IMG_CLEAR });

export const setImg = (img) => ({
  type: ACTypes.SET_IMG,
  payload: { img },
});

// export const getImg = (id) => async (dispatch) => {
//   const response = await fetch("/auth/check-img", {
//     method: "put",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ _id: id }),
//   });
//   const img = await response.json();
//   console.log(img);

//   if (img) dispatch(setImg(img));
// };

export const logoutThunk = () => async (dispatch) => {
  console.log("quit");
  await fetch("/auth/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  dispatch(isAuthCheck(null));
  dispatch(isLogout());
};

export const signinThunk = (values) => async (dispatch, navigate) => {
  console.log("________", { values });
  const response = await fetch("/auth/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const userId = await response.json();

  console.log("userId--->", userId);
  dispatch(isAuthCheck(userId));
  navigate("/");
};

export const signupThunk = (values) => async (dispatch, navigate) => {
  const response = await fetch("/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const userId = await response.json();
  console.log(userId);
  dispatch(isAuthCheck(userId));
  navigate("/");
};

export const checkUserAuthThunk = () => async (dispatch) => {
  const response = await fetch("/auth/check", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const user = await response.json();

  if (user) {
    dispatch(
      checkUserRole(user.id, user.role, user.name, user.rating, user.img)
    );
  }
};

export const deleteUserThunk = (id) => async (dispatch) => {
  await fetch(`/auth/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });
};

export const uploadUserImgThunk = (imgSelected) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", imgSelected);
  formData.append("upload_preset", "bh4tv9ap");

  const sendImg = await fetch(
    `https://api.cloudinary.com/v1_1/dwvm712y7/image/upload`,
    {
      method: "post",
      body: formData,
    }
  );
  const img = await sendImg.json();
  dispatch(saveCurrentImgUser(img));
};

export const changeUserProfilePic = (id, link) => async (dispatch) => {
  const response = await fetch("/auth/img", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, link }),
  });
  dispatch(setImg(link));
};
