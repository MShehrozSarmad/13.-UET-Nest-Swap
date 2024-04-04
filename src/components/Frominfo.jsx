import infosvg from '../assets/info.svg';
const Frominfo = () => {
    return (
        <>
            <div className="text-gray-400 text-xs italic flex gap-2 mb-2">
                <img className="" src={infosvg} alt="i" />
                <p>
                    <span>Choose images of same aspect ratio</span><br />
                    <span>Image size must be less than 2 MB</span>
                </p>
            </div>
        </>
    )
}

export default Frominfo