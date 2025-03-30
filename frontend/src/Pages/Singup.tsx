
import Button from "../components/ui/Button"
import {Input} from "../components/ui/InputComponent"

export function Signup(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 flex justify-center items-center flex-col p-8">
           <Input placeholder="username" />
           <Input placeholder="password" />
            <div className="pt-4">
                <Button variant="primary" text = "signup"  fullWidth={true} loading= {false}/>

            </div>
        </div>
    </div>
}