const uuid = require("uuid")
const { read_file, write_file } = require("../fs/file-manager")


// 1 get_all_products
  const getALLProducts = async (req, res) => {
    try {
const products = read_file("prducts.json")

res.status(200).json(products)
    } catch (err) {
      return res.status(500).json({
        massage: err.massage
      })
    }
  }

  // 2 get_one_products
  const getOneProduct = async (req, res) => {
    try {
      const { id } = req.params
      const products = read_file("prducts.json")

      const foundProducts = products.find((pro) => pro.id === id)

     if(!foundProducts) {
      return res.status(400).json({
        massage: "product not found"
      })
     }

     res.statuso(200).json(foundProducts)
    } catch (err) {
      return res.status(500).json({
        massage: err.massage
      })
    }
  }


  //  3
  const addProduct = async (req, res) => {
    try {
    const { title, price, quantity } = req.body

      const products = read_file("prducts.json")

      products.push({
        id: uuid.v4(),
        title,
        price,
        quantity
      })

      write_file("products.json", products)

      res.status(201).json({
        massage: "Added new products"
      })

    } catch (err) {
      return res.status(500).json({
        massage: err.massage
      })



    }
  }


  //  4
  const updateProduct = async (req, res) => {
    try {

     const { id } = req.params
      const products = read_file("prducts.json")

      const foundProducts = products.find((pro) => pro.id === id)

     if(!foundProducts) {
      return res.status(400).json({
        massage: "product not found"
      })
     }

     products.array.forEach(element => {
      
     });
    } catch (err) {
      return res.status(500).json({
        massage: err.massage
      })
    }
  }


  //  5
  const deleteProduct = async (req, res) => {
    try {

            const { id } = req.params
      const products = read_file("prducts.json")

      const foundProducts = products.find((pro) => pro.id === id)

     if(!foundProducts) {
      return res.status(400).json({
        massage: "product not found"
      })
     }

    } catch (err) {
      return res.status(500).json({
        massage: err.massage
      })


    }
  }

  module.exports = {
   getALLProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
  }