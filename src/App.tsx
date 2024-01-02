import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Feed from "#views/Feed";
import Profile from "#views/Profile/profile";

import './App.css';
import Single from '#views/Single/single';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Feed />} />
      <Route path='profile' element={<Profile />} />
      <Route path='single/:postId' element={<Single />} />



    </Route>

  )
);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
