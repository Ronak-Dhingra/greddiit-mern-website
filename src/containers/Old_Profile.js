// import React, { useState} from 'react';
// import './Profile.css';
// import pp_logo from '../profile.png';
// import Logout from './Logout';
// import Button from "react-bootstrap/Button";
// import ModalFollowers from "./ModalFollowers";
// import ModalFollowing from './ModalFollowing';

// import { useEffect } from 'react';
// import api from '../api/api';

// export default function Profile() {
//   const [Profile, setProfile] = useState([]);
//   const [Edit, setEdit] = useState(false);
//   const [modalOpen1, setModalOpen1] = useState(false);
//   const [modalOpen2, setModalOpen2] = useState(false);
//   useEffect(() => {
//     api.get('/api/profile/')
//       .then(res => {
//         console.log(res.data)
//         setProfile(res.data)
//       })
//       .catch(err => console.error(err));
//   }, [Edit]);
//   return (
//     <div className="ProfilePage">
//       <div className="pp">
//       <img src={pp_logo} className="pp-logo" alt="pp-logo" width="250" height="250"/>
//         <br></br>
//         <br></br>
//         <h1>Profile Page</h1>
//         <p className="text-muted"> First Name: {Profile.fname} </p>
//         <p className="text-muted"> Last Name: {Profile.lname} </p>
//         <p className="text-muted"> User Name: {Profile.uname} </p>
//         <p className="text-muted"> Email: {Profile.email} </p>
//         <p className="text-muted"> Age: {Profile.age} </p>
//         <p className="text-muted"> Contact Number: {Profile.contact} </p>
//         <p className="text-muted"> Password: ******* </p>
        // <p className='text-muted'>Followers</p>
        // <Button className="openModalBtn" onClick={() => {setModalOpen1(true);}}>5</Button>
        // <br></br>
        // <br></br>
        // {modalOpen1 && <ModalFollowers setOpenModal={setModalOpen1} />}
        // <p className='text-muted'>Following</p>
        // <Button className="openModalBtn" onClick={() => {setModalOpen2(true);}}>6</Button>
        // <br></br>
        // <br></br>
        // {modalOpen2 && <ModalFollowing setOpenModal={setModalOpen2} />}
//         {/* <br></br> */}
//         <Logout/>
//       </div>
//     </div>
//   );
// }