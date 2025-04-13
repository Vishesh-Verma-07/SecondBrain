import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Signup  from "./Pages/Singup"
import Signin  from "./Pages/Singin"
import Home from "./Pages/Home"
import { ThemeProvider } from "./components/ui/themeProvider"
import { Toaster } from "./components/ui/toaster"


function App(){
  return (
    // <QueryClientProvider client={queryClient}>
       <ThemeProvider defaultTheme="dark">
        {/* <TooltipProvider> */}
          <Toaster />
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path = "/signup" element={<Signup />} />
              <Route path = "/signin" element={<Signin />} />
              <Route path = "/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        {/* </TooltipProvider> */}
    </ThemeProvider>
  // </QueryClientProvider>
  )

}


export default App