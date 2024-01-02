import { useState } from 'react';
import axios from 'axios';
import Button from '#views/Button/button';
import './addform.css';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    reactions: number;
}

interface AddFormProps {
    addPost: (post: Post) => void;
}

function AddForm({ addPost }: AddFormProps) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleAdd = async () => {
        try {
            const newPost: Post = {
                id: 0,
                title,
                userId: 5,
                body,
                reactions: 4,
            };

            const response = await axios.post<Post>('https://dummyjson.com/posts/add', newPost, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('New post added:', response.data);

            const updatedPost = { ...response.data, id: generateUniqueId() };
            addPost(updatedPost);


            const existingPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
            const updatedPosts = [updatedPost, ...existingPosts];
            console.log('id updated:', updatedPost);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            setTitle('');
            setBody('');
        } catch (error: any) {
            console.error('Error adding new post:', error.message);
        }

    };

    const generateUniqueId = (): number => {
        return Math.floor(Math.random() * 1000) + 1;
    };

    return (
        <div className="social-input">
            <div className="input-container">
                <input
                    type="text"
                    className="input-title"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    className="input-text"
                    placeholder="What's on your mind?"
                    rows={1}
                    value={body}
                    onChange={handleBodyChange}
                ></textarea>
                <div className="input-actions">
                    <Button onClick={handleAdd} title="Share" />
                </div>
            </div>
        </div>
    );
}

export default AddForm;
