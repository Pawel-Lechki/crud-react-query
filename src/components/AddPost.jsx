import React from "react";
import Post from "../pages/Post.jsx";
import PostForm from "./PostForm.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPost} from "../api/post.jsx";

const AddPost = () => {
    const queryCilent = useQueryClient()
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryCilent.invalidateQueries({queryKey: ['posts']})
        }
    });

    const handleAddPost = (post) => {
        createPostMutation.mutate({
            id: crypto.randomUUID(),
            ...post
        })
    }
    return (
        <>
            <h2>Add new post</h2>
            <PostForm onSubmit={handleAddPost} initialValue={{}}/>
        </>
    )
}

export default AddPost