import {
  Row,
  InputNumber,
  Input,
  Table,
  Popconfirm,
  Select,
  Drawer,
  Form,
  Upload,
  Button,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { useEffect, useState } from "react";
import {
  addProductAction,
  deleteProuctItemAction,
  editProductItemAction,
  getCategoryListAction,
  getProductListAction,
  setProductSelectAction,
} from "../../../redux/actions";

function ProductPage() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [visible, setVisible] = useState(false);

  const [productDetailForm] = Form.useForm();

  const productList = useSelector((state) => state.productReducer.productList);

  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );

  const productSelected = useSelector(
    (state) => state.productReducer.productSelected
  );

  useEffect(() => {
    dispatch(getProductListAction(filter));
    dispatch(getCategoryListAction({}));
  }, [filter]);

  useEffect(() => {
    productDetailForm.resetFields();
  }, [productSelected.id]);

  const { TextArea, Search } = Input;

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Images",
      dataIndex: "imgs",
      key: "imgs",
      render: (_, record) => {
        return <img src={record.imgs[0]} className="product-page__img" />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return <p>${record.price}</p>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Row justify="space-between">
          <EditOutlined
            className="table-icon icon-primary"
            onClick={() => {
              handleEditProduct(record);
            }}
          />
          <Popconfirm
            title={`Are you sure you want to delete this product?`}
            onConfirm={() => dispatch(deleteProuctItemAction(record.id))}
          >
            <DeleteOutlined className="table-icon icon-danger" />
          </Popconfirm>
          <div></div>
        </Row>
      ),
    },
  ];

  const dataSource = productList.data.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  function handleSelect(value) {
    if (value === "") {
      const newFilter = filter;
      delete newFilter.categoryId;
      setFilter({ ...newFilter });
    } else {
      setFilter({ ...filter, categoryId: value });
    }
  }

  function handleEditProduct(record) {
    const formImages = record.imgs.map((img, index) => ({
      uid: index,
      name: `image-${index + 1}.jpg`,
      type: "image/jpeg",
      thumbUrl: img,
    }));
    dispatch(setProductSelectAction({ ...record, imgs: formImages }));
    setVisible(true);
  }

  function handleSubmitProductForm(values) {
    const newImages = values.imgs.map((file) => file.thumbUrl);
    if (productSelected.id) {
      dispatch(
        editProductItemAction({
          ...values,
          imgs: newImages,
          id: productSelected.id,
        })
      );
    } else {
      dispatch(
        addProductAction({
          ...values,
          imgs: newImages,
          subCategoryId: 1,
          discount: 10,
          isNew: false,
          alt: "product",
          rate: 5,
        })
      );
    }
  }

  return (
    <main className="product-page">
      <Drawer
        title={productSelected ? "Edit product" : "Add product"}
        placement="right"
        width={500}
        onClose={() => {
          setVisible(false);
          dispatch(setProductSelectAction({}));
        }}
        visible={visible}
      >
        <Form
          form={productDetailForm}
          name="productDetailForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 28 }}
          onFinish={(values) => handleSubmitProductForm(values)}
          initialValues={productSelected.id ? { ...productSelected } : {}}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select>
              {categoryList.data.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Cost"
            name="price"
            rules={[{ required: true, message: "Please input cost!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            label="Images"
            name="imgs"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
            validateFirst
            rules={[
              { required: true, message: "Please upload photos!" },
              () => ({
                validator(_, value) {
                  if (!["image/png", "image/jpeg"].includes(value[0].type)) {
                    return Promise.reject(
                      "The file is not in the correct format"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Button htmlType="submit" type="primary">
                {!productSelected.id ? "Add Product" : "Edit Product"}
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
      <p className="product-page__title">Product management</p>
      <div className="product-page__main">
        <Row justify="space-between" className="product-page__main--top">
          <Button
            icon={<UploadOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Add Product
          </Button>
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
            className="product-page__main--select"
            onChange={(value) => handleSelect(value)}
          >
            <Select.Option value="">All</Select.Option>
            {categoryList.data.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
      </div>
      <Table
        dataSource={dataSource}
        loading={productList.load}
        columns={tableColumns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
      />
    </main>
  );
}

export default ProductPage;
