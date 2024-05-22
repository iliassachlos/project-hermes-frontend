import {Chip} from "@nextui-org/react";
import {sentimentWordPicker, sentimentIconPicker, sentimentColorPicker} from "@/utilities/sentiment-picker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SentimentCard({sentimentScore}) {
    return (
        <Chip color={sentimentColorPicker(sentimentScore)} radius="md">
            <FontAwesomeIcon icon={sentimentIconPicker(sentimentScore)}/>
            <span className="text-center mx-2">{sentimentWordPicker(sentimentScore)}</span>
        </Chip>
    )
}

export default SentimentCard