import ACTypes from "../types";

// export const showUsersListAC = (userList) => ({
//   type: ACTypes.SHOW_USERS_LIST,
//   payload: { userList },
// });

// export const showUsersListThunk = () => async (dispatch) => {
//   try {
//     const res = await fetch(" http://localhost:3700/user");
//     if (!res.ok) {
//       throw new Error(res.statusText || res.status);
//     }
//     const userList = await res.json();
//     dispatch(showUsersListAC(userList));
//   } catch (err) {
//     console.error(err);
//     alert("Произошла ошибка...");
//   }
// };
