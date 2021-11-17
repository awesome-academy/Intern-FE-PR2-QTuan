import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { REGEX } from "../../../constants/validate";
import TitlePage from "../../../components/User/TitlePage";
import { useDispatch } from "react-redux";
import { registerAction } from "../../../redux/actions";
import "./styles.scss";

function RegisterPage() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { email, firstName, lastName, password } = values;
    let fullName = firstName + " " + lastName;

    dispatch(registerAction({ email, fullName, password, role : "user" }));
  };

  return (
    <main className="register container-1">
      <TitlePage title="Register Page" />
      <Row justify="center">
        <Col span={12}>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{}}
            onFinish={onFinish}
          >
            <p className="register-title">
              If you don’t have an account, register now!
            </p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.match(REGEX.EMAIL_REGEX)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("The input is not valid E-mail!")
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your firt name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button my-1"
                  size="large"
                >
                  Register
                </Button>
              </Row>
              <Link to="/" className="register-form-home">
                Go to home page
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  );
}

export default RegisterPage;
