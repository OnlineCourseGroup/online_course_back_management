export const confirm = ({
  msg,
  ok,
  unok,
}) => {
  this.$confirm(msg)
    .then(() => { // eslint-disable-line
      ok();
    })
    .catch(() => unok());// eslint-disable-line
};
export const success = (message) => {
  window.Vue.$message = ({
    message,
    type: 'success',
  });
};
export const warning = (message) => {
  window.Vue.$message = ({
    message,
    type: 'warning',
  });
};
export const error = (message) => {
  window.Vue.$message = ({
    message,
    type: 'error',
  });
};
export const info = (message) => {
  window.Vue.$message = (message);
};
