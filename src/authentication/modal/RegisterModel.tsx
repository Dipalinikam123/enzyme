import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RegisterForm from '../forms/RegisterForm';
import LoginForm from '../forms/LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface RegisterModelProps {
  handleOpen: () => void;
  handleClose: () => void;
  handleFlag: () => void;
  open: boolean;
  modalFlag: boolean;
}

export default class RegisterModel extends Component<RegisterModelProps> {
  render() {
    const { handleClose, open, handleFlag, modalFlag, handleOpen } = this.props;
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Register Form
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {
                modalFlag ? <RegisterForm /> : <LoginForm />
              }
            </Typography>
            {
              modalFlag ?
                <Button
                  variant="outlined"
                  sx={{ float: 'right' }}
                  onClick={handleClose}
                >
                  Register
                </Button> :
                <Button
                  variant="outlined"
                  sx={{ float: 'right' }}
                  onClick={handleClose}
                >
                  Login
                </Button>

            }
            <Button
              variant="outlined"
              sx={{ float: 'right' }}
              onClick={handleClose}
            >
              Close
            </Button>
            {
              modalFlag ? <Typography>Already Have Account? <span role='button' onClick={handleOpen}>Login</span></Typography> :
                <Typography>Don't have Account? <span role='button' onClick={handleFlag}>Register</span></Typography>
            }
          </Box>
        </Modal>
      </div>
    )
  }
}
