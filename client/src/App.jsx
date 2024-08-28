import {BrowserRouter,Routes,Route} from "react-router-dom"

import About from "./pages/about"
import Profile from "./pages/profile.jsx"
import Header from "./components/header.jsx"
import SignUp from "./pages/signUp"
import Footer from "./components/Footer"
import Login from "./pages/signin.jsx"
import Listings from "./pages/listings.jsx"
import UpdateListing from './components/updateListing.jsx'
import Search from "./pages/search.jsx"
import Home from "./pages/home.jsx"
import { UpdateProfile } from "./pages/UpdateProfile.jsx"
import ContactPage from "./pages/ContactPage.jsx"
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/update-profile' element={<UpdateProfile/>}/> 
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/listing/:listingId" element={<Listings/>}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
      <Route path='search' element={<Search/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )


}

export default App
