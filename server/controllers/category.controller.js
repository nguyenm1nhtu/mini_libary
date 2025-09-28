const { successResponse, errorResponse } = require('../utils/response');
const { Category } = require('../models');

module.exports = {
    create: async (req, res) => {
        const { name } = req.body;
        const category = await Category.create({ name });
        return successResponse(res, 201, 'Tạo danh mục thành công', category);
    },

    get: async (req, res) => {
        try {
            const categories = await Category.findAll();
            return successResponse(res, 200, 'Lấy danh mục thành công', categories);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    update: async (req, res) => {
        try {
            const { category_id, name } = req.body;

            const category = await Category.findByPk(category_id);
            if (!category) return errorResponse(res, 404, 'Danh mục không tồn tại');

            await category.update({ name });

            return successResponse(res, 200, 'Cập nhật danh mục thành công');
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { category_id } = req.body;

            const category = await Category.findByPk(category_id);
            if (!category) return errorResponse(res, 404, 'Danh mục không tồn tại');

            await category.destroy();
            return successResponse(res, 200, 'Xóa danh mục thành công');
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
