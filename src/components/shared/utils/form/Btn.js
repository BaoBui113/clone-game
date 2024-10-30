

const Btn = ({text, onClick})=> {
    return (
        <div onClick={onClick} className="flex items-center justify-center w-full text-white h-10 cursor-pointer bg-[#3C3C3C] rounded-xl px-3">
            {text}
        </div>
    )
}

export default Btn