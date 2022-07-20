import React from "react";
import GamesPage from "./GamesPage";
import { useParams } from "react-router-dom";
import ConsolesPage from "./ConsolesPage";
import AccessoriesPage from "./AccessoriesPage";

const Categories = () => {
    const { categoryID } = useParams();
    console.log(categoryID);
    
    if (categoryID === "games") {
        return <GamesPage categoryID={categoryID} />
    } else if (categoryID === "consoles") {
        return <ConsolesPage categoryID={categoryID} />
    } else if (categoryID === "accessories") {
        return <AccessoriesPage categoryID={categoryID} />
    }
}

export default Categories;
