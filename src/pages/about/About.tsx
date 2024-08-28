import React from "react";
import about from "../../assets/animation/about.json";
import Lottie from "lottie-react";
import user1 from "../../assets/images/users/user-1.jpg";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";

const cardData = [
  { image: user1, bio: "Alex (HR Manager)" },
  { image: user2, bio: "Kary (Marketing Manager)" },
  { image: user3, bio: "Toply (CEO & Founder)" },
];

const About = () => {
  return (
    <section className="text-black px-6 md:px-0 w-full md:w-1/2 mx-auto my-16 md:my-24 flex flex-col gap-4 items-center text-center">
      <div className="-mt-20">
        <Lottie animationData={about} loop={true} style={{ height: 500 }} />
      </div>
      <div className="md:w-3/4 text-justify">
        <h1 className="text-center text-2xl md:text-4xl text-[#003049] mb-6 font-bold">
          Our Mission
        </h1>
        At Reserve Realm, we're passionate about simplifying the process of
        scheduling meetings. Our mission is to create a user-friendly platform
        that streamlines the booking process, allowing individuals and teams to
        focus on what truly matters: their work.
      </div>
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] my-6 font-bold">
        Meet The Team
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card) => {
          return (
            <React.Fragment key={card.bio}>
              <div className="card bg-[#003049] text-white font-semibold w-full overflow-hidden shadow-xl">
                <figure>
                  <img
                    src={card.image}
                    alt="select-room"
                    className="w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title !text-lg text-nowrap mx-auto">
                    {card.bio}
                  </h2>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] my-6 font-bold">
        Our Story
      </h1>
      <p>
        Reserve Realm was born out of a shared frustration with the complexities
        of traditional meeting scheduling. We recognized the need for a more
        efficient and intuitive solution. With a focus on user experience and
        innovation, we developed a platform that empowers individuals and teams
        to easily book meeting rooms and manage their schedules.
      </p>
      <p className="text-lg font-bold text-[#154f6e]">
        Join us in revolutionizing the way you schedule meetings. Experience the
        Reserve Realm difference today!
      </p>
    </section>
  );
};

export default About;
