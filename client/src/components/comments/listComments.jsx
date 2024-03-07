import { useEffect, useState } from "react";
import axios from 'axios';
const ListComments = ({ postId }) => {
    const [comments, setComments] = useState({});
    const getData = async () => {
        try {
            const result = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            setComments(result.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const list = Object.values(comments)

    return (<>
        <ul>
            {list.map(comment => {
                return (<li key={comment.id}> {comment.content}</li>)
            })}
        </ul>
    </>);
}

export default ListComments;