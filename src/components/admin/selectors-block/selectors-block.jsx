import UsersCard from "@/components/admin/users-block/users-card";
import SelectorsCard from "@/components/admin/selectors-block/selectors-card";

function SelectorsBlock() {
    return (
        <div className="flex flex-col p-2">
            <div>
                <h1 className="text-2xl font-semibold">Selectors</h1>
                <SelectorsCard/>
            </div>
        </div>
    )
}

export default SelectorsBlock;