var express = require('express');
var router = express.Router();

// Dữ liệu User từ file data của bạn
let dataUser = [
  { "username": "nguyenvana", "password": "123456", "email": "vana@gmail.com", "fullName": "Nguyễn Văn A", "role": { "id": "r1", "name": "Quản trị viên" }, "status": true, "loginCount": 15 },
  { "username": "tranthib", "password": "123456", "email": "thib@gmail.com", "fullName": "Trần Thị B", "role": { "id": "r2", "name": "Biên tập viên" }, "status": true, "loginCount": 7 },
  { "username": "levanc", "password": "123456", "email": "vanc@gmail.com", "fullName": "Lê Văn C", "role": { "id": "r3", "name": "Người dùng" }, "status": true, "loginCount": 3 }
  // ... (Các user khác dán vào đây)
];

// GET: Danh sách user
router.get('/', function(req, res) {
  res.send(dataUser);
});

// POST: Thêm mới user
router.post('/', function(req, res) {
  let newUser = {
    ...req.body,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataUser.push(newUser);
  res.status(201).send(newUser);
});

// PUT: Cập nhật user theo username
router.put('/:username', function(req, res) {
  let username = req.params.username;
  let user = dataUser.find(u => u.username === username);
  if (user) {
    Object.assign(user, req.body);
    user.updatedAt = new Date().toISOString();
    res.send(user);
  } else {
    res.status(404).send({ message: "USER NOT FOUND" });
  }
});

// DELETE: Xóa user
router.delete('/:username', function(req, res) {
  let username = req.params.username;
  dataUser = dataUser.filter(u => u.username !== username);
  res.send({ message: "Deleted " + username });
});

module.exports = router;