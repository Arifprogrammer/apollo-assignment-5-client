const Contact = () => {
  return (
    <div className="text-black px-6 md:px-0 w-full md:w-[50%] mx-auto flex flex-wrap justify-center md:justify-between items-center text-center gap-2 mt-20 md:mt-40 pb-20">
      <div>
        <h1 className="text-center text-2xl md:text-4xl text-[#003049] my-6 font-bold">
          Contact Information
        </h1>
        <ul className="font-semibold">
          <li>Email: info@reserve.com</li>
          <li>Phone: (+880) 199559545</li>
          <li>Address: New York, USA</li>
        </ul>
      </div>
      <div>
        <h1 className="text-center text-2xl md:text-4xl text-[#003049] my-6 font-bold">
          Contact Form
        </h1>
        <div className="card w-80 md:w-96 shrink-0 shadow-2xl text-black">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Subject</span>
              </label>
              <input
                type="text"
                placeholder="subject"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered bg-transparent"
                placeholder="message"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#D62828] border-none text-white">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
