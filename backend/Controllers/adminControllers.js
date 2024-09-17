import { login } from "../Models/loginSchema.js";

// create admin
const createAdmin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const data = await new login({
      userName,
      password,
    }).save();

    res.status(201).send({
      success: true,
      message: "Admin saved successfully. Admin id = " + data.id,
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in create admin",
      error,
    });
  }
};

// verify admin
const verifyAdmin = async (req, res) => {
  const { userName, password } = req.body;

  //validate
  try {
    const data = await login.findOne({
      userName,
      password,
    });

    if (data) {
      return res.status(201).send({
        status: true,
        message: "Admin verified successfully",
        data,
      });
    }

    res.status(404).send({
      status: false,
      message: "Invalid userName or password",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in fetching admin data",
      error,
    });
  }
};

export { verifyAdmin, createAdmin };
