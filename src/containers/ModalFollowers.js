import React, { useState, useEffect } from "react";
import "./ModalFollowers.css";
import api from "../api/api";

export default function ModalFollowers({ setOpenModal }) {
  const [Profile, setProfile] = useState([]);
  const [Edit, setEdit] = useState(false);

  useEffect(() => {
    api
      .get("/api/profile/")
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => console.error(err));
  }, [Edit]);

  const handleRemoveFollower = async (followerToRemove) => {
    const newFollowers = Profile.followers.filter(
      (follower) => follower.uname !== followerToRemove.uname
    );
    setProfile({ ...Profile, followers: newFollowers });
    await api.post(`/api/followers/delete/${followerToRemove.uid}`)
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
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Followers</h1>
        </div>
        <div className="body">
          {Profile.followers?.map((follower) => (
            <div>
              <p>{follower.uname}</p>
              <button onClick={() => handleRemoveFollower(follower)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
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

// export default function ModalFollowers({ setOpenModal }) {
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
//             <h1>Followers</h1>
//           </div>
//           <div className="body">
//             {/* <p>Sanchit</p>
//             <p>Kartik</p>
//             <p>Siddharth</p>
//             <p>Abhijeeth</p>
//             <p>Swetha</p> */}
//             {Profile.followers?.map((follower) => (
//   <p>{follower.uname}</p> 
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
  