const { successResponse, errorResponse } = require('../utils/response');
const { Log } = require('../models');

module.exports = {
    getAll: async (req, res) => {
        try {
            const logs = await Log.findAll({ include: [{ model: User, attributes: ['username'] }] });
            return successResponse(res, 200, 'Hoàn tất trả về lịch sử hoạt động', logs);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
