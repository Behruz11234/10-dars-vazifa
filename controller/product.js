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
//6 remove 
const removeCHecked = async (req, res) => {
  try {
    const todos = read_file("todo.json");

    const filteredtodos = todos.filter(
      (todo) => todo.completed === false

    );
    write_file("todo.json", filteredtodos);
    res.status(200).json({
      massage: "checked todos removed",

    })
 

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

// taskdone
const toggleTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = read_file("tasks.json");

        
        const foundedTask = tasks.find((pro) => pro.id == id);

        if (!foundedTask) {
            return res.status(404).json({
                message: "task not found"
            });
        }

        
        tasks.forEach(taskk => {
            if (taskk.id == id) {
                
                taskk.is_completed = !taskk.is_completed;
            }
        });

        
        write_file("tasks.json", tasks);

        res.status(200).json({
            message: "Task status toggled",
            current_status: foundedTask.is_completed 
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const countCompletedTasks = async (req, res) => {
    try {
        const tasks = read_file("tasks.json");

        const completedCount = tasks.filter(task => task.is_completed === true).length;
        const totalCount = tasks.length;

        res.status(200).json({
            completed_tasks: completedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  module.exports = {    
    getALLProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProducts,
    removeCHecked,
    countCompletedTasks
  }
