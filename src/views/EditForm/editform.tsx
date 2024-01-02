// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Container from '#views/Container/container';

// interface Post {
//     id: number;
//     title: string;
//     body: string;
//     reactions: number;
// }



// function EditForm({ handleEdit }: { handleEdit: (editedPost: Post) => void }) {
//     const { postId } = useParams<{ postId: string }>();
//     const navigate = useNavigate();
//     const [post, setPost] = useState<Post>({
//         id: 0,
//         title: '',
//         body: '',
//         reactions: 0,
//     });

//     useEffect(() => {
//         // Fetch the post details based on the postId from the API
//         const fetchPostDetails = async () => {
//             try {
//                 const res = await axios.get<Post>(`https://dummyjson.com/posts/${postId}`);
//                 setPost(res.data);
//             } catch (error) {
//                 console.error('Error fetching post details:', error);
//             }
//         };

//         fetchPostDetails();
//     }, [postId]);

//     const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPost({ ...post, title: e.target.value });
//     };

//     const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setPost({ ...post, body: e.target.value });
//     };

//     const handleEditSubmit = async () => {
//         try {
//             // Make an API call to update the post details using the correct HTTP method (POST or PUT)
//             await axios.put(`https://dummyjson.com/posts/${postId}`, post);
//             // Call the handleEdit function passed from the parent component to update the post in the parent component state
//             handleEdit(post);
//             // Navigate to the post details page after editing
//             navigate(`/single/${postId}`);
//         } catch (error) {
//             console.error('Error editing post:', error);
//             // Handle error scenarios (display error messages, etc.)
//         }
//     };

//     return (
//         <Container>
//             <div>
//                 <h2>Edit Post</h2>
//                 <form onSubmit={handleEditSubmit}>
//                     <div>
//                         <label>Title:</label>
//                         <input type="text" value={post.title} onChange={handleTitleChange} />
//                     </div>
//                     <div>
//                         <label>Body:</label>
//                         <textarea value={post.body} onChange={handleBodyChange}></textarea>
//                     </div>
//                     <button type="submit">Save Changes</button>
//                 </form>
//             </div>
//         </Container>
//     );
// }

// export default EditForm;