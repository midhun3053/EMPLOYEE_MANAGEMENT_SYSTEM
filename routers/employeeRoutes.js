const express = require("express");
const router = express.Router();

// In-memory employee data
let employees = [
  { id: 101, name: "Ramesh", role: "Developer", department: "IT", salary: 45000 },
  { id: 201, name: "Suresh", role: "Tester", department: "QA", salary: 40000 },
  { id: 301, name: "Mahesh", role: "Manager", department: "HR", salary: 60000 },
  { id: 401, name: "Rajesh", role: "Designer", department: "UI/UX", salary: 42000 },
  { id: 501, name: "Dinesh", role: "Support", department: "Customer Service", salary: 38000 },
  { id: 601, name: "Naresh", role: "DevOps Engineer", department: "Operations", salary: 55000 }
];  




// ✅ GET – All employees
router.get("/", (req, res) => {
  res.json(employees);
});


// ✅ GET – Employee by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});


// ✅ POST – Add single or multiple employees
router.post("/", (req, res) => {
  const data = req.body;

  if (Array.isArray(data)) {
    employees.push(...data);
  } else {
    employees.push(data);
  }

  res.json({
    message: "Employee(s) added successfully",
    employees
  });
});


// ✅ PUT – Update MULTIPLE employees at once
router.put("/", (req, res) => {
  const updates = req.body; // expecting array

  if (!Array.isArray(updates)) {
    return res.status(400).json({
      message: "Request body must be an array"
    });
  }

  let updatedEmployees = [];
  let notFound = [];

  updates.forEach(update => {
    const index = employees.findIndex(emp => emp.id === update.id);

    if (index !== -1) {
      employees[index] = { ...employees[index], ...update };
      updatedEmployees.push(employees[index]);
    } else {
      notFound.push(update.id);
    }
  });

  res.json({
    message: "Multiple employees updated",
    updatedEmployees,
    notFoundIds: notFound
  });
});



// ✅ DELETE – Remove employee by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const deletedEmployee = employees.splice(index, 1);

  res.json({
    message: "Employee deleted successfully",
    employee: deletedEmployee[0]
  });
});

module.exports = router;
