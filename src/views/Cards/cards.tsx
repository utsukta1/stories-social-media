import { useState } from 'react';
import Button from '#views/Button/button';
import './cards.css';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

interface CardProps {
    id: number;
    title: string;
    body: string;
    reactions: number;
    handleDelete: (id: number) => void;
    handleEdit: (editedPost: Post) => void;
}

interface Post {
    id: number;
    title: string;
    body: string;
    reactions: number;
}

function Cards({ id, title, body, reactions, handleDelete, handleEdit }: CardProps) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedBody, setEditedBody] = useState(body);

    const handleView = () => {
        navigate(`/single/${id}`);
    };

    const onDeleteClick = () => {
        handleDelete(id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        handleEdit({
            id,
            title: editedTitle,
            body: editedBody,
            reactions,
        });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedTitle(title);
        setEditedBody(body);
        setIsEditing(false);
    };

    return (
        <div key={id} className="card">

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                        rows={10}
                    ></textarea>
                    <div className='editbtn'><Button onClick={handleSaveClick} title="Save" />
                        <Button onClick={handleCancelClick} title="Cancel" /></div>

                </>
            ) : (
                <>
                    <h2>{title.toUpperCase()}</h2>
                    <p>{body}</p>
                    <p>Reactions: {reactions}</p>
                    <div className="button-container">
                        <IoMdEye onClick={handleView} title="view" className="btns" />
                        <AiTwotoneDelete onClick={onDeleteClick} title="delete" className="btns" />
                        <FaEdit onClick={handleEditClick} title="Edit" className="btns" />
                    </div>

                </>
            )}
        </div>
    );
}

export default Cards;
