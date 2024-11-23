const fs = require("fs").promises;
const path = require("path");


const recipesFilePath = path.join(__dirname, "../../db/recipes.json"); 
const getAll = async () => JSON.parse(await fs.readFile(recipesFilePath));

const getOne = async (id) => {
    const recipes = await getAll();
    return recipes.find((recipe) => parseInt(recipe.id) === parseInt(id));
};



const save = async (recipe) => {
    console.log("services  post")


    const recipes = await getAll();

    recipe.id = recipes.length + 1; 

    recipes.push(recipe);

    await fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), 'utf-8');

    return recipe;
};

const update=async (id,update)=>{
    const recipes=await getAll()
    update.id=parseInt(id)
    
    const updatedRecipes=recipes.map(recipe=>(
        parseInt(id)==recipe.id?update:recipe
    ))

    await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes, null, 2), 'utf-8');
    return update
}

const remove=async(id)=>{
    console.log("services remove")

    const recipes=await getAll()
    const removedRecipes=recipes.map(recipe=>(
        parseInt( recipe.id)===parseInt(id)?null:recipe
    )).filter(recipe => recipe !== null);
    
    await fs.writeFile(recipesFilePath, JSON.stringify(removedRecipes, null, 2), 'utf-8');
}



module.exports = {
    getAll,
    getOne,
    save,
    update,
    remove
};