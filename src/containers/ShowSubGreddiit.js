import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';

function ShowSubGreddiit() {
    const [subgreddiit, setSubGreddiit] = useState([]);
    const { sg_id } = useParams()
    console.log(sg_id)

    useEffect(() => {
        api.get('/api/mysubgreddiits/show/' + sg_id)
            .then(res => {
                console.log(res.data)
                setSubGreddiit(res.data)
            })
            .catch(err => console.error(err));
    }, []);



    return (
        <>
            <h1>SubGreddiit</h1>
            <h2>{subgreddiit.name}</h2>
            <h3>{subgreddiit.description}</h3>
            <h4>{subgreddiit.tags}</h4>
            <h5>{subgreddiit.banned_words}</h5>

        </>
    );
}

export default ShowSubGreddiit;