const Loader = () => {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                    className="animate-spin"
                    version="1.1"
                    viewBox="0 0 64 64"
                    width="3em"
                    xmlns="http://www.w3.org/2000/svg"
                    id="spinner"
                >
                    <circle
                        className="path-gradient"
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="url(#sGD)"
                        strokeWidth="8"
                    />
                    <path
                        className="path-solid"
                        d="M 32,4 A 28 28,0,0,0,32,60"
                        fill="none"
                        stroke="#000"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="32" y1="0" x2="32" y2="64">
                            <stop stopColor="#000" offset="0.1" stopOpacity="0" className="stop1"></stop>
                            <stop stopColor="#000" offset=".9" stopOpacity="1" className="stop2"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div className="text-gray-600 text-lg">Please wait</div>
            </div>
        </div>

    )
}

export default Loader