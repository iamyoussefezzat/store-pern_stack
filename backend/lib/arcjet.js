import arcjet ,{tokenBucket,shield,detectBot} from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

export const aj = arcjet({
    key: process.env.ARCJET_KEY, 
    characteristics: ["ip.src"],
    rules: [
        // shild the app from DDoS attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            //allow all requests from search engines
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
            }),

           //rate limit the app
              tokenBucket({
                mode:"LIVE",
                refillRate: 30,
                interval: 5, //sec
                capacity: 20, // tokens
              }) 
    ]
});