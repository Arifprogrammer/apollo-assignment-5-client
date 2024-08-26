import room from "../../assets/images/room-banner-edited.webp";

const Home = () => {
  return (
    <main>
      {/* //*Hero */}
      <section className="pt-12 md:pt-24 bg-[#003049]">
        <div>
          <img src={room} alt="keyboard" className="size-full" />
        </div>
      </section>
    </main>
  );
};

export default Home;
