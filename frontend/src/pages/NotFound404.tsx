import { Link } from "react-router-dom"

export default function NotFound404() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-white">
            <div className="text-8xl">Error 404</div>
            <div className="text-2xl">This page does not exists, invalid url!</div>
            <Link to="/" className="mt-1 text-xl text-blue-600 hover:text-blue-700 duration-300">Go back to home page</Link>
        </div>
    )
}