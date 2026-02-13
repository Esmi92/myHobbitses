import express from "express";
import { MAINPATH } from "./constants";
import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express";
import router from "./routes";

const app = express();
const port = 3000
const definition = { 
  definition: { 
    openapi: "3.0.0", 
    info: { 
      title: "Hobbitses Api", 
      version: "1.0.0", }, }, 
      apis: ["./routes.ts"], 
    }

app.use(express.json()); 
app.use(MAINPATH, router);

const swaggerSpec = swaggerJsdoc(definition); 
app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})