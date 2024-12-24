import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import RegisterPage from './pages/Register';
import HomePage from './pages/HomePage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={< HomePage/>} />
      {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={< SignIn/>} />


    </Route>
  )
)
function App() {

  return (
    <>
            <RouterProvider router={router}/>


        
    </>
  )

}

export default App
