import { Col, Pagination, Rate, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../../components/User/ProductItem";
import { getProductListAction } from "../../../redux/actions";
import { filterPrices } from "../../../utils/helper";
import "./styles.scss";

function ProductListPage({ match }) {
  const [filter, setFilter] = useState({ _page: 1, _limit: 9 });
  const [subCategorySelected, setSubCategorySelected] = useState(null);

  const [priceSelected, setPriceSelected] = useState(null);
  const [rateSelected, setRateSelected] = useState(null);

  const dispatch = useDispatch();
  const categoryId = parseInt(match.params.id);

  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );

  const categoryIndex = categoryList.data.findIndex(
    (item) => item.id === categoryId
  );

  const productList = useSelector((state) => state.productReducer.productList);

  useEffect(() => {
    setFilter({ _page: 1, _limit: 9 });
    setSubCategorySelected(null);
    setRateSelected(null);
    setPriceSelected(null);
  }, [categoryId]);

  useEffect(() => {
    dispatch(getProductListAction({ ...filter, categoryId }));
  }, [filter]);

  function renderSubCategory() {
    if (!categoryList.load) {
      return categoryList.data[categoryIndex]?.subCategories.map((item) => (
        <li
          className={`sidebar-item ${
            item.id === subCategorySelected ? "active" : ""
          }`}
          key={item.id}
          onClick={() => {
            setFilter({
              ...filter,
              subCategoryId: item.id,
              _page: 1,
            });
            setSubCategorySelected(item.id);
          }}
        >
          {item.name}
        </li>
      ));
    }
    return <Spin />;
  }

  function renderPriceFilter() {
    return filterPrices.map((item, index) => (
      <li
        className={`sidebar-item ${index === priceSelected ? "active" : ""}`}
        key={index}
        onClick={() => {
          setFilter({
            ...filter,
            price_gte: item.start,
            price_lte: item.end,
            _page: 1,
          });
          setPriceSelected(index);
        }}
      >
        {item.start !== 1000
          ? `$${item.start} - ${item.end}`
          : `≥ $${item.start}`}
      </li>
    ));
  }

  function renderRateFilter() {
    const arrRates = [2, 3, 4, 5];

    return arrRates.map((item) => (
      <li
        className={rateSelected === item ? "rate-item active" : ""}
        key={item}
        onClick={() => {
          setFilter({ ...filter, rate: item, page: 1 });
          setRateSelected(item);
        }}
      >
        <Rate disabled defaultValue={item} />
      </li>
    ));
  }

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

  function handleSortBy(e) {
    const value = e.target.value;

    setFilter({
      ...filter,
      _sort: value !== "Featured" ? "price" : "",
      _order: value !== "Featured" ? value : "",
    });
  }

  return (
    <main className="product-list container-1">
      <div className="product-list__top">
        <h2>{categoryList.data[categoryIndex]?.name}</h2>
      </div>
      <Row className="product-list__section" gutter={16}>
        <Col className="sidebar" span={4}>
          <p
            className={`sidebar__all ${
              subCategorySelected || priceSelected || rateSelected
                ? ""
                : "active"
            }`}
            onClick={() => {
              setFilter({ _page: 1, _limit: 9 });
              setRateSelected(null);
              setPriceSelected(null);
              setSubCategorySelected(null);
            }}
          >
            All
          </p>
          <div className="sidebar__category">
            <p>Categories</p>
            <ul className="sidebar__category--list">{renderSubCategory()}</ul>
          </div>
          <div className="sider__price">
            <p>Prices</p>
            <ul className="sidebar__price--list">{renderPriceFilter()}</ul>
          </div>
          <div className="sider__rate">
            <p>Rates</p>
            <ul className="sidebar__price--list">{renderRateFilter()}</ul>
          </div>
        </Col>
        <Col className="product-list__main" span={20}>
          <Row className="main__top" justify="space-between">
            <h4>
              {`${
                !productList.load ? productList.total : 0
              } results found in 4ms`}
            </h4>
            <div>
              <label htmlFor="sort">Sort by </label>
              <select
                name="sort"
                id="sort"
                onChange={(e) => {
                  handleSortBy(e);
                }}
              >
                <option defaultValue>Featured</option>
                <option value="asc">Price asc</option>
                <option value="desc">Price desc</option>
              </select>
            </div>
          </Row>
          <Row gutter={16}>{renderProductList()}</Row>
          <Row justify="center">
            <Pagination
              defaultCurrent={1}
              pageSize={filter._limit}
              total={productList.total}
              className={`${productList.data.length <= 0 ? "d-none" : ""}`}
              onChange={(page) => {
                setFilter({ ...filter, _page: page });
              }}
            />
            {productList.data.length <= 0 ? (
              <h2>Sorry, no products were found to match your selection</h2>
            ) : (
              ""
            )}
          </Row>
        </Col>
      </Row>
    </main>
  );
}

export default ProductListPage;
