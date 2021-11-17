import { Carousel, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerListAction } from "../../../redux/actions";
import "./styles.scss";

function BannerSilder() {
  const dispatch = useDispatch();

  const bannerList = useSelector((state) => state.bannerReducer.bannerList);

  useEffect(() => {
    dispatch(getBannerListAction({}));
  }, []);

  function renderBannerList() {
    if (!bannerList.load) {
      return bannerList.data.map((item, index) => {
        return (
          <div key={index} className="banner-slider__item">
            <div className="relative">
              <img src={`${item.imgUrl}`} alt="banner" />
              <div className="banner-slider__content">
                <h3>{item.type}</h3>
                <h2>{item.content}</h2>
              </div>
            </div>
          </div>
        );
      });
    }

    return <Spin />;
  }

  return (
    <div className="banner-slider">
      <Carousel autoplay>{renderBannerList()}</Carousel>
    </div>
  );
}

export default BannerSilder;
