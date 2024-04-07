import {Input} from "@nextui-org/react";

function SearchBar() {

    return (
        <Input
            className="mx-4 md:mx-44 lg:mx-72 2xl:mx-[700px] my-2"
            type="text"
            label="Search.."
            variant=""
            isClearable
        />
    )
}

export default SearchBar