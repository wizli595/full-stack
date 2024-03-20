import CreateComment from "../comments/createComment";
import ListComments from "../comments/listComments";

const PostCard = ({ post }) => {
    return (<>
        <div style={{ border: "1px solid" }}>
            <h2>{post.title}</h2>
            <ListComments comments={post.comments} />
            <CreateComment postId={post.id} />

        </div>
    </>);
}

export default PostCard;   