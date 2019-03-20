export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const UNMOUNT = "UNMOUNT";



export const Success = response => ({
  type: SUCCESS,
  response
});
export const Failure = error => ({
  type: FAILURE,
  error
});

export const clearAuthMessages = () => ({
  type: UNMOUNT,
});