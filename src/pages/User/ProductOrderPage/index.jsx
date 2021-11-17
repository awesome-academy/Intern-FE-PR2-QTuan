import TitlePage from "../../../components/User/TitlePage";
import { Row, Col, Input, Form, Button, Select, notification } from "antd";
import { useState, useEffect } from "react";
import { REGEX } from "../../../constants/validate";
import { useDispatch, useSelector } from "react-redux";
import { addToOrderAction } from "../../../redux/actions";
import { getCartListAction } from "../../../redux/actions";
import PATH from "../../../constants/path";
import moment from "moment";
import history from "../../../utils/history";
import "./styles.scss";

function ProductOrderPage() {
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [values, setValues] = useState({
    city: "",
    district: "",
    wards: "",
  });

  const [countries, setCountries] = useState([]);
  const [districtss, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const cartList = useSelector((state) => state.cartReducer.cartList);

  useEffect(() => {
    dispatch(getCartListAction({}));
  }, []);

  // 48/Thành_phô_Đà_Nẵng
  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(process.env.REACT_APP_ADDRESS_URL + "/city");
      setCountries(await response.json());
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    async function fetchDistrictData(cityData) {
      const [code] = cityData.split("/");
      const response = await fetch(
        process.env.REACT_APP_ADDRESS_URL + "/provider?parentcode=" + code
      );
      setDistrict(await response.json());
    }
    fetchDistrictData(values.city);
  }, [values.city]);

  useEffect(() => {
    async function fetchWardsData(districtData) {
      const [code] = districtData.split("/");
      const response = await fetch(
        process.env.REACT_APP_ADDRESS_URL + "/ward?parentcode=" + code
      );
      setWards(await response.json());
    }
    fetchWardsData(values.district);
  }, [values.district]);

  const onFinish = (values) => {
    moment.locale("vi");
    dispatch(
      addToOrderAction({
        userInfo: values,
        userId: userInfo.id,
        cartList: cartList.data,
        totalPrice: totalPrice(),
        date: moment().format("L"),
        time: moment().format("LT"),
        status: 1,
      })
    );
    localStorage.removeItem("cartList");
    notification.success({
      message: "Đặt hàng thành công!",
    });
    dispatch(getCartListAction({}));
    history.push(PATH.THANKS);
  };

  function renderCity() {
    return countries.map((item, index) => {
      return (
        <Select.Option key={index} value={item.code + "/" + item.name}>
          {item.name}
        </Select.Option>
      );
    });
  }

  function renderDistrict() {
    return districtss.map((item, index) => {
      return (
        <Select.Option key={index} value={item.code + "/" + item.name}>
          {item.name}
        </Select.Option>
      );
    });
  }

  function renderWard() {
    return wards.map((item, index) => {
      return (
        <Select.Option key={index} value={item.code + "/" + item.name}>
          {item.name}
        </Select.Option>
      );
    });
  }

  function renderProductCart() {
    return cartList.data.map((item, index) => {
      return (
        <Row className="order-page__item" gutter={10} key={index}>
          <Col span={6}>
            <img className="order-page__item--img" src={item.imgs[0]} alt="" />
          </Col>
          <Col span={18} className="order-page__content">
            <Row justify="space-between">
              <p className="order-page__item--name">
                {item.name} x {item.amount}
              </p>
            </Row>
            <p className="order-page__item--price">
              $
              {(
                (item.price +
                  (item.size.price ? item.size.price : 0) +
                  (item.color.price ? item.color.price : 0)) *
                item.amount
              ).toLocaleString()}
            </p>
            <p className="order-page__item--option">
              Size : {item.size.title ? item.size.title : "Default"}, Color:{" "}
              {item.color.title ? item.color.title : "Default"}
            </p>
          </Col>
        </Row>
      );
    });
  }

  function totalPrice() {
    let total = 0;
    cartList.data.forEach((item) => {
      total +=
        (item.price +
          (item.color.price ? item.color.price : 0) +
          (item.size.price ? item.size.price : 0)) *
        item.amount;
    });

    return total.toLocaleString();
  }

  return (
    <main className="container-1 order-page">
      <TitlePage title="Checkout Page" />
      <Row gutter={16}>
        <Col span={14}>
          <Form
            className="order-page__form"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 28 }}
            initialValues={{
              name: userInfo.fullName,
              email: userInfo.email,
              phone: userInfo.phone,
            }}
            onFinish={onFinish}
          >
            <p className="order-page__form--title">Billing Address</p>
            <Form.Item
              name="name"
              label="Fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.match(REGEX.PHONE_NUMBER_REGEX)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("The input is not valid Phone number!")
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
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
              <Input />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Select
                placeholder="Choose a country"
                onChange={(value) => setValues({ ...values, city: value })}
              >
                {renderCity()}
              </Select>
            </Form.Item>
            <Form.Item
              label="District"
              name="district"
              rules={[
                {
                  required: true,
                  message: "Please input your District!",
                },
              ]}
            >
              <Select
                placeholder="Choose a district"
                onChange={(value) => setValues({ ...values, district: value })}
              >
                {renderDistrict()}
              </Select>
            </Form.Item>
            <Form.Item
              label="Wards"
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Select placeholder="Choose a Wards">{renderWard()}</Select>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Row justify="center">
                <Button type="primary" htmlType="submit" size="large">
                  Place Order
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
        <Col span={10} className="order-page__list">
          <h3>Cart Total</h3>
          {renderProductCart()}
          <p className="order-page__list--total">Total: ${totalPrice()}</p>
        </Col>
      </Row>
    </main>
  );
}

export default ProductOrderPage;
