import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Container from '#views/Container/container';
import { useParams } from 'react-router-dom';


interface Post {
    id: number;
    title: string;
    body: string;
    reactions: number;
}

function Single() {
    const { postId } = useParams<{ postId: string }>();
    const [postData, setPostData] = useState<Post>({
        id: 0,
        title: '',
        body: '',
        reactions: 0,
    });
    const [isError, setIsError] = useState<string>('');

    const getPostData = useCallback(async () => {
        try {
            const storedData: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
            const postFromLocal = storedData.find((post) => post.id.toString() === postId);
            if (postFromLocal) {
                setPostData(postFromLocal);
            } else {
                const res = await axios.get(`https://dummyjson.com/posts/${postId}`);
                setPostData(res.data);
            }
        } catch (error: any) {
            setIsError(error.message);
        }
    }, [setPostData]);

    useEffect(() => {
        getPostData();
    }, [postId, getPostData]);


    return (
        <Container>
            {isError !== '' ? (
                <h2>{isError}</h2>
            ) : (
                <div key={postData.id} className="card">
                    <h2>{postData.title.toUpperCase()}</h2>
                    <p>{postData.body}</p>
                    <p>Reactions: {postData.reactions}</p>

                </div>
            )}
        </Container>
    );
}

export default Single;
