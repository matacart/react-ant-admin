import { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    loginThunk,
    signUpThunk,
    resettingThunk,
    getUserInfoThunk,
} from '../../../../store/reducers/thunk/userThunk';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button, Form, Checkbox, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { GetIntl } from '../../../../locales/utils';

import FormHeader from '../FormHeader/FormHeader';
import External from '../External/External';
import FormFooter from '../FormFooter/FormFooter';

import { USER_FORM } from '../../../../constant/User';
import { getVerificationCode } from '../../../../api/user';
import { getToken } from '../../../../util/auth';

import './UserForm.scss';

// state 映射
const mapStateToProps = state => {
    const user = state.user;
    return { user };
};

/**
 * 登录/注册 表单
 */
const UserForm = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState(''); // 昵称
    const [username, setUsername] = useState(''); // 账户
    const [verificationCode, setVerificationCode] = useState(''); // 验证码
    const [password, setPassword] = useState(''); // 密码
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [isAgree, setIsAgree] = useState(false); // 确认协议

    let [flagPassword, setFlagPassword] = useState(false); // 是否显示密码
    const eyeStyle = { display: 'none' };

    let [isInput, setIsInput] = useState([false, false, false, false, false]); // 是否处于已有数据状态
    const inputStyle = { transform: 'translateY(-11px) scale(0.75)' };

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    // 获取对应页面数据 登录/注册
    const data = USER_FORM[location.pathname];

    /**
     * 输入框 与 state 数据绑定
     */
    const handleChange = event => {
        const dom = event.target;

        switch (dom.id) {
            case 'nickname':
                setNickname(dom.value);
                break;
            case 'account':
                setUsername(dom.value);
                break;
            case 'verificationCode':
                setVerificationCode(dom.value);
                break;
            case 'password':
                setPassword(dom.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(dom.value);
                break;
            default:
        }
    };

    /**
     * 是否同意协议
     */
    function isChecked(event) {
        setIsAgree(event.target.checked);
    }

    /**
     *  用于表单信息的验证
     */
    function formValidation(event) {
        const dom = event.target;

        switch (dom.id) {
            case 'nickname':
                if (event.target.value)
                    setIsInput([
                        true,
                        isInput[1],
                        isInput[2],
                        isInput[3],
                        isInput[4],
                    ]);
                else
                    setIsInput([
                        false,
                        isInput[1],
                        isInput[2],
                        isInput[3],
                        isInput[4],
                    ]);
                break;
            case 'account':
                if (event.target.value)
                    setIsInput([
                        isInput[0],
                        true,
                        isInput[2],
                        isInput[3],
                        isInput[4],
                    ]);
                else
                    setIsInput([
                        isInput[0],
                        false,
                        isInput[2],
                        isInput[3],
                        isInput[4],
                    ]);
                break;
            case 'verificationCode':
                if (event.target.value)
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        true,
                        isInput[3],
                        isInput[4],
                    ]);
                else
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        false,
                        isInput[3],
                        isInput[4],
                    ]);
                break;
            case 'password':
                if (event.target.value)
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        isInput[2],
                        true,
                        isInput[4],
                    ]);
                else
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        isInput[2],
                        false,
                        isInput[4],
                    ]);
                break;
            case 'confirmPassword':
                if (event.target.value)
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        isInput[2],
                        isInput[3],
                        true,
                    ]);
                else
                    setIsInput([
                        isInput[0],
                        isInput[1],
                        isInput[2],
                        isInput[3],
                        false,
                    ]);
                break;
            default:
        }
    }

    /**
     * 表单提交事件
     */
    function submitForm() {
        if (data.type === '登录' && username && password) {
            // 登录
            dispatch(loginThunk({ username, password }))
                .then(res => {
                    // 获取用户信息
                    dispatch(getUserInfoThunk(getToken()));
                    if (res.payload.status) {
                        message.error(res.payload.msg);
                    } else {
                        navigate('/user/signIn');
                    }
                })
                .catch(error => {
                    message.error(error);
                });
        }

        if (
            data.type === '注册' &&
            nickname &&
            username &&
            verificationCode &&
            password &&
            confirmPassword &&
            isAgree
        ) {
            dispatch(
                signUpThunk({
                    nickname,
                    username,
                    password,
                    code: verificationCode,
                }),
            )
                .then(res => {
                    if (res.payload.status) {
                        message.success(res.payload.msg);
                        navigate('/user/signIn');
                    } else {
                        message.error(res.payload.msg);
                    }
                })
                .catch(error => {
                    message.error(error);
                });
        }

        if (
            data.type === '忘记密码' &&
            username &&
            verificationCode &&
            password &&
            confirmPassword
        ) {
            dispatch(
                resettingThunk({
                    username,
                    password,
                    confirmPassword,
                    code: verificationCode,
                }),
            )
                .then(res => {
                    if (res.payload.status) {
                        message.success(res.payload.msg);
                        navigate('/user/signIn');
                    } else {
                        message.error(res.payload.msg);
                    }
                })
                .catch(error => {
                    message.error(error);
                });
        }
    }

    /**
     * 判断是否显示密码
     */
    function isShowPassword() {
        passwordRef.current.type =
            passwordRef.current.type !== 'text' ? 'text' : 'password';

        if (data.submText === '注册') {
            confirmPasswordRef.current.type =
                confirmPasswordRef.current.type !== 'text'
                    ? 'text'
                    : 'password';
        }

        setFlagPassword(!flagPassword);
    }

    /**
     * 发送验证码
     */
    function sendVerificationCode() {
        if (data.type === '注册') {
            getVerificationCode(username)
                .then(request => {
                    if (request.data.status)
                        message.success('成功发送验证码！');
                    else message.warning('用户存在');
                })
                .catch(error => {
                    message.error('发送失败!');
                });
        }

        if (data.type === '忘记密码') {
            getVerificationCode(username, 'forget')
                .then(request => {
                    if (request.data.status)
                        message.success('成功发送验证码！');
                })
                .catch(error => {
                    message.error(error);
                });
        }
    }

    return (
        <>
            <FormHeader />

            <div className="mc-login-form-wrap">
                <div className="mc-login-form">
                    <h3 style={{ marginBottom: '32px' }}>{data.title}</h3>

                    <div className="mc-login-form-content formContent">
                        <div>
                            <Form
                                id="mc_signup_form"
                                className="login-from"
                                style={{ marginBottom: 16 }}
                            >
                                {/* 昵称 */}
                                {data.type === '注册' && (
                                    <div className="nickname">
                                        <div className="field">
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={formValidation}
                                                id="nickname"
                                            />
                                            <label
                                                htmlFor="nickname"
                                                style={
                                                    isInput[0] ? inputStyle : {}
                                                }
                                            >
                                                <span>
                                                    {GetIntl(
                                                        'UserPage_register_nickname',
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {/* 账号 */}
                                <div className="account">
                                    <div className="field">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={formValidation}
                                            id="account"
                                        />
                                        <label
                                            htmlFor="account"
                                            style={isInput[1] ? inputStyle : {}}
                                        >
                                            {/* <span>邮箱/手机号</span> */}
                                            <span>
                                                {GetIntl('UserPage_account')}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* 验证码 */}
                                {(data.type === '注册' ||
                                    data.type === '忘记密码') && (
                                    <div className="verificationCode">
                                        <div className="field">
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={formValidation}
                                                id="verificationCode"
                                            />
                                            <label
                                                htmlFor="verificationCode"
                                                style={
                                                    isInput[2] ? inputStyle : {}
                                                }
                                            >
                                                <span>
                                                    {GetIntl(
                                                        'UserPage_register_verificationCode',
                                                    )}
                                                </span>
                                            </label>
                                            <button
                                                className="getVerificationCode"
                                                onClick={sendVerificationCode}
                                            >
                                                {GetIntl(
                                                    'UserPage_register_getVerificationCode',
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* 密码 */}
                                <div className="password">
                                    <div className="field">
                                        <input
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={formValidation}
                                            ref={passwordRef}
                                            id="password"
                                        />

                                        <label
                                            htmlFor="password"
                                            style={isInput[3] ? inputStyle : {}}
                                        >
                                            <span>
                                                {data.type === '忘记密码'
                                                    ? GetIntl(
                                                          'UserPage_resetting_password',
                                                      )
                                                    : GetIntl(
                                                          'UserPage_password',
                                                      )}
                                            </span>
                                        </label>
                                        <div
                                            className="isShow"
                                            onClick={isShowPassword}
                                        >
                                            <EyeInvisibleOutlined
                                                style={
                                                    flagPassword ? eyeStyle : {}
                                                }
                                            />
                                            <EyeOutlined
                                                style={
                                                    !flagPassword
                                                        ? eyeStyle
                                                        : {}
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* 确认密码 */}
                                {(data.type === '注册' ||
                                    data.type === '忘记密码') && (
                                    <div className="confirmPassword">
                                        <div className="field">
                                            <input
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={formValidation}
                                                ref={confirmPasswordRef}
                                                id="confirmPassword"
                                            />

                                            <label
                                                htmlFor="confirmPassword"
                                                style={
                                                    isInput[4] ? inputStyle : {}
                                                }
                                            >
                                                <span>
                                                    {GetIntl(
                                                        'UserPage_register_confirmPassword',
                                                    )}
                                                </span>
                                            </label>
                                            <div
                                                className="isShow"
                                                onClick={isShowPassword}
                                            >
                                                <EyeInvisibleOutlined
                                                    style={
                                                        flagPassword
                                                            ? eyeStyle
                                                            : {}
                                                    }
                                                />
                                                <EyeOutlined
                                                    style={
                                                        !flagPassword
                                                            ? eyeStyle
                                                            : {}
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* 协议 */}
                                {data.type === '注册' && (
                                    <div className="mc-privacy-policy">
                                        <Checkbox
                                            className="mc-privacy-checkbox"
                                            onChange={isChecked}
                                        ></Checkbox>

                                        <div className="privacy-container">
                                            {GetIntl(
                                                'UserPage_register_privacy',
                                            )}
                                            <Link to="https://www.matacart.com/xieyi.html">
                                                {GetIntl(
                                                    'UserPage_register_userAgreement',
                                                )}
                                            </Link>
                                            ，
                                            <Link to="https://www.matacart.com/privacy.html">
                                                {GetIntl(
                                                    'UserPage_register_privacyPolicy',
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {/* 提交 */}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ width: '100%' }}
                                    id="login-form-button"
                                    onClick={submitForm}
                                >
                                    {data.submText}
                                </Button>
                            </Form>

                            {/* 注册/忘记密码 */}
                            {data.type === '登录' && (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                    className="jump"
                                >
                                    <strong>
                                        <Link to="/user/signUp">
                                            {GetIntl('UserPage_register_text')}
                                        </Link>
                                    </strong>
                                    <strong>
                                        <Link to="/user/resetting">
                                            {GetIntl(
                                                'UserPage_login_forgetPassword',
                                            )}
                                        </Link>
                                    </strong>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 其他 登录/注册 方式 */}
                    {data.type === '登录' && (
                        <External dividerLine={data.dividerLine} />
                    )}
                </div>
            </div>

            {(data.type === '注册' || data.type === '忘记密码') && (
                <FormFooter />
            )}
        </>
    );
};

export default connect(mapStateToProps)(UserForm);
