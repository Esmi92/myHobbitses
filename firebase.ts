import admin from "firebase-admin";
import dotenv from "dotenv"; 
dotenv.config();

const serviceAccount = require("./secrets.json");
const baseUrl = process.env.BASE_URL

admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount),
  databaseURL: baseUrl
})

interface hikingSpot {
  name?: string,
  id: string,
  stars: number,
  top: true, 
  visited: false,
  year: number

}

const db =admin.database();

const getHobby = async (hobbyPath: string) =>{
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