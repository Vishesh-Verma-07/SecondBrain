interface inputInterface {
    onChange: ()=>void;
    placeholder: string
}

export function Input({onChange, placeholder} : inputInterface){
    return <div>
        <input type="text" placeholder = {placeholder} className="px-4 py-2 border rounded m-2" onChange={onChange} />
    </div>
}

