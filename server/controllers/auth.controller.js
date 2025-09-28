const { successResponse, errorResponse } = require('../utils/response');
const { User, Log } = require('../models');

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email, role } = req.body;

            // Kiem tra email
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return errorResponse(res, 400, 'Email đã được sử dụng');
            }

            const user = await User.create({ username, password, email, role });
            await Log.create({ user_id: user.user_id, action: 'Người dùng đăng ký' });

            return successResponse(res, 201, 'Đăng ký thành công', {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
            });
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Kiem tra ten dang nhap va mat khau
            const user = await User.findOne({ where: { username, password } });
            if (!user) {
                return errorResponse(res, 401, 'Tên đăng nhập hoặc mật khẩu không đúng');
            }

            await Log.create({ user_id: user.user_id, action: 'Người dùng đăng nhập' });

            return successResponse(res, 200, 'Đăng nhập thành công', {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
            });
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },

    logout: async (req, res) => {
        try {
            const { user_id } = req.body;

            const user = await User.findByPk(user_id);
            if (!user) {
                return errorResponse(res, 404, 'Người dùng không tồn tại');
            }

            await Log.create({ user_id: user.user_id, action: 'Người dùng đăng xuất' });
        } catch (error) {
            return errorResponse(res, 500, 'Lỗi máy chủ', error.message);
        }
    },
};
