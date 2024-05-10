import {Chip} from "@nextui-org/react";

function InfoAlert({message}) {
    console.log('message',message);
    return (
        <Chip variant="flat" color="success" radius="md">
            {message}
        </Chip>
    );
}

export default InfoAlert
