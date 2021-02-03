const fs = require('fs');
const Beverage = require('../models/beverage.js');
const Ingredient = require('../models/ingredient.js');
const Machine = require('../models/machine.js');
const Inventory = require('../models/inventory.js');



module.exports = (inputJson)=>{
    inputJson = JSON.parse(inputJson);
    let outlets = inputJson.machine.outlets.count_n;
    let total_items_quantity = inputJson.machine.total_items_quantity;
    let beverages = inputJson.machine.beverages;
    let beverageObjectList = [];


    let beverageList = Object.entries(beverages);
    for(let index=0;index<beverageList.length;index++)
    {
        let beverageName = beverageList[index][0];
        ingredientList = Object.entries(beverageList[index][1]);

        let componentList = [];
        for(let i=0;i<ingredientList.length;i++)
        {
            let component = new Ingredient(ingredientList[i][0], ingredientList[i][1]);
            componentList.push(component);
        }
        beverageObjectList.push(new Beverage(beverageName,componentList));
    }

    let inventory = Object.entries(total_items_quantity);
    let inventoryList = [];
    for(let i=0;i<inventory.length;i++)
    {
        inventoryList.push(new Ingredient(inventory[i][0], inventory[i][1]));
    }

    let machine = new Machine(outlets, beverageObjectList, new Inventory(inventoryList));
    let final_result = machine.getBeverage();
    console.log(final_result);
}
