import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import signUp from "./pages/signUp"
import profile from "./pages/profile"
import Profile from "./pages/profile"
import Header from "./components/header"
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/sign-up " element={<signUp/>}/>
    </Routes>
    </BrowserRouter>
  )


}

export default App
