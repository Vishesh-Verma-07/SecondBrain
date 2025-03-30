

export default function Header(){
    return <div className="w-screen fixed top-0 h-12 bg-amber-600 px-10 py-2 flex justify-between">
        <div className="flex bg-amber-300 px-4 py-1 ">
            <div className="mx-2">
                logo
            </div>
            <div className="mx-2">
                title
            </div>
        </div>
        <div className="flex bg-amber-300 px-4 py-1 ">
            <div className="mx-2">
                dark 
            </div>
            <div className="mx-2">
                Signin
            </div>
        </div>
    </div>
}