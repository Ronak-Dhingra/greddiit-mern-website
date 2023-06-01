import React, { useState} from 'react';
import './Profile.css';
import pp_logo from '../profile.png';
import Logout from './Logout';
import Button from "react-bootstrap/Button";
import ModalFollowers from "./ModalFollowers";
import ModalFollowing from './ModalFollowing';

import { useEffect } from 'react';
import api from '../api/api';

export default function Profile() {
  const [Profile, setProfile] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
    age: '',
    contact: '',
  });

  useEffect(() => {
    api.get('/api/profile/')
      .then(res => {
        console.log(res.data)
        setProfile(res.data)
      })
      .catch(err => console.error(err));
  }, [Edit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    api.post('/api/profile/edit', formData)
      .then(res => {
        console.log(res.data)
        setProfile(res.data)
        setEdit(false)
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="ProfilePage">
      <div className="pp">
      <img src={pp_logo} className="pp-logo" alt="pp-logo" width="250" height="250"/>
        <br></br>
        <br></br>
        <h1>Profile Page</h1>
        <p className="text-muted"> First Name: 
          {Edit ?
            <input type="text" name="fname" value={formData.fname} onChange={handleInputChange} />
            :
            Profile.fname
          }
        </p>
        <p className="text-muted"> Last Name: 
          {Edit ?
            <input type="text" name="lname" value={formData.lname} onChange={handleInputChange} />
            :
            Profile.lname
          }
        </p>
        <p className="text-muted"> User Name: 
          {Edit ?
            <input type="text" name="uname" value={formData.uname} onChange={handleInputChange} />
            :
            Profile.uname
          }
        </p>
        <p className="text-muted"> Email: 
          {Edit ?
            <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
            :
            Profile.email
          }
        </p>
        <p className="text-muted"> Age: 
          {Edit ?
            <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
            :
            Profile.age
          }
        </p>
        <p className="text-muted"> Contact:
          {Edit ?
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
            :
            Profile.contact
          }
        </p>
       
        <br></br>
        <br></br>
        <div className="button">
          <Button variant="primary" onClick={() => setEdit(true)}>Edit</Button>
          <Button variant="primary" onClick={() => setEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </div>
        <br></br>
        <br></br>
        <p className='text-muted'>Followers</p>
        <Button className="openModalBtn" onClick={() => {setModalOpen1(true);}}>{Profile.followers ? Profile.followers.length : 0}</Button>
        <br></br>
        <br></br>
        {modalOpen1 && <ModalFollowers setOpenModal={setModalOpen1} />}
        <p className='text-muted'>Following</p>
        <Button className="openModalBtn" onClick={() => {setModalOpen2(true);}}>{Profile.following ? Profile.following.length : 0}</Button>
        <br></br>
        <br></br>
        {modalOpen2 && <ModalFollowing setOpenModal={setModalOpen2} />}
        <br></br>
        <br></br>
        <Logout />
      </div>
    </div>
  );
}










