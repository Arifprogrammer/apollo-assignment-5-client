import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import user1 from "../../../assets/images/users/user-1.jpg";
import user2 from "../../../assets/images/users/user-2.jpg";
import user3 from "../../../assets/images/users/user-3.jpg";

const reviews = [
  {
    userName: "GamerGuy007",
    img: user1,
    title: "Best Clicky Keys Ever!",
    description:
      "I finally found a keyboard with clicky keys that are satisfying to type on without being too loud for my roommates. The build quality is amazing, and I can't believe the difference it's made in my gaming performance.",
  },
  {
    userName: "KeyboardEnthusiast",
    img: user2,
    title: "A Dream Keyboard Come True",
    description:
      "This keyboard is a work of art! The customization options are endless, and the typing experience is truly exceptional. I'm so happy I invested in a high-quality mechanical keyboard, and this shop definitely exceeded my expectations.",
  },
  {
    userName: "QuietTypist",
    img: user3,
    title: "Perfect for Quiet Workspaces",
    description:
      "I was worried about finding a mechanical keyboard that wouldn't be too noisy for the office. This shop recommended a silent switch option that's been a lifesaver! Now I can enjoy the benefits of a mechanical keyboard without disturbing anyone around me.",
  },
];

const Testimonials = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="py-12 px-4 flex flex-col justify-center items-center w-full gap-6">
                <div className="flex gap-2 text-yellow-500">
                  <FaStar className="text-black" />
                  <FaStar className="text-black" />
                  <FaStar className="text-black" />
                  <FaStar className="text-black" />
                  <FaStar className="text-black" />
                </div>
                <h3 className="text-2xl text-rose-500 font-bold text-center mx-auto">
                  {review.title}
                </h3>
                <p className="text-center mx-auto w-4/5 md:w-1/2 text-gray-600">
                  {review.description}
                </p>
                <div className="avatar pt-4">
                  <div className="ring-black ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                    <img src={review.img} alt="user" />
                  </div>
                </div>
                <p className="text-black font-semibold">{review.userName}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Testimonials;
