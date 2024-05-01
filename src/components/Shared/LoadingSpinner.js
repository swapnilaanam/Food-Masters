const LoadingSpinner = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <span className="w-10 h-10 border-4 border-green-600 rounded-full  animate-spin relative">
                <span className="border-[8px] -translate-x-1 -translate-y-1 border-white absolute rounded-full"></span>
            </span>
        </div>
    )
}

export default LoadingSpinner;