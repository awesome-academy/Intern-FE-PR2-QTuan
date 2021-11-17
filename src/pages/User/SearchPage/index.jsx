import { Row, Col, Spin, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getProductListAction } from "../../../redux/actions";
import ProductItem from "../../../components/User/ProductItem";
import queryString from "query-string";
import "./styles.scss";

function SearchPage() {
  let location = useLocation();
  const searchParsed = queryString.parse(location.search);
  const [params, setParams] = useState({ _page: 1, _limit: 16 });

  const productList = useSelector((state) => state.productReducer.productList);
  console.log(
    "🚀 ~ file: index.jsx ~ line 14 ~ SearchPage ~ productList",
    productList
  );

  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductListAction({ ...searchParsed, ...params }));
  }, [location, params]);

  function renderProductList() {
    if (!productList.load) {
      return productList.data.map((item) => {
        return (
          <Col span={8} key={item.id}>
            <ProductItem product={item} />
          </Col>
        );
      });
    }

    return (
      <div className="product-list__loading">
        <Spin />
      </div>
    );
  }

  return (
    <main className="search-page ">
      <div className="container-1">
        <p className="search-page__title">{`Search results for "${searchParsed.q}" (${productList.total} results)`}</p>
        <Row gutter={16} className="search-page__main">
          <Col span={4} className="search-page__category">
            <ul className="search-page__category--list">
              <li
                className={`search-page__category--item ${
                  !params.categoryId ? "active" : ""
                }`}
                onClick={() => setParams({ _page: 1, _limit: 16 })}
              >
                All
              </li>
              {categoryList.data.map((item) => (
                <li
                  className={`search-page__category--item ${
                    item.id === params.categoryId ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => setParams({ ...params, categoryId: item.id })}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </Col>
          <Col span={20}>
            <Row gutter={16}>{renderProductList()}</Row>
          </Col>
        </Row>
        <Row justify="end">
          <Pagination
            defaultCurrent={1}
            pageSize={params._limit}
            total={productList.total}
            onChange={(page) => setParams({ ...params, _page: page })}
          />
        </Row>
      </div>
    </main>
  );
}

export default SearchPage;
