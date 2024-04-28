import ActiveServices from "@/components/admin/home-block/active-services";
import WebsitesCard from "@/components/admin/websites-block/websites-card";
import {Button} from "@nextui-org/react";
import {useState} from "react";
import AddWebsiteModal from "@/components/admin/websites-block/modals/add-website-modal";

function WebsitesBlock() {
    const [isAddWebsiteModalOpen, setIsAddWebsiteModalOpen] = useState(false);

    function addWebsiteModalHandler() {
        setIsAddWebsiteModalOpen(!isAddWebsiteModalOpen)
    }

    return (
        <div className="flex flex-col p-2">
            {isAddWebsiteModalOpen &&
                <AddWebsiteModal
                    isAddWebsiteModalOpen={isAddWebsiteModalOpen}
                    onAddWebsiteModalHandler={addWebsiteModalHandler}
                />
            }
            <div>
                <h1 className="text-2xl font-bold">Websites</h1>
                <Button
                    className="my-2"
                    radius="md"
                    variant="solid"
                    color="primary"
                    onClick={addWebsiteModalHandler}
                >
                    Add Website
                </Button>
                <WebsitesCard/>
            </div>
        </div>
    )
}

export default WebsitesBlock