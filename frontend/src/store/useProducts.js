import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.Mode === "development" ? "http://localhost:1010" : "";


    export const useProductStore = create((set,get) => ({
        products: [],
        loading: false,
        error: null,
        currentProduct: null,

       // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  fetchProducts: async () => {
      set({ loading: true });
      try {
          const response = await axios.get(`${BASE_URL}/api/products`);
          set({ products: response.data.data ,error: null });
      } catch (err) {
          if(err.status == 429) set({ error: "Too many requests, please try again later", products:[]});
          else set({ error: "An error occurred while fetching products", products:[]});
      }finally{
          set({ loading: false });
      }
      
  },
  fetchProduct: async (id) => {
      set({ loading: true });
      try {
          const response = await axios.get(`${BASE_URL}/api/products/${id}`);
          set({ currentProduct: response.data.data, 
            formData:response.data.data, 
            error: null
           });
      } catch (err) {
          console.log( "error in fetchproduct ",err);
          if(err.status == 429) set({ error: "Too many requests, please try again later", currentProduct:null});
          else set({ error: "An error occurred while fetching product", currentProduct:null});
      }finally{
          set({ loading: false });
      }
  },
  deleteProduct: async (id)=>{
      set({ loading: true });
      try{
          await axios.delete(`${BASE_URL}/api/products/${id}`);
          set(prev => ({ products: prev.products.filter(p => p.id !== id)}));
          toast.success("Product deleted successfully");
      }
      catch(err){
          console.log({ error: "An error occurred while deleting product", products:[]});
          toast.error("An error occurred while deleting product");
      }
      finally{
          set({ loading: false });
      }
  },
  updateProduct: async (id) => {
      set({ loading: true });
      try{
        const { formData } = get();
        const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
        set({ currentProduct: response.data.data});
        toast.success("Product updated successfully");
      }catch(err){
          console.log("error in updateProduct", err);
          toast.error("An error occurred while updating product");}
      finally{
          set({ loading: false });
      }
  }
    }));