import React from 'react';
import './profile.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const UserDetails = (props) => {
  return (
    <div className='user-details'>
      <div className='user-detail'>
        <PersonIcon className='icon' />
        <h5>{props.user.name}</h5>
      </div>
      <div className='user-detail'>
        <EmailIcon className='icon' />
        <h5>{props.user.email}</h5>
      </div>
      <div className='user-detail'>
        <PhoneIphoneIcon className='icon' />
        <h5>{props.user.number}</h5>
      </div>
    </div>
  )
}

export default UserDetails;