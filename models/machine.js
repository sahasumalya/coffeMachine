
const recursiveGet = require('../modules/recursiveCall.js');
class Machine{
    constructor(outlets, beverages, totalItemsquantity)
    {
        this.outlets = outlets;
        this.beverages = beverages;
        this.totalItemsquantity = totalItemsquantity;
    }

    getBeverage()
    {
        /*calling a recursive function to get all the success and failure combinations*/
       return recursiveGet(this.beverages, -1, this.outlets, this.totalItemsquantity, this.outlets, 0, false);
    }

    refillInventory(name,quantity)
    {
        /*refilling inventory ingredient*/
        if(this.totalItemsquantity[name])
            this.totalItemsquantity[name]+=quantity;
        else
           this.totalItemsquantity[name] = quantity;
    }
}

module.exports = Machine;