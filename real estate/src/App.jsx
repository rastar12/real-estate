import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Profile from "./pages/profile"
import Header from "./components/header"
import SignUp from "./pages/signUp"
import Footer from "./components/Footer"
import PropertyDetailsPage from './components/viewdetails'
import BookingSection from "./components/bookingSection"
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/property/details" element={<PropertyDetailsPage/>}/>
      <Route path="/bookNow" element={<BookingSection/>}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter>
  )


}

export default App
