import { sql } from "../DB/db.js";

export const getProducts =  async (req,res)=>{
    try{
       const products= await sql`
            SELECT * FROM products
            ORDER BY  create_at DESC    
        `;
        console.log( "fetched products" ,products)
        res.status(200).json({success:true, data:products});
    }catch(error){
        console.log("error getProducts", error)
    }
};

export const createProduct = async (req,res)=>{
    const {name, image, price} = req.body;

    if(!name || !image || !price){
        return res.status(400).json({success:false, message:"please fill all fields"})
    }

    try{
        const newProduct = await sql`
            INSERT INTO products(name, image, price)
            VALUES(${name}, ${image}, ${price})
            RETURNING *
        `;
        console.log( "created product" ,newProduct)
        res.status(201).json({success:true, data:newProduct});
    }catch(error){
        console.log("error createProduct", error)
    }
};

export const getProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const product = await sql`
            SELECT * FROM products
            WHERE id = ${id}
        `;
        console.log( "fetched product" ,product)
        res.status(200).json({success:true, data: product[0] });
    }catch(error){
        console.log("error getProduct", error)
    }
};


export const updateProduct = async (req,res)=>{
    const id = req.params.id;
    const {name, image, price} = req.body;

    if(!name || !image || !price){
        return res.status(400).json({success:false, message:"please fill all fields"})
    }
    
    try{
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `;
        if(updatedProduct.length === 0){
            return res.status(404).json({success:false, message:"product not found"})
        }

        console.log( "updated product" ,updatedProduct)
        res.status(200).json({success:true, data:updatedProduct[0]});

    }catch(error){
        console.log("error updateProduct", error)
    }
};

export const deleteProduct = async (req,res)=>{
    const id = req.params.id;

    try{
        const deletedProduct = await sql`
            DELETE FROM products
            WHERE id = ${id}
            RETURNING *
        `;

        if(deletedProduct.length === 0){
            return res.status(404).json({success:false, message:"product not found"})
        }

        console.log( "deleted product" ,deletedProduct)
        res.status(200).json({success:true, data:deletedProduct[0]});

    }catch(error){
        console.log("error deleteProduct", error)}
};

