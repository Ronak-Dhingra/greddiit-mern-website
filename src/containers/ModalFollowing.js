import React from "react";
import "./ModalFollowers.css";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function ModalFollowing({ setOpenModal }) {
  const [Profile, setProfile] = useState([]);
  const [Edit, setEdit] = useState(false);
  
  useEffect(() => {
    api.get('/api/profile/')
      .then(res => {
        console.log(res.data)
        setProfile(res.data)
      })
      .catch(err => console.error(err));
  }, [Edit]);
  
  const handleRemoveFollowing = async (followingToRemove) => {
    const newFollowing = Profile.following.filter(
      (following) => following.uname !== followingToRemove.uname
    );
    setProfile({ ...Profile, following: newFollowing });
    await api.post(`/api/following/delete/${followingToRemove.uid}`)
    .then(res => {
      console.log(res.data);
    }
    )
    .catch(err => console.error(err));
  };
  
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className="title">
          <h1>Following</h1>
        </div>
        <div className="body">
          {Profile.following?.map((following) => (
            <div>
              <p>{following.uname}</p>
              <button onClick={() => handleRemoveFollowing(following)}>
                Unfollow
              </button>
            </div>
          ))}
        </div>
        <div className="footer">
          <button onClick={() => setOpenModal(false)} id="cancelBtn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}




// import React from "react";
// import "./ModalFollowers.css";
// import { useState, useEffect } from "react";
// import api from "../api/api";

// export default function ModalFollowing({ setOpenModal }) {
//   const [Profile, setProfile] = useState([]);
//   const [Edit, setEdit] = useState(false);
//   useEffect(() => {
//     api.get('/api/profile/')
//       .then(res => {
//         console.log(res.data)
//         setProfile(res.data)
//       })
//       .catch(err => console.error(err));
//   }, [Edit]);
//     return (
//       <div className="modalBackground">
//         <div className="modalContainer">
//           <div className="titleCloseBtn">
//             <button
//               onClick={() => {
//                 setOpenModal(false);
//               }}
//             >
//               X
//             </button>
//           </div>
//           <div className="title">
//             <h1>Following</h1>
//           </div>
//           <div className="body">
//             {/* <p>Abhinav</p>
//             <p>Pranav</p>
//             <p>Sriya</p>
//             <p>Meghana</p>
//             <p>Revanth</p>
//             <p>Anuhya</p> */}
//             {Profile.following?.map((following) => (
//   <p>{following.uname}</p> 
// ))}
//           </div>
//           <div className="footer">
//             <button
//               onClick={() => {
//                 setOpenModal(false);
//               }}
//               id="cancelBtn"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
  