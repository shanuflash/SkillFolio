import bcrypt from "bcryptjs";

const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

export default comparePassword;
