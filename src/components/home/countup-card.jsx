import {Chip} from "@nextui-org/react";
import CountUp from "react-countup";

function CountupCard({start, end, message}) {
    return (
        <div className="text-black dark:text-white">
            <CountUp className="font-semibold text-xl" start={start} end={end} duration={5}/>
            <h2>{message}</h2>
        </div>
    )
}

export default CountupCard