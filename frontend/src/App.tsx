import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import { Signup } from "./Pages/Singup"
import { Signin } from "./Pages/Singin"
import Home from "./Pages/Home"
import Layout from "./Layout"


function App(){
  return <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/signin" element={<Signin />} />
        <Route path = "/Dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>

}


export default App