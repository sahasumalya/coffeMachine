const deepcopy = require('deepcopy');
function recursiveGet(beverages, index, outlets, quantities, total_outlets, oldindex, oldstate)
{
    let isValid = true;
    let result = [];
    let message = "";

    if(index==-1)
    {
       /*doing dfs for every beverage item and rotating the array correspondingly*/
       
        for(let z=0;z<beverages.length;z++)
        {
            
            result.push(...recursiveGet(beverages,0,outlets,quantities,total_outlets,-1,false))
            beverages.push(beverages[0]);
            beverages.shift();

        }
        return result;
    }

    /*defining the boundary definition if outlets==0 OR the index is beyond range then returning an array of empty array */
    if(outlets==0 || (oldstate==false && index==beverages.length) || beverages[index]==undefined)
        return [[]];
    
    let componentList = beverages[index].ingredientList;
    
    let currentQuantity = deepcopy(quantities); 
    /*checking whether the beverage can be made with the remaining components quantity or not with isValid flag*/
    for(let j=0;j<componentList.length;j++)
    {
           

             if(currentQuantity[componentList[j].name]==undefined)
             {
                isValid = false;
                message = `${beverages[index].name} cannot be prepared because ${componentList[j].name} is unavailable for ${total_outlets-outlets+1} outlet`
                break;
             }
             if(currentQuantity[componentList[j].name]>=componentList[j].quantity)
                currentQuantity[componentList[j].name] = currentQuantity[componentList[j].name] - componentList[j].quantity;
             else
                {
                    isValid = false;
                    message = `${beverages[index].name} cannot be prepared because ${componentList[j].name} is insufficient for ${total_outlets-outlets+1} outlet`
                    break;
                }

    }
    if(isValid)
    {
        message = `${beverages[index].name} is prepared for ${total_outlets-outlets+1} outlet`;
        
        for(let k=index;k<beverages.length;k++)
        {
            /*if valid, then we are considering from the same beverage */
            let cur_result = recursiveGet(beverages, k, outlets-1, deepcopy(currentQuantity), total_outlets, index, isValid);
            for(let f=0;f<cur_result.length;f++)
            {
                let concat_result = [message];
                concat_result.push(...cur_result[f]);
                result.push(concat_result);
                /*pushing the final concateneted result into the result */
            }
            
                
        }

    }
    else
    {
        
        for(let k=index+1;k<=beverages.length;k++)
        {
            /*if invalid, then we are considering from the next beverage */
            let cur_result = recursiveGet(beverages, k, outlets, deepcopy(currentQuantity), total_outlets, index, isValid);
            for(let f=0;f<cur_result.length;f++)
            {
                let concat_result = [];
                if(oldindex!=index)
                    concat_result = [message];
                concat_result.push(...cur_result[f]);
                result.push(concat_result);
                 /*pushing the final concateneted result into the result */
            }
        }
    }
    return result;
    
}
module.exports = recursiveGet;