import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./postCard";

const ListPost = () => {
    const [posts, setPosts] = useState({});
    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/posts");
            setPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    const list = Object.values(posts)
    return (<>
        {
            list.map(post => {
                return (<PostCard key={post.id} post={post} />)
            })
        }

    </>);
}

export default ListPost;