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

    if (!foundProducts) {
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
    const { id } = req.params;
    const { title, price, quantity } = req.body;
    const products = read_file("products.json");

    const foundedProduct = products.find((pro) => pro.id === id);

    if (!foundedProduct) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    products.forEach((product) => {
      if (product.id === id) {
        product.title = title ? title : product.title;
        product.price = price ? price : product.price;
        product.quantity = quantity ? quantity : product.quantity;
      }
    });

    write_file("products.json", products);

    res.status(200).json({
      message: "Updated product",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


  //  5
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = read_file("products.json");

    const foundedProduct = products.find((pro) => pro.id === id);

    if (!foundedProduct) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    products.forEach((product, idx) => {
      if (product.id === id) {
        products.splice(idx, 1);
      }
    });

    write_file("products.json", products);

    res.status(200).json({
      message: "Deleted product",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
  module.exports = {
    getALLProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProducts
  }