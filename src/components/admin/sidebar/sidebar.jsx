import {faNewspaper, faGlobe, faUser, faHome,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "@/components/admin/sidebar/sidebar-item";

function Sidebar({onChangeActiveCategory, activeCategory}) {

    return (
        <div className="flex flex-col">
            <SidebarItem
                icon={faHome}
                text="Home"
                category="home"
                onChangeActiveCategory={onChangeActiveCategory}
                active={activeCategory === "home"}
            />
            <SidebarItem
                icon={faGlobe}
                text="Websites"
                category="websites"
                onChangeActiveCategory={onChangeActiveCategory}
                active={activeCategory === "websites"}
            />
            <SidebarItem
                icon={faMagnifyingGlass}
                text="Selectors"
                category="selectors"
                onChangeActiveCategory={onChangeActiveCategory}
                active={activeCategory === "selectors"}
            />
            <SidebarItem
                icon={faNewspaper}
                text="Articles"
                category="articles"
                onChangeActiveCategory={onChangeActiveCategory}
                active={activeCategory === "articles"}
            />
            <SidebarItem
                icon={faUser}
                text="Users"
                category="users"
                onChangeActiveCategory={onChangeActiveCategory}
                active={activeCategory === "users"}
            />
        </div>
    );
}

export default Sidebar