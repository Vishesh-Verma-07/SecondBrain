import { ReactElement } from "react"

export function SideBarItem({text, icon} : {
    text: string, 
    icon: ReactElement | string
}){
    return <div className="flex text-gray-700 py-2">
        <div className=" pr-2" >
            {icon}

        </div>
        <div >
            {text}
        </div>

    </div>
}