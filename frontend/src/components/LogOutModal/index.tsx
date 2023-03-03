import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ButtonControl from '../Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

import './style.css';

//interface for the props of the modal 
interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CustomModal = ({ open, setOpen }: Props) => {
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  //handle passed to the logout button 
  const handleOpenButton = () => {
    localStorage.removeItem('token');
    navigate('/');
    signOut(auth);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className='custom-modal'>
        <Box className='modal-container'>
          <div className='modal-content'>
            <h3> Are you sure you want to log-out?</h3>
            <div className='buttons'>
              <ButtonControl
                nameClass='button'
                label='Cancel'
                Icon={CancelIcon}
                handleClick={handleClose}
              />
              <ButtonControl
                nameClass='button'
                label='log Out'
                Icon={LogoutIcon}
                handleClick={handleOpenButton}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
