import login from "./login";
import forget from "./forget";
import register from "./register";
import verifyEmail from "./verifyEmail";

export default {
    'user.index.welcome': 'Welcome',
    ...login,
    ...forget,
    ...register,
    ...verifyEmail
}