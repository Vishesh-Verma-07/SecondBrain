import { ReactElement, ReactNode } from "react"

interface ButtonProps {
    variant: "primary" | "secondary";
    size?: 'sm' | 'md' | 'lg';
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=>void;
    text: ReactNode | string
    fullWidth?: boolean
    loading?: boolean
}


const variantStyle = {
    "primary": "bg-purple-600 hover:bg-purple-800 ",
    "secondary": "bg-purple-200 hover:bg-purple-600 text-purple-400"
}

const defaultStyle = "rounded-lg shadow-lg text-white p-2 px-4 hover:bg-purple-800 transition-all duration-200 flex items-center cursor-pointer"


const Button2 = (props: ButtonProps) => {

  return (
    <button onClick={props.onClick} className={`  ${defaultStyle} ${variantStyle[props.variant]} ${props.fullWidth ? " w-full flex justify-center items-center" : "" }
    ${props.loading ? "opacity-45 ": ""} `} disabled={props.loading}>
        {props.startIcon && (
            <div className="pr-2">
                {props.startIcon}
            </div>
        )}
        {props.text && (
            props.text
        )}
    </button>
  )
}

export { Button2 }