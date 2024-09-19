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
import AddProductPage from "./pages/advertismentForm"
import UpdateProductPage from "./components/updateAdvert.jsx"
import AdvertCard from "./pages/advertCard.jsx"
import ShopLandingPage from "./pages/Shop.jsx"
import HeaderDown from "./components/HeaderDown.jsx"
import Add from "./pages/Add.jsx"
import ListingForm from "./pages/listingform.jsx"
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
      <Route path='/advert/:id' element={<AdvertCard/>}/>
      <Route path='/Shop-houseKenya' element={<ShopLandingPage/>}/>
      <Route path='/Add' element={<Add/>}/>
      <Route path='/AddListing' element={<ListingForm/>}/>
      <Route path='/AddAdvert' element={<AddProductPage/>}/>
      <Route path="/update-Advert/:advertId" element={<UpdateProductPage/>}/>

    </Routes>
    <HeaderDown/>
    <Footer/>
    </BrowserRouter>
  )


}

export default App
