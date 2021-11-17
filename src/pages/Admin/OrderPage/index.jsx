import {
  Row,
  Input,
  Select,
  Popconfirm,
  Table,
  Button,
  Space,
  List,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderListAction,
  reviewOrderAction,
} from "../../../redux/actions";
import { formatAddress } from "../../../utils/helper";
import "./styles.scss";

function OrderPage() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderReducer.orderList);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    dispatch(getOrderListAction(filter));
  }, [filter]);

  const { Search } = Input;
  const { Option } = Select;

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => {
        return <p className="mx-2">${record.totalPrice}</p>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        if (record.status === 1) {
          return (
            <Space>
              <Button
                type="primary"
                ghost
                onClick={() =>
                  dispatch(reviewOrderAction({ ...record, status: 2 }))
                }
              >
                Confirm
              </Button>
              <Popconfirm
                title={`Are you sure you want to cancel this order?`}
                okText="Oke"
                cancelText="No"
                onConfirm={() =>
                  dispatch(reviewOrderAction({ ...record, status: 3 }))
                }
              >
                <Button danger>Cancel</Button>
              </Popconfirm>
            </Space>
          );
        } else if (record.status === 2) {
          return (
            <p className="order-page__status--comfirm order-page__status">
              Order comfirmed
            </p>
          );
        } else {
          return (
            <p className="order-page__status--canncel order-page__status">
              Order canceled
            </p>
          );
        }
      },
    },
  ];

  const dataSource = orderList.data.map((item) => {
    const { phone, name, email, country, district, ward, address } =
      item.userInfo;
    return {
      ...item,
      key: item.id,
      name,
      address: `${formatAddress(country)} - ${formatAddress(
        district
      )} - ${formatAddress(ward)} (${address})`,
      phone,
      email,
    };
  });

  function handleSelect(value) {
    if (value === "") {
      const newFilter = filter;
      delete newFilter.status;
      setFilter({ ...newFilter });
    } else {
      setFilter({ ...filter, status: value });
    }
  }

  return (
    <main className="order-page">
      <p className="order-page--title">Order Management</p>
      <Row justify="space-between" className="order-page__main">
        <div></div>
        <Search
          placeholder="input search text"
          allowClear
          className="order-page__main--search"
          enterButton="Search"
          size="large"
          onSearch={(value) => setFilter({ ...filter, q: value })}
        />
        <Select
          defaultValue=""
          className="order-page__main--select"
          onChange={(value) => handleSelect(value)}
        >
          <Option value="">All</Option>
          <Option value={1}>Order Waiting</Option>
          <Option value={2}>Order comfirmed</Option>
          <Option value={3}>Order canceled</Option>
        </Select>
      </Row>
      <Table
        dataSource={dataSource}
        loading={orderList.load}
        columns={tableColumns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <List
                size="small"
                dataSource={record.cartList}
                renderItem={(item) => (
                  <List.Item className="order-page__list--item">
                    <Row className="order-page__list--row" align="middle">
                      <Col span={3}>
                        <img src={item.imgs[0]} alt="" />
                      </Col>
                      <Col span={8}>
                        <p>Name : {item.name}</p>
                      </Col>
                      <Col span={5}>
                        <p>
                          Size: {item.size.id ? item.size.title : "Default"}
                        </p>
                        <p>
                          Color: {item.color.id ? item.color.title : "Default"}
                        </p>
                      </Col>
                      <Col span={4}>
                        <p>Amount: {item.amount}</p>
                      </Col>
                      <Col span={4}>
                        <p>
                          Price: $
                          {(item.price +
                            (item.size.price ? item.size.price : 0) +
                            (item.color.price ? item.color.price : 0)) *
                            item.amount}
                        </p>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            );
          },
        }}
      />
    </main>
  );
}

export default OrderPage;
