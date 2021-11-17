import { Tabs, Row, Col, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartListAction,
  getProductListAction,
} from "../../../redux/actions";
import BannerSilder from "../../../components/User/BannerSlider";
import ProductItem from "../../../components/User/ProductItem";
import cabinet from "../../../assets/images/cabinet.jpg";
import "./styles.scss";

const tagList = ["summer", "shelf", "sale", "hot"];

function HomePage() {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productReducer.productList);

  useEffect(() => {
    dispatch(getProductListAction({}));
    dispatch(getCartListAction({}));
  }, []);

  function renderProductList() {
    if (!productList.load) {
      return productList.data.map((item) => {
        return (
          <Col key={item.id} span={8}>
            <ProductItem product={item} />
          </Col>
        );
      });
    }

    return <Spin />;
  }

  return (
    <main className="home container-1">
      <BannerSilder />
      <section className="home__product">
        <Tabs defaultActiveKey="2" centered>
          <TabPane tab="New" key="1">
            <Row gutter={16}>{renderProductList()}</Row>
          </TabPane>
          <TabPane tab="Popular" key="2">
            <Row gutter={16}>{renderProductList()}</Row>
          </TabPane>
          <TabPane tab="Sale" key="3">
            <Row gutter={16}>{renderProductList()}</Row>
          </TabPane>
        </Tabs>
      </section>
      <section className="home__sale">
        <img src={cabinet} alt="cabinet" />
        <ul className="home__sale--tag">
          {tagList.map((item, index) => (
            <li key={index}>{`#${item}`}</li>
          ))}
        </ul>
        <p className="home__sale--content">
          Up To 40% Off Final Sale Items. Caught in the moment!
        </p>
      </section>
    </main>
  );
}

export default HomePage;
