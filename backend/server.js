import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import productRoutes from "./Routes/productRoutes.js"
import { sql } from "./DB/db.js";
import { aj } from "./lib/arcjet.js";

    dotenv.config(); 

    

    const app =express();
    const PORT= process.env.PORT || 5050;
    const __dirname = path.resolve();

    app.use(express.json());
    app.use(cors());
    app.use(helmet({
        contentSecurityPolicy: false,
    })); // security middleware protect app by setting htpp headers
    app.use(morgan("dev"));  // log requests 

        //apply arcjet middleware
       app.use(async (req,res,next)=>{
           try{
              const decision = await aj.protect(req,{
                requested:1 // the number of requested resources
              });
            if(decision.isDenied()){
                if(decision.reason.isRateLimit()){
                    res.status(429).json({error:"Too many requests"})   
                }   
                else if(decision.reason.isBot()){
                    res.status(403).json({error:"bot access denied"})
                }
                else{
                    res.status(403).json({error:"Forbidden"})
                }  
                return; 
           } 

           //ckeck for spoofed bots
          if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }
           next();
        }catch(error){
               console.log("error",error)
               res.status(429).json({error:"Too many requests"})
            next(error);
           }
       }) 

    app.use("/api/products" , productRoutes);
       if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "/frontend/dist")))
        app.get("*", (req, res) =>
          res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
        )}
        
    
    // DB connection
    async function initDB(){
        try{
            await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )`   
            
            console.log("db")
        }catch (error){
            console.log("error initDB", error)
        }
    }
    initDB().then(() =>{
        app.listen(PORT , ()=>{
            console.log("srver rn on http://localhost:"+ PORT)
        })
    })



