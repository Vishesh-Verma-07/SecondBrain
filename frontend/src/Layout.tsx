import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";


export default function Layout(){
    return (
        <div className="absolute"> 
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}