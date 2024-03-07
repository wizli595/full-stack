import axios from "axios";
import { useState } from "react";

const CreateComment = ({ postId }) => {
    const [content, setContent] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const result =
                await axios
                    .post(
                        `http://localhost:4001/posts/${postId}/comments`
                        , { content })
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="content">comments</label>
                <input type="text"
                    name="content"
                    onChange={e => setContent(e.target.value)} />
            </div>
            <button type="submit"  >comment</button>
        </form>

    </>);
}

export default CreateComment;