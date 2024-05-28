import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

function DateDropdown({onFetchSentimentData}) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="flat" color="primary">Desired Date Range</Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Action event example"
                onAction={(key) => onFetchSentimentData(key)}
            >
                <DropdownItem key="3">3 days ago</DropdownItem>
                <DropdownItem key="7">A week ago</DropdownItem>
                <DropdownItem key="30">A month ago</DropdownItem>
                <DropdownItem key="90">3 month ago</DropdownItem>
                <DropdownItem key="180">6 month ago</DropdownItem>
                <DropdownItem key="365">A year ago</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DateDropdown;