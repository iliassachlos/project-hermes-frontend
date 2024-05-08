import ArticlesCard from "@/components/admin/articles-block/articles-card";

function ArticlesBlock(){
    return (
        <div className="flex flex-col p-2">
            <div>
                <h1 className="text-2xl font-bold mb-2">Articles</h1>
                <ArticlesCard/>
            </div>
        </div>
    )
}

export default ArticlesBlock