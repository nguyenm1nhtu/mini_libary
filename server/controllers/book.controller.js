const { successResponse, errorResponse } = require('../utils/response');
const { Book, Log } = require('../models');

module.exports = {
    create: async (req, res) => {
        try {
            const { title, author, category_id, quantity } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;

            const category = await Category.findByPk(category_id);
            if (!category) {
                return errorResponse(res, 404, 'Danh mục không tồn tại');
            }

            const book = await Book.create({ title, author, category_id, quantity, image });

            return successResponse(res, 201, 'Tạo sách thành công', book);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    update: async (req, res) => {
        try {
            const { book_id, title, author, category_id, quantity } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;

            const book = await Book.findByPk(book_id);
            if (!book) {
                return errorResponse(res, 404, 'Sách không tồn tại');
            }

            const category = await Category.findByPk(category_id);
            if (!category) {
                return errorResponse(res, 404, 'Danh mục không tồn tại');
            }

            await book.update({ title, author, category_id, quantity, image });

            return successResponse(res, 200, 'Cập nhật sách thành công', book);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { book_id } = req.body;

            const book = await Book.findByPk(book_id);
            if (!book) {
                return errorResponse(res, 404, 'Sách không tồn tại');
            }

            await book.destroy();
            return successResponse(res, 200, 'Xóa sách thành công');
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    get: async (req, res) => {
        try {
            const { title, author, category_id } = req.query;
            const where = {};

            //Truy van
            if (title) where.title = { [Op.ilike]: `%${title}%` };
            if (author) where.author = { [Op.ilike]: `%${author}%` };
            if (category_id) where.category_id = category_id;

            const books = await Book.findAll({
                where: Object.keys(where).length ? where : undefined,
                include: [{ model: Category, attributes: ['name'] }],
            });

            return successResponse(res, 200, 'Lấy danh sách sách thành công', books);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
