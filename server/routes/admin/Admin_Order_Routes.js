const express = require('express')
const {
    fetchAllOrders,
    updateOrderStatus
    } = require('../../controllers/admin/Admin_Order_Controller.js')
const {adminMiddleware} = require("../../middleware/adminMiddleware.js")
const AdminOrderRouter = express.Router();

AdminOrderRouter.get('/fetchAll',adminMiddleware,fetchAllOrders);
AdminOrderRouter.post('/updateStatus/:orderId',adminMiddleware,updateOrderStatus);

module.exports = AdminOrderRouter;