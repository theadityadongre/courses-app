import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import Signin from './Signin'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <div style={{width: "100vw", height: "100vh", backgroundColor: "#eeeeee"}}>

    <RecoilRoot>
      <Router>
          <Appbar />
        <Routes>
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </RecoilRoot>
    </div>
  )
}


export default App
