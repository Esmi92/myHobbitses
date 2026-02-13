import admin from "firebase-admin";
import dotenv from "dotenv"; 
dotenv.config();
let serviceAccount = {}

try { 
  serviceAccount = require("./secrets.json"); 
} catch (error: any) { 
  if (error.code === "MODULE_NOT_FOUND") { 
    console.warn("secrets.json not found, using empty config."); 
    serviceAccount = {}; 
  } else { throw error; } }

const baseUrl = process.env.BASE_URL
let db: any;

if (Object.keys(serviceAccount).length !== 0) { 
  admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount),
  databaseURL: baseUrl
})
 db =admin.database();
  }

interface hikingSpot {
  name?: string,
  id: string,
  stars: number,
  top: true, 
  visited: false,
  year: number

}

const getHobby = async (hobbyPath: string) =>{
  if (Object.keys(serviceAccount).length === 0) { 
    return;
  }
  let dbRef = await db.ref(hobbyPath);
  let getHobby = await dbRef.get();
  let hobbyData = await getHobby.val();
  let finalArray: Array<hikingSpot> = []; 
  let keys = Object.keys(hobbyData);
  let values = Object.values(hobbyData); 
  for( let i = 0; i <= values.length - 1; i++){
    let hobbyObj: any = values[i];
    hobbyObj.name = keys[i]
    finalArray.push(hobbyObj)
  }
  return finalArray;
}

const createHobby = async(bodyHobby: hikingSpot, hobbyPath: string) =>{
  if (Object.keys(serviceAccount).length === 0) { 
    return false;
  }
  let dbRef = db.ref(hobbyPath)
  try{
    let keyName: any = bodyHobby.name
    delete bodyHobby.name
    let finalHobby = {
      [keyName]: bodyHobby
    }
    dbRef.update(finalHobby);
    return true; 
  }catch{
    return false;
  }

}

export {
  createHobby,
  getHobby,
};