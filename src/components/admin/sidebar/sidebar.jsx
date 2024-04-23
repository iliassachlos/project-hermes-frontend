import {faNewspaper, faGlobe, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Sidebar({onChangeActiveCategory}) {

    return (
        <div className="flex flex-col">
            <div
                className="flex items-center rounded-md p-3 hover:bg-gray-200 ease-in duration-200 cursor-pointer"
                onClick={() => onChangeActiveCategory("websites")}
            >
                <FontAwesomeIcon icon={faGlobe}/>
                <h1 className="text-xl mx-3">Websites</h1>
            </div>
            <div
                className="flex items-center rounded-md p-3 hover:bg-gray-200 ease-in duration-200 cursor-pointer"
                onClick={() => onChangeActiveCategory("articles")}
            >
                <FontAwesomeIcon icon={faNewspaper}/>
                <h1 className="text-xl mx-3">Articles</h1>
            </div>
            <div
                className="flex items-center rounded-md p-3 hover:bg-gray-200 ease-in duration-200 cursor-pointer"
                onClick={() => onChangeActiveCategory("users")}
            >
                <FontAwesomeIcon icon={faUser}/>
                <h1 className="text-xl mx-3">Users</h1>
            </div>
        </div>
    )
}

export default Sidebar