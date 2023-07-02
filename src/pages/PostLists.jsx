import React from "react";
import AddPost from "../components/AddPost.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePost, fetchPosts} from "../api/post.jsx";
import {useNavigate} from "react-router-dom";



const PostLists = () => {
    const navigate = useNavigate();
    const queryCilent = useQueryClient()
    const {isLoading, isError, data: posts, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    });

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryCilent.invalidateQueries({queryKey: ['posts']});
        }
    })

    if(isLoading) return <h2>Loading...</h2>;
    if(isError) return `Error: ${error.message}`;
    // console.log(data)

    const handleDelete = (id) => {
        // console.log(id);
        deletePostMutation.mutate(id)
    }


    return (
        <div>
            <AddPost />
            {posts.map(post => (
                <div key={post.id} style={{background: "#777"}}>
                    <h4 onClick={() => navigate(`/post/${post.id}`)} style={{cursor: "pointer"}}>
                        {post.title}
                    </h4>
                    {/*<p>{post.body}</p>*/}
                    <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default PostLists