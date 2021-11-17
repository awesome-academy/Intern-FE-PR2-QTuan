import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Input, Menu, Dropdown, notification } from "antd";
import history from "../../../utils/history";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CloseOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Logo from "../../../assets/logo/logo.png";
import {
  getCartListAction,
  getCategoryListAction,
  logoutAction,
} from "../../../redux/actions";
import "./styles.scss";

function Header() {
  const [isShowInput, setIsShowInput] = useState(false);
  const dispatch = useDispatch();

  const { Search } = Input;

  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );

  const lengthCart = useSelector(
    (state) => state.cartReducer.cartList.totalCartList
  );

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(getCategoryListAction({}));
    dispatch(getCartListAction({}));
  }, []);

  function renderCategory() {
    if (!categoryList.load) {
      return categoryList.data?.map((item) => (
        <li key={item.id} onClick={() => history.push(`/category/${item.id}`)}>
          {item.name}
        </li>
      ));
    }
  }

  function handleLogout() {
    dispatch(logoutAction({}));
    history.push("/");
  }

  function handleHeaderCart() {
    if (userInfo) {
      history.push("/cart");
    } else {
      notification.warning({
        message: "Đăng nhập để xem giỏ hàng!",
      });
      history.push("/login");
    }
  }

  function handleSearchProduct(value) {
    history.push(`/search?q=${value}`);
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => history.push("/profile")}>
        {`My account (${userInfo?.fullName})`}
      </Menu.Item>
      {userInfo?.role === "admin" ? (
        <Menu.Item key="3" onClick={() => history.push("/admin")}>
          Back to Admin page
        </Menu.Item>
      ) : (
        ""
      )}
      <Menu.Item key="2" onClick={() => handleLogout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="header container-2">
        <Row className="header__section" justify="space-between" align="middle">
          <img src={Logo} alt="logo" onClick={() => history.push("/")} />

          {isShowInput ? (
            <Search
              className="header__search"
              size="large"
              placeholder="Search product..."
              onSearch={(value) => handleSearchProduct(value)}
              enterButton
            />
          ) : (
            <ul className="header__category">{renderCategory()}</ul>
          )}

          <ul className="header__toolbox">
            <li className="toolbox__item">
              {isShowInput ? (
                <CloseOutlined onClick={() => setIsShowInput(!isShowInput)} />
              ) : (
                <SearchOutlined onClick={() => setIsShowInput(!isShowInput)} />
              )}
            </li>
            <li className="toolbox__item">
              <HeartOutlined />
              <span className="toolbox__item--number">1</span>
            </li>
            <li className="toolbox__item" onClick={() => handleHeaderCart()}>
              <ShoppingCartOutlined />
              <span className="toolbox__item--number">{lengthCart}</span>
            </li>
            {userInfo ? (
              <li className="toolbox__item">
                <Dropdown overlay={menu} onClick={(e) => e.preventDefault()}>
                  <UserOutlined />
                </Dropdown>
              </li>
            ) : (
              <li className="toolbox__item">
                <LoginOutlined onClick={() => history.push("/login")} />
              </li>
            )}
          </ul>
        </Row>
      </header>
    </>
  );
}

export default Header;
