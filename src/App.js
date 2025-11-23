
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NavBar from "./components/common/NavBar"
import Error from './Pages/Error';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import toast, { Toaster } from 'react-hot-toast';
import VerifyEmail from './Pages/VerifyEmail';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import MyProfile from './components/core/Dashboard/MyProfile';
import Setting from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
import { Cart } from './components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';

import { AddCourse } from './components/core/Dashboard/AddCourse/idx';
import MyCourses from './components/core/Dashboard/MyCourses';

import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'; 
import { Catalog } from './Pages/Catalog';
import { CourseDetails } from './Pages/CourseDetails';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import ViewCourse from './Pages/ViewCourse';
import Instructor from './components/core/Dashboard/Instructor/Instructor';



function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="App">

 <div>
 {/* <Toaster /> */}
 </div>
      <NavBar></NavBar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='catalog/:catalogName' element={<Catalog/>}/>
        <Route path='courses/:courseId' element={<CourseDetails/>}/>

        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/404NotFound' element={<Error/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='update-password/:id' element={<UpdatePassword/>}/>
      <Route path='verify-email' element={<VerifyEmail/>}/>
      <Route path='about' element={<AboutUs/>}/>
      <Route path='contact' element={<Contact/>}/>

      <Route element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }
      >
        <Route path='dashboard/my-profile' element={<MyProfile/>}/>
        <Route path='dashboard/settings' element={<Setting/>}/>
        
       

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
                  <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}></Route>
                  <Route path = "dashboard/cart" element={<Cart/>}/>
            </>
          )
        }
        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
                  <Route path='dashboard/add-course' element={<AddCourse/>}></Route>
                  <Route path='dashboard/instructor' element={<Instructor/>}/>
                  <Route path='dashboard/my-courses' element={<MyCourses/>}/>
                  <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
                 
            </>
          )
        }
      </Route>

      <Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
                element={<VideoDetails/>}/>
              </>
            )
          }

        </Route>
        
      </Route>

     

     
      </Routes>


            
    </div>
  );
}

export default App;
