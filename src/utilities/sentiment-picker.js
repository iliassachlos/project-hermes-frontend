import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {
    faFaceFrown,
    faFaceFrownOpen,
    faFaceMeh,
    faFaceSmile,
    faFaceSmileBeam
} from "@fortawesome/free-regular-svg-icons";

export function sentimentWordPicker(sentimentScore) {
    switch (sentimentScore) {
        case -1:
            return "Not Analyzed"
        case 1:
            return "Very Negative"
        case 2:
            return "Negative"
        case 3:
            return "Neutral"
        case 4:
            return "Positive"
        case 5:
            return "Very Positive"
    }
}

export function sentimentIconPicker(sentimentScore) {
    switch (sentimentScore) {
        case -1:
            return faQuestion
        case 1:
            return faFaceFrown
        case 2:
            return faFaceFrownOpen
        case 3:
            return faFaceMeh
        case 4:
            return faFaceSmile
        case 5:
            return faFaceSmileBeam
    }
}

export function sentimentColorPicker(sentimentScore) {
    //Colors corresponds to NextUI color options
    switch (sentimentScore) {
        case -1:
            return "warning"
        case 1:
            return "danger"
        case 2:
            return "warning"
        case 3:
            return "default"
        case 4:
            return "primary"
        case 5:
            return "success"
    }
}