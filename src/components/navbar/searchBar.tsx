export default function SearchBar() {
    return (

        <form className="form relative">
            <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1 ">
                <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                    className="w-5 h-5 text-white-700"
                >
                    <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        stroke-width="1.333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </button>
            <input
                className="input md:w-[400px] rounded-full px-8 py-1.5 border-1 border-white focus:outline-none  placeholder-gray-400 transition-all duration-300 shadow-[0_0_4px_1px_rgba(255,255,255,0.5)] bg-black text-white "
                />

            <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </form>

    )
}