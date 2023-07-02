import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import PostLists from "./pages/PostLists.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Awsome blog</h1>
        <Routes>
            <Route path="/" element ={<PostLists />}/>
            <Route path="/post/:id" element ={<Post />}/>
            <Route path="/post/:id/edit" element ={<EditPost />}/>
        </Routes>
    </>
  )
}

export default App
