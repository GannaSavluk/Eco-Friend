import ACTypes from "../types";

export const isAuthCheck = (id) => ({ type: ACTypes.AUTH, payload: { id: id } })


