import UsersCard from "@/components/admin/users-block/users-card";

function UsersBlock() {
    return (
        <div className="flex flex-col p-2">
            <div>
                <h1 className="text-2xl font-semibold">Users</h1>
                <UsersCard/>
            </div>
        </div>
    )
}

export default UsersBlock