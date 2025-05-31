import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SearchBar() {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    }

    return (
        <form className="form relative" onSubmit={handleSearch}>
            <button
                type="submit"
                className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
            >
                <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                    className="w-5 h-5 text-black"
                >
                    <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        strokeWidth="1.333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            </button>

            <input
                className="input md:w-[400px] rounded-full px-3 pl-8  md:px-8 py-1 md:py-1.5 border-1 border-white focus:outline-none  placeholder-gray-400 transition-all duration-300  bg-white text-black"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />

            <button
                type="reset"
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                onClick={() => setQuery("")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </form>
    )
}
