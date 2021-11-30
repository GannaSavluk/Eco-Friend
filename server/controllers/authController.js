// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const User = require('../db/models/user');

/**
 * Завершает запрос с ошибкой аутентификации
 * @param {object} res Ответ express
 */
function failAuth(res) {
    res.redirect('/'); //!!!!!!!!!!!!!!!!!!!!!! 
}

/**
 * Подготавливает пользователя для записи в сессию
 * Мы не хотим хранить пароль в сессии, поэтому извлекаем только нужные данные
 * @param {object} user Объект пользователя из БД
 */
function serializeUser(user) {
    return {
        id: user.id,
        name: user.first_name,
        role: user.role,
    };
}

// exports.signupRender = (req, res) => {
//     res.render('signup');
// };

// exports.signinRender = (req, res) => {
//     res.render('signin');
// };

exports.createUserAndSession = async (req, res, next) => {
    // console.log('req.body----------------------------', req.body)
    const { username, password, email } = req.body;
    try {
        // Мы не храним пароль в БД, только его хэш
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            first_name: username,
            password: hashedPassword,
            email: email
        });

        // записываем в req.session.user данные (id & name) (создаем сессию)
        req.session.user = serializeUser(user); // req.session.user -> id, name

    } catch (err) {
        console.error('Err message:', err.message);
        console.error('Err code', err.code);
        return failAuth(res);
    }
    res.json(req.session.user.id) //TODO
    res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.checkUserAndCreateSession = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Пытаемся сначала найти пользователя в БД
        const user = await User.findOne({ email: email });
        if (!user) return failAuth(res);

        // Сравниваем хэш в БД с хэшем введённого пароля
        const isValidPassword = await bcrypt.compare(password, user.password);
        // const isValidPassword = user.password === password;

        if (!isValidPassword) return failAuth(res);

        // записываем в req.session.user данные (id & name) (создаем сессию)
        req.session.user = serializeUser(user);

    } catch (err) {
        console.error('Err message:', err.message);
        console.error('Err code', err.code);
        return failAuth(res);
    }
    console.log(req.session)
    res.json(req.session.user.id)
    res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.destroySession = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) return next(err);
            res.clearCookie('sid');
            res.send({})
        });
    } catch (error) {
        console.log(error.message);
    }
};