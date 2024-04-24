import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SidebarItem({icon, text, category, onChangeActiveCategory, active}) {
    return (
        <div
            className={`flex items-center rounded-md p-3 cursor-pointer my-2 ${
                active ? "bg-blue-400 text-white" : ""}`}
            onClick={() => onChangeActiveCategory(category)}
        >
            <FontAwesomeIcon icon={icon}/>
            <h1 className="text-[18px] mx-3">{text}</h1>
        </div>
    );
}

export default SidebarItem