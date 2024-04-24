import ActiveServices from "@/components/admin/home-block/active-services";

function HomeBlock() {
    return (
        <div className="flex flex-col p-2">
            <div className="">
                <h1 className="text-2xl font-bold">Active Services</h1>
                <ActiveServices/>
            </div>
        </div>
    )
}

export default HomeBlock