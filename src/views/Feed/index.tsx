import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cards from "#views/Cards/cards";
import Container from "#views/Container/container";
import AddForm from "#views/Addform/addform";
import './index.css'

interface Post {
    id: number;
    title: string;
    body: string;
    reactions: number;
}

function Feed() {
    const [apiData, setApiData] = useState<Post[]>([]);
    const [localData, setLocalData] = useState<Post[]>([]);
    const [isError, setIsError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<Boolean>(false);


    const getMyPostData = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("https://dummyjson.com/posts");
            setApiData(res.data.posts || []);
            setIsLoading(false);

        } catch (error: any) {
            setIsError(error.message);
        }
    }, [setApiData]);

    useEffect(() => {
        getMyPostData();
        const storedData: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
        setLocalData(storedData);
    }, [getMyPostData]);

    const addNewPost = useCallback((newPost: Post) => {
        setLocalData((prevData) => [newPost, ...prevData]);
    }, [setLocalData]);


    // const deleteLocalPost = (id: number) => {
    //     const updatedLocalData = localData.filter((post) => post.id !== id);
    //     setLocalData(updatedLocalData);
    //     localStorage.setItem('posts', JSON.stringify(updatedLocalData));
    // };

    const deletePost = useCallback(async (id: number) => {
        try {
            const res = await axios.delete(`https://dummyjson.com/posts/${id}`);

            if (res.status === 200) {
                const updatedApiData = apiData.filter((post) => post.id !== id);
                setApiData(updatedApiData);
                return;
            }

        } catch (error: any) {
            if (error.request.status === 404) {
                const updatedLocalData = localData.filter((post) => post.id !== id);
                setLocalData(updatedLocalData);
                localStorage.setItem('posts', JSON.stringify(updatedLocalData));
            }
            setIsError("Local data is deleted!");
        }
    }, [apiData, localData, setApiData, setLocalData, setIsError]);

    const editPost = (editedPost: Post) => {

        const isPostInLocal = localData.some(post => post.id === editedPost.id);
        const isPostInApi = apiData.some(post => post.id === editedPost.id);


        if (isPostInLocal || isPostInApi) {

            const updatedPosts = [...localData, ...apiData].map(post => {
                if (post.id === editedPost.id) {

                    return { ...post, title: editedPost.title, body: editedPost.body };
                }
                return post;
            });


            if (isPostInLocal) {
                const updatedLocalData = updatedPosts.filter(post => localData.some(localPost => localPost.id === post.id));
                setLocalData(updatedLocalData);
                localStorage.setItem('posts', JSON.stringify(updatedLocalData));
            }


            if (isPostInApi) {
                const updatedApiData = updatedPosts.filter(post => apiData.some(apiPost => apiPost.id === post.id));
                setApiData(updatedApiData);


                axios.patch(`https://dummyjson.com/posts/${editedPost.id}`, {
                    title: editedPost.title,
                    body: editedPost.body,
                    reactions: editedPost.reactions,
                }).then(response => {

                    console.log('Post updated successfully:', response.data);

                }).catch(error => {

                    console.error('Error updating post:', error);

                });
            }
        } else {

            console.error('Post not found for editing.');
        }
    };


    const mergedData = [...localData, ...apiData];
    // console.log('api', apiData);
    // console.log('local', localData);
    // console.log('mergedData', mergedData);

    return (
        <Container>
            {isError !== "" && <h2>{isError}</h2>}
            <div className="inp">
                <AddForm addPost={addNewPost} />
            </div>
            {isLoading ? <div className="loading-info">Loading data...</div> : <div className="grid">
                <div className="card-container">
                    {mergedData.map((post) => (
                        <Cards
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                            reactions={post.reactions}
                            handleDelete={deletePost}
                            handleEdit={editPost}

                        />
                    ))}

                </div>

            </div>}

        </Container>
    );
}

export default Feed;
