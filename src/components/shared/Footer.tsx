import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="footer p-10 my-container text-white">
        <div className="mx-auto lg:ml-0 text-center lg:text-start">
          <div className="mx-auto lg:ml-0">
            <Link to="/">
              <h1 className="text-xl lg:text-3xl font-semibold">
                Key<span className="italic text-rose-500">stroke</span>
              </h1>
            </Link>
          </div>
          <p>
            Keystroke Industries Ltd.
            <br />
            Providing quality products since 2012
          </p>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Services</span>
          <a className="link link-hover mx-auto lg:ml-0">Branding</a>
          <a className="link link-hover mx-auto lg:ml-0">Design</a>
          <a className="link link-hover mx-auto lg:ml-0">Marketing</a>
          <a className="link link-hover mx-auto lg:ml-0">Advertisement</a>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Company</span>
          <Link to="/about">
            <p className="link link-hover mx-auto lg:ml-0 hover:underline">
              About us
            </p>
          </Link>
          <Link to="contact">
            <p className="link link-hover mx-auto lg:ml-0 hover:underline">
              Contact
            </p>
          </Link>
          <a className="link link-hover mx-auto lg:ml-0">Jobs</a>
          <a className="link link-hover mx-auto lg:ml-0">Press kit</a>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Legal</span>
          <a className="link link-hover mx-auto lg:ml-0">Terms of use</a>
          <a className="link link-hover mx-auto lg:ml-0">Privacy policy</a>
          <a className="link link-hover mx-auto lg:ml-0">Cookie policy</a>
        </div>
      </div>
      <div className="footer footer-center p-4 bg-slate-900 text-white">
        <p>Copyright © 2024 - All right reserved by Keystroke Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
