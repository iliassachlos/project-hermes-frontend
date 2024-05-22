import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "@/utilities/format-date";

function DateCard({articleTime}) {
    return (
        <div className="flex justify-center items-center">
            <FontAwesomeIcon className="text-white" icon={faCalendar}/>
            <h2 className="text-sm mx-2">{formatDate(articleTime)}</h2>
        </div>
    )
}

export default DateCard