export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const UNMOUNT = "UNMOUNT";
export const CLAIM = "CLAIM";

export const Success = response => ({
  type: SUCCESS,
  response
});
export const Failure = error => ({
  type: FAILURE,
  error
});

export const clearAuthMessages = () => ({
  type: UNMOUNT
});

export const Claim = isAdmin => ({
  type: CLAIM,
  isAdmin
});
