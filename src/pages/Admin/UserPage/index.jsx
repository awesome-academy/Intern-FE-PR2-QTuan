import {
  Table,
  Modal,
  Radio,
  Popconfirm,
  Form,
  Row,
  Input,
  Select,
} from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editUserAction, getUserListAction } from "../../../redux/actions";

function UserPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userReducer.userList);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [filter, setFilter] = useState({});

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [userItemForm] = Form.useForm();

  useEffect(() => {
    dispatch(getUserListAction(filter));
  }, [filter]);

  useEffect(() => {
    userItemForm.resetFields();
  }, [userDetail.id]);

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
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        if (record.id === userInfo.id) {
          return <p className="mx-2">My account</p>;
        } else {
          return (
            <Row justify="space-between">
              <EditOutlined
                className="table-icon icon-primary"
                onClick={() => {
                  setIsModalVisible(true);
                  setUserDetail({ ...record });
                }}
              />
              <Popconfirm
                title={`Are you sure you want to lock this user?`}
                onConfirm={() => {
                  dispatch(
                    editUserAction({ userId: record.id, role: "disable" })
                  );
                }}
              >
                <UserDeleteOutlined className="table-icon icon-danger" />
              </Popconfirm>
              <div></div>
            </Row>
          );
        }
      },
    },
  ];

  const dataSource = userList.data.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  function handleEditUser() {
    const values = userItemForm.getFieldValue();
    dispatch(editUserAction({ userId: values.id, role: values.role }));
    setIsModalVisible(false);
  }

  function handleSelect(value) {
    if (value === "") {
      const newFilter = filter;
      delete newFilter.role;
      setFilter({ ...newFilter });
    } else {
      setFilter({ ...filter, role: value });
    }
  }

  return (
    <main className="user-page">
      <Modal
        title={`User's account ${userDetail.fullName}`}
        visible={isModalVisible}
        onOk={() => handleEditUser()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          initialValues={userDetail}
          form={userItemForm}
          name="userItemForm"
        >
          <Form.Item label="Email">
            <Input
              placeholder="Email address"
              disabled
              value={userDetail.email}
            />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Radio.Group>
              <Radio value="admin">Admin</Radio>
              <Radio value="user">User</Radio>
              <Radio value="disable">Disable</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <p className="user-page__title">User management</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <div></div>
          <Search
            placeholder="input search text"
            allowClear
            className="user-page__main--search"
            enterButton="Search"
            size="large"
            onSearch={(value) => setFilter({ ...filter, q: value })}
          />
          <Select
            defaultValue=""
            className="user-page__main--select"
            onChange={(value) => handleSelect(value)}
          >
            <Option value="">All</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Row>
        <Table
          dataSource={dataSource}
          loading={userList.load}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  );
}

export default UserPage;
