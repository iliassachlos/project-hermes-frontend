function categoryColorPicker(category){
    switch (category) {
        case "politics":
            return "bg-blue-200"
        case "economy":
            return "bg-purple-200"
        case "sports":
            return "bg-green-200"
        case "lifestyle":
            return "bg-yellow-200"
        case "health":
            return "bg-cyan-200"
        case "technology":
            return "bg-lime-200"
        default:
            return "bg-gray-200"
    }
}