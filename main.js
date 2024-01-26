
const fs = require ('fs');

class productManager {
    constructor() {
        this.products = []
        this.patch = "./productos.txt"
    }

    addProduct = async (title, description, price, img, code, stock) => {
        if (!title || !description || !price || !img || !code || !stock) {
          console.log("Error: Todos los campos son obligatorios");
          return;
        }
    
        if (this.products.some((product) => product.code === code)) {
          console.log("Error: El código de producto ya existe");
          return;
        }
          const newProducts = {
                id : this.products.length +1,
                title,
                description,
                price,
                img,
                code,
                stock
             };

             this.products.push(newProducts)
        await fs.promises.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async()=>{
      const respuesta = await fs.promises.readFile(this.patch, "utf-8")
      return JSON.parse(respuesta)
    }

   getProduct = async() => {
       const respuesta2 = await this.readProducts()
       console.log (respuesta2);
   }

    getProductById = async(id) => {
    const  product = await this.readProducts()
    const productFilter= product.find ((product) => product.id === id)

      if (productFilter){
           return productFilter
      }   else {
         return "Not Found"
   }
   }
}

const productos = new productManager();

productos.getProduct();

// agregando los productos

productos.addProduct("titulo1", "descripcion1",1000,"img1","abc123", 5);
productos.addProduct("titulo2", "descripcion2",1000,"img2","abc124", 10);
//productos.addProduct("titulo3", "descripcion3",1000,"img3","abc125", 8);


//productos.getProductById(2);