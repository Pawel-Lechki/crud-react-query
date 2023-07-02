import React, {useState} from "react";

const PostForm = ({onSubmit, initialValue}) => {
    const [post, setPost] = useState({
        title: initialValue.title || "",
        body: initialValue.body || ""
    })

    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <input type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} onChange={handleChangeInput} />
        </div>
    )

    const handleChangeInput = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    // console.log(post)

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(post);
        console.log(post)
        setPost({
            title: "",
            body: ""
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderField('Title')}
            {renderField('Body')}
            <button type="Submit">Submit</button>
        </form>
    )
}

export default PostForm