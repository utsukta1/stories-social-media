import './button.css'

interface ButtonProps {

    title: string,
    onClick: () => void,
}



function Button({ title, onClick }: ButtonProps) {
    return (
        <>

            <button className='btn' type="button" onClick={onClick}>{title}</button>
        </>
    )
}

export default Button;