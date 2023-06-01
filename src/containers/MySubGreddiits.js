import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


function MySubGreddiits() {
  const nav = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [subgreddiits, setSubgreddiits] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    banned_words: '',
  });

  useEffect(() => {
    api.get('/api/mysubgreddiits/getmy')
      .then(res => {
        console.log(res.data)
        setSubgreddiits(res.data)
      })
      .catch(err => console.error(err));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    api.post('/api/mysubgreddiits/create', formData)
      .then(res => {
        console.log(res.data)
        setShowForm(false)
      })
      .catch(err => console.error(err));
  }

  const handleDelete = (subgreddiit) => {
    console.log(subgreddiit);
    api.delete('/api/mysubgreddiits/delete/' + subgreddiit._id)
      .then(res => {
        console.log(res.data)
        setShowForm(false)
        setSubgreddiits(subgreddiits.filter(sg => sg._id !== subgreddiit._id))
      })
      .catch(err => console.error(err));
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }
  const DisplayForm = () => {
    return (
      <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
        </label>
        <label>
          Banned words:
          <input type="text" name="banned_words" value={formData.banned_words} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowForm(false)}>Cancel</button>
      </>

    );
  }
    const Normal = () => {
      return (
        <>
          <button onClick={() => setShowForm(true)}>Create a SubGreddiit</button>
        </>
  
      );
    }
    const DisplaySubGreddiits = () => {
      return (
        <>

          {subgreddiits?.map((subgreddiit) => (
            <div>
              <h1>{subgreddiit.name}</h1>
              <p>Description: {subgreddiit.description}</p>
              <p>Tags: {subgreddiit.tags.join(', ')}</p>
              <p>Banned Words: {subgreddiit.banned_words.join(', ')}</p>
              <p>Number of Posts: {subgreddiit.posts.length}</p>
              <p>Number of users: {subgreddiit.users.filter(user => user.status === 'Joined' || user.status === 'Moderator').length}</p>
              <button onClick={() => handleDelete(subgreddiit) }>Delete Subgreddiit</button>
              <button onClick={() => nav("/showsubgreddiit/" + subgreddiit._id)}>View Subgreddiit</button>
            </div>
          ))}
        </>
      );
    }




  return (
    <>
    <div>
      {showForm ? DisplayForm() : Normal()}
    </div>
    <div>
      {DisplaySubGreddiits()}
    </div>
    </>
  );
}


export default MySubGreddiits;
