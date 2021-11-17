import TitlePage from "../../../components/User/TitlePage";
import history from "../../../utils/history";
import { Row, Button } from "antd";
import "./styles.scss";
import { useEffect } from "react";
import { getCartListAction } from "../../../redux/actions";
import { useDispatch } from "react-redux";

function ThanksPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartListAction({}));
  }, []);

  return (
    <main className="thanks-page">
      <TitlePage title="Thank you!" />
      <div className="container-1">
        <div className="thanks-page__main">
          <p className="thanks-page__main--content">
            Thank you for your purchase, the product will be delivered to you in
            the next 3-5 days
          </p>
          <Row justify="center">
            <Button onClick={() => history.push("/")} type="primary">
              Go to Home page
            </Button>
          </Row>
        </div>
      </div>
    </main>
  );
}

export default ThanksPage;
