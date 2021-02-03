class Inventory{
    constructor(ingredientList)
    {
        for(let i=0;i<ingredientList.length;i++)
        {
            //console.log(ingredientList[i].name, ingredientList[i].quantity);
            this[ingredientList[i].name] = ingredientList[i].quantity;
        }
    }
}

module.exports = Inventory;