import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import user1 from "../../../assets/images/users/user-1.jpg";
import user2 from "../../../assets/images/users/user-2.jpg";
import user3 from "../../../assets/images/users/user-3.jpg";
import React from "react";

const reviews = [
  {
    userName: "GamerGuy007",
    img: user1,
    title: "Effortless Scheduling",
    description:
      "I love how easy it is to find available meeting times and book a room. The system is intuitive and user-friendly, saving me a lot of time.",
  },
  {
    userName: "KeyboardEnthusiast",
    img: user2,
    title: "Reliable and Efficient",
    description:
      "The booking system has been a lifesaver for our team. It's always reliable and ensures that everyone knows when and where their meetings are scheduled. Highly recommended!",
  },
  {
    userName: "QuietTypist",
    img: user3,
    title: "Great Features, Great Value",
    description:
      "I've been using this booking system for months and I'm really impressed with the features. It's not only easy to use but also offers great value for the price. I'd definitely recommend it to others.",
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
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (
                      <React.Fragment key={star}>
                        <FaStar className="text-[#D62828]" />
                      </React.Fragment>
                    );
                  })}
                </div>
                <h3 className="text-2xl text-[#D62828] font-bold text-center mx-auto">
                  {review.title}
                </h3>
                <p className="text-center mx-auto w-4/5 md:w-1/2 text-gray-600">
                  {review.description}
                </p>
                <div className="avatar pt-4">
                  <div className="ring-[#D62828] ring-offset-[#D62828] w-12 rounded-full ring ring-offset-2">
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
