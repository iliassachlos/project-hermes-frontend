import {Chip} from "@nextui-org/react";

function ErrorMessage({message}) {
    return (
        <Chip variant="flat" color="danger" radius="md">
            {message}
        </Chip>
    );
}

export default ErrorMessage
