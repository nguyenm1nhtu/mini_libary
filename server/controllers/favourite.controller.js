const { successResponse, errorResponse } = require('../utils/response');
const { Favourite, User, Book, Log } = require('../models');

module.exports = {
    add: async (req, res) => {
        try {
            const { user_id, book_id } = req.body;

            const user = await User.findByPk(user_id);
            if (!user) {
                return errorResponse(res, 404, 'Không tìm thấy người dùng');
            }

            const book = await Book.findByPk(book_id);
            if (!book) {
                return errorResponse(res, 404, 'Không tìm thấy sách');
            }

            const favourite = await Favourite.create({ user_id, book_id });
            await Log.create({ user_id, action: `Thêm sách ${book.title} vào ưa thích` });

            return successResponse(res, 201, 'Thêm sách vào ưa thích thành công', favourite);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { favourite_id, book_id } = req.body;

            const favourite = await Favourite.findByPk(favourite_id);
            if (!favourite) {
                return errorResponse(res, 404, 'Không tìm thấy sách nằm trong danh mục ưa thích');
            }

            const book = Book.findByPk(book_id);

            await favourite.destroy();
            await Log.create({
                user_id: favourite.user_id,
                action: `Xóa sách ${book.title} khỏi ưa thích`,
            });

            return successResponse(res, 200, 'Xóa sách thành công');
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
