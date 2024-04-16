import {
    faComputer,
    faDollarSign,
    faFutbol,
    faLandmark,
    faMugSaucer, faQuestion,
    faStaffSnake
} from "@fortawesome/free-solid-svg-icons";

export function iconSelector(article) {
    switch (article.category) {
        case "politics":
            return faLandmark
        case "economy":
            return faDollarSign
        case "sports":
            return faFutbol
        case "lifestyle":
            return faMugSaucer
        case "health":
            return faStaffSnake
        case "technology":
            return faComputer
        default:
            return faQuestion
    }
}