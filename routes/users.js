var express = require("express");
var router = express.Router();
const users = require("../users");

// POST route to add a new user
router.post("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.redirect("/users"); // Перенаправляем пользователя на страницу со списком пользователей
  } else {
    res.status(400).send("Name is required");
  }
});

router.get("/", (req, res) => {
  res.render("users", { users });
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  const userToUpdate = users.find((user) => user.id === userId);
  if (!userToUpdate) {
    return res.status(404).send("User not found");
  }

  userToUpdate.name = name;
  res.redirect("/");

});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  // Находим индекс пользователя в массиве
  const userIndex = users.findIndex((user) => user.id === userId);

  // Если пользователь с таким идентификатором найден, удаляем его из массива
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.redirect("/");
  } else {
    res.status(404).send("Пользователь не найден");
  }
});

module.exports = router;
