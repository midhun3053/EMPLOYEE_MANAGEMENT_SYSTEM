const express = require("express");
const router = express.Router();

// In-memory data
let students = [
  { id: 1, name: "Arun", dept: "CSE", age: 23, },
  { id: 2, name: "Bala", dept: "ECE", age: 22 }
];

// ✅ GET – All students
router.get("/", (req, res) => {
  res.json(students);
});

// ✅ POST – Add single or multiple students
router.post("/", (req, res) => {
  const data = req.body;

  if (Array.isArray(data)) {
    students.push(...data);
  } else {
    students.push(data);
  }

  res.json({
    message: "Student(s) added successfully",
    students
  });
});

// ✅ PUT – Update student by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = { ...students[index], ...updatedData };

  res.json({
    message: "Student updated successfully",
    student: students[index]
  });
});

// ✅ DELETE – Remove student by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

module.exports = router;
