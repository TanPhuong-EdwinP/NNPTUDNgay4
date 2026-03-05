var express = require('express');
var router = express.Router();

// Dữ liệu Role từ file data của bạn
let dataRole = [
  { "id": "r1", "name": "Quản trị viên", "description": "Toàn quyền quản lý hệ thống", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" },
  { "id": "r2", "name": "Biên tập viên", "description": "Quản lý nội dung và dữ liệu", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" },
  { "id": "r3", "name": "Người dùng", "description": "Tài khoản người dùng thông thường", "creationAt": "2026-03-04T08:00:00.000Z", "updatedAt": "2026-03-04T08:00:00.000Z" }
];

// Giả định dataUser được dùng chung để lọc (nếu tách file bạn cần require từ utils/data)
// Ở đây tôi khai báo tạm để logic chạy được
let { dataUser } = require('../utils/data'); 

// GET: Lấy danh sách roles
router.get('/', function(req, res) {
  res.send(dataRole);
});

// GET: Lấy tất cả user thuộc một role cụ thể (Yêu cầu thêm)
router.get('/:id/users', function(req, res) {
  let id = req.params.id;
  let result = dataUser.filter(u => u.role.id === id);
  res.send(result);
});

// POST: Thêm mới role
router.post('/', function(req, res) {
  let newRole = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataRole.push(newRole);
  res.status(201).send(newRole);
});

module.exports = router;