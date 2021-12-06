const bcrypt = require("bcryptjs");
const User = require("../db/models/user");

function failAuth(res) {
  res.json(null);
}

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

exports.createUserAndSession = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
    });

    req.session.user = serializeUser(user);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err.code);
    return failAuth(res);
  }
  res.json(req.session.user.id); //TODO
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password)
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
    console.error("Err message:", err.message);
    console.error("Err code", err.code);
    return failAuth(res);
  }
  // console.log(req.session)
  res.json(req.session.user.id);
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.destroySession = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("sid");
      res.send({});
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteUser = (req, res) => {
  try {
    console.log(req.params.id);
    // логика удаления юзера
  } catch (error) {}
};
