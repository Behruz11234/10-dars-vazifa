const { Router } = require("expres")
const { getALLproducts, getALLProducts, getOneProduct, addProduct, updateProduct, deleteProduct } = require("../controller/product")

const productRouter = Router()

productRouter.get("/get_all_product", getALLProducts)
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/get_add_product", addProduct)
productRouter.put("/get_update_product/:id", updateProduct)
productRouter.delete("/get_delete_product/:id", deleteProduct)


module.exports = productRouter
