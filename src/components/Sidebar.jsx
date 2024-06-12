/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Sidebar = ({ sidebarLinks, isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <div className="flex relative z-50">
            <div className={`bg-gray-800 text-white w-64 md:block ${isSidebarOpen ? "absolute top-0 bottom-0 overflow-y-auto" : "hidden"}`}>
                {sidebarLinks.map((section, index) => (
                    <div key={index} className="p-4">
                        {section.title && <div key={index} className="font-bold">
                            {section.title}
                            <hr />
                        </div>}
                        <ul className="mt-2 flex flex-col">
                            {section?.links?.map((link, i) => (
                                <Link key={i} className="mb-2 text-center border border-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-black hover:duration-300 py-1.5 font-bold rounded-lg group" onClick={() => setIsSidebarOpen(false)} to={link.path}>
                                    {link.name}
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar