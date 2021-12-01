import ACTypes from "../types";

export const isAuthCheck = (id) => ({
  type: ACTypes.AUTH,
  payload: { id: id },
});
export const checkUserRole = (id, role, name) => ({
  type: ACTypes.USER_ROLE,
  payload: { id: id, role: role, name: name },
});

export const logoutThunk = () => async (dispatch) => {
  console.log("quit");
  await fetch("/auth/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  dispatch(isAuthCheck(null));
};

export const signinThunk = (values) => async (dispatch, navigate) => {
  console.log({ values });
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

  if (user) dispatch(checkUserRole(user.id, user.role, user.name));
};
