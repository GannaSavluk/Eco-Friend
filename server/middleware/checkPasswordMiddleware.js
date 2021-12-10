exports.isValidPassword = (req, res, next) => {
  const { password } = req.body;
  console.log('password', password)
  const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  console.log("password.includes(regexp)", regexp.test(password))
  regexp.test(password) ? next() : res.json(null);
};
