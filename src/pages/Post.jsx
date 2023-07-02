import React from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchPost} from "../api/post.jsx";
import {useNavigate, useParams} from "react-router-dom";

const Post = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {isLoading, isError, data: post, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    });

    if(isLoading) return <h2>Loading...</h2>;
    if(isError) return `Error: ${error.message}`;

    return (
        <div>
            <button onClick={() => navigate('/')}>back to posts list</button>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export default Post