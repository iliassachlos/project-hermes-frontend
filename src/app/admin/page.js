'use client'
import {Button, Divider} from "@nextui-org/react";
import Sidebar from "@/components/admin/sidebar/sidebar";
import {useState} from "react";
import WebsitesBlock from "@/components/admin/websites-block/websites-block";
import ArticlesBlock from "@/components/admin/articles-block/articles-block";
import UsersBlock from "@/components/admin/users-block/users-block";
import HomeBlock from "@/components/admin/home-block/home-block";
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'
import SelectorsBlock from "@/components/admin/selectors-block/selectors-block";

function AdminPage() {
    const [activeCategory, setActiveCategory] = useState("articles");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function changeActiveCategory(category) {
        setActiveCategory(category);
    }

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className="flex flex-col md:flex-row">
            <Drawer open={isSidebarOpen} onClose={toggleSidebar} direction="left">
                <Sidebar onChangeActiveCategory={changeActiveCategory} activeCategory={activeCategory}/>
            </Drawer>
            <div className="text-center md:hidden p-2">
                <Button variant="faded" onClick={() => toggleSidebar()}>Open Sidebar</Button>
                <Divider className="my-2"/>
            </div>
            <div className="hidden md:block md:w-[20%] md:2xl:w-[10%] md:h-screen p-2">
                <Sidebar onChangeActiveCategory={changeActiveCategory} activeCategory={activeCategory}/>
            </div>
            <div className="hidden md:block">
                <Divider className="h-screen" orientation="vertical"/>
            </div>
            <div className="w-full md:h-screen p-3">
                {activeCategory === 'home' && <HomeBlock/>}
                {activeCategory === 'websites' && <WebsitesBlock/>}
                {activeCategory === 'selectors' && <SelectorsBlock/>}
                {activeCategory === 'articles' && <ArticlesBlock/>}
                {activeCategory === 'users' && <UsersBlock/>}
            </div>
        </div>
    );
}

export default AdminPage;