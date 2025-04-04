// Reference: https://redis.io/docs/latest/develop/clients/nodejs/connect/


import { createClient } from 'redis';
import { performance } from "perf_hooks"; // For accuracy in bechmarking DB and caller 
import * as fs from 'fs/promises';

let inputJson: string = "../app/data/df_final_features10.json"

/*
const client = createClient({
    socket: {
        host: 'localhost', // need to change for later; see ./docker_compose for redis host can port
        port: 6380
    }
}

);


client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
*/


async function insertQuery( jsonFile: string) { //must execute first, unordered fine, otherwise redis has no data
    try { //read from local json to insert redis
        const fileConent= await fs.readFile(jsonFile,'utf-8'); 
        const dataInsert:  dataRedis[] =JSON.parse(fileConent)
        let i:number = 0; 

        for (const item in dataInsert){ 
            // add id + json content 
            console.log(i)
            i++;

        }
    }catch (error) {
        console.error ("hehe..b")
    }

};


insertQuery(inputJson)


type dataRedis = {
    Name: string,
    Sex: string,
    Age: number,
    Height: number,
    Weight: number,
    Team: string,
    Year: number,
    Season: string,
    Host_City: string,
    Host_Country: string,
    Sport: string,
    Event: string,
    GDP_Per_Capita_Constant_LCU_Value: number,
    Cereal_yield_kg_per_hectare_Value: number,
    Military_expenditure_current_LCU_Value: number,
    Tax_revenue_current_LCU_Value: number,
    Expense_current_LCU_Value: number,
    Central_government_debt_total_current_LCU_Value: number,
    Representing_Host: number,
    Avg_Temp: number,
    Medal: number,
    Medal_Binary: number

};
