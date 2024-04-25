import ActiveServices from "@/components/admin/home-block/active-services";
import WebsitesCard from "@/components/admin/websites-block/websites-card";

function WebsitesBlock() {
    return (
        <div className="flex flex-col p-2">
            <div className="">
                <h1 className="text-2xl font-bold">Websites</h1>
                <WebsitesCard/>
            </div>
        </div>
    )
}

export default WebsitesBlock