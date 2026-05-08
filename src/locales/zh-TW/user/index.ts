import login from "./login";
import forget from "./forget";
import register from "./register";
import verifyEmail from "./verifyEmail";

export default {
    'user.index.welcome': '歡迎來到',
    ...login,
    ...forget,
    ...register,
    ...verifyEmail
}