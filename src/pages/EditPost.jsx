import React from "react";
import PostForm from "../components/PostForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchPost, updatePost} from "../api/post.jsx";

const EditPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const queryCilent = useQueryClient()
    const {isLoading, isError, data: post, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    });

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryCilent.invalidateQueries({queryKey: ['posts']});
            navigate("/");
        }
    })

    if(isLoading) return <h2>Loading...</h2>;
    if(isError) return `Error: ${error.message}`;

    const handleSubmit = (updatedPost) => {
        // updatePostMutation.mutate(id, ...updatedPost);
        updatePostMutation.mutate({id, ...updatedPost})
    }

    return (
        <div>
            <PostForm onSubmit={handleSubmit} initialValue={post}/>
        </div>
    )
}

export default EditPost