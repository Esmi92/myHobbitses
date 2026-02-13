import express from "express";
import { getHobby, createHobby} from "./firebase";
import { HIKINGPATH } from "./constants";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     HikingSpots:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: hikingSpotName
 *         id:
 *           type: string
 *           example: country-number
 *         stars:
 *           type: integer
 *           example: 5
 *         top:
 *           type: boolean
 *           example: false
 *         visited:
 *           type: boolean
 *           example: true
 *         year:
 *           type: integer
 *           example: 2009
 */

/**
 * @openapi
 * /hobbitses/hiking:
 *   get:
 *     summary: get hiking spots
 *     responses:
 *       200:
 *         description: Succesful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 status:
 *                   type: integer
 *                   example: 200 
 *                 body:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HikingSpots'
 *       500:
 *         description: Failed request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 status:
 *                   type: integer
 *                   example: 500 
 *                 body:
 *                   type: string
 *                   example: Error fetching data
 */
router.get(HIKINGPATH, async (req, res) =>{
    try{
        let response = await getHobby(req.originalUrl);
        if(!response){
            res.send({status: 500, body: "Error fetching data"})
        }
        res.send({status: 200, body: response})
    }catch{
        res.send({status: 500, body: "Error fetching data"})
    }
    
})

/**
 * @openapi
 * /hobbitses/hiking:
 *   post:
 *     summary: to add a new hiking spot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HikingSpots'
 *     responses:
 *       200:
 *         description: Succesful request
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties: 
 *                 status:
 *                   type: integer
 *                   example: 200 
 *                 body:
 *                   type: string
 *                   example: Item created succesfully
 *       500:
 *         description: Failed request
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties: 
 *                 status:
 *                   type: integer
 *                   example: 500 
 *                 body:
 *                   type: string
 *                   example: Error creating data
 */
router.post(HIKINGPATH, async (req, res) =>{
    let reqBody = req.body;
    let response = await createHobby(reqBody, req.originalUrl)
    if(response){
        res.send({status: 200, body: "Item created succesfully"})
    }else{
        res.send({status: 500, body: "Error creating data"})
    }
})

export default router; 