import { useEffect, useState } from "react";
import axios from 'axios';
const ListComments = ({ comments }) => {
    return (<>
        <ul>
            {comments.map(comment => {
                return (<li key={comment.id}> {comment.content}</li>)
            })}
        </ul>
    </>);
}

export default ListComments;