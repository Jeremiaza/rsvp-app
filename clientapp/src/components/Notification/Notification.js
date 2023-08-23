import React from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearNotification } from '../../reducers/notificationReducer';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props) => {
  const dispatch = useDispatch();
  const { message, notificationType } = props;
  const handleClose = (e) => {
    dispatch(clearNotification())
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!message}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={notificationType || "info"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.notification
}
const mapDispatchToProps = {
  clearNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)