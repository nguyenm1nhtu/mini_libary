const { successResponse, errorResponse } = require('../utils/response');
const { Borrow, Book, User, Log } = require('../models');

module.exports = {
    borrow: async (req, res) => {
        try {
            const { user_id, book_id } = req.body;

            const user = await User.findByPk(user_id);
            if (!user) {
                return errorResponse(res, 404, 'Không tìm thấy người dùng');
            }

            const book = await Book.findByPk(book_id);
            if (!book || book.quantity <= 0) {
                return errorResponse(res, 404, 'Sách không tồn tại');
            }

            const borrow = await Borrow.create({ user_id, book_id });
            await Book.update({ quantity: book.quantity - 1 }, { where: { book_id } });
            await Log.create({ user_id, action: `Mượn sách ${book.title}` });

            return successResponse(res, 201, 'Hoàn tất mượn sách', borrow);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    returnBook: async (req, res) => {
        try {
            const { borrow_id } = req.body;

            const borrow = await Borrow.findByPk(borrow_id);
            if (!borrow || borrow.status === 'returned') {
                return errorResponse(res, 400, 'Sách không tồn tại hoặc chưa được cho mượn');
            }

            const book = await Book.findByPk(borrow.book_id);

            await Borrow.update({ status: 'returned', return_date: new Date() }, { where: { borrow_id } });
            await Book.update({ quantity: book.quantity + 1 }, { where: { book_id: borrow.book_id } });
            await Log.create({ user_id: borrow.user_id, action: `Trả sách ${book.title}` });

            return successResponse(res, 200, 'Hoàn tất trả sách', borrow);
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
