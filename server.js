const express = require("express");
const app = express();

app.use(express.json());

// employee routes
const employeeRoutes = require("./routers/employeeRoutes");

app.use("/employees", employeeRoutes);

app.listen(4000, () => {
  console.log("Employee Management Server running on port 4000");
});
