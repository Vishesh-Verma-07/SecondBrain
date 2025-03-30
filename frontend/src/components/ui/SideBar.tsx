import BrainIcon from "../../icons/Brain";
import TwitterIcon from "../../icons/Twitter";
import YoutubeIcon from "../../icons/Youtube";
import { SideBarItem } from "./SideBarItem";


export function Sidebar(){
    return <div className="h-screen bg-white border-r-2 w-64 fixed pl-6 pt-4">
        <div className="flex text-2xl">
            <BrainIcon/>
            <div className="pl-2">
                Second Brain

            </div>
        </div>
        <div className="pt-4 pl-6">
            <SideBarItem text={"Twitter"} icon={<TwitterIcon />} />
            <SideBarItem text={"Youtube"} icon={<YoutubeIcon />} />

        </div>
    </div>
}