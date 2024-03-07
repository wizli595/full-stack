import { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTile] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:4000/posts", { title });
            console.log(result);
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">title</label>
                <input type="text"
                    name="title"
                    value={title}
                    onChange={e => setTile(e.target.value)} />
            </div>
            <div>
                <button type='submit'>create</button>
            </div>
        </form>

    </>);
}

export default PostCreate;