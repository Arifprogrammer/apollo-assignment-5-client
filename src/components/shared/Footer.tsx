import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#003049]">
      <div className="footer p-10 my-container text-white">
        <div className="mx-auto lg:ml-0 text-center lg:text-start">
          <div className="mx-auto lg:ml-0">
            <Link to="/">
              <div className="flex items-end gap-1 pb-2">
                <h1 className="text-7xl font-bold text-[#F77F00] font-serif italic">
                  R
                </h1>
                <p className="italic text-xl font-semibold mb-1.5">
                  eserve <br /> ealm
                </p>
              </div>
            </Link>
          </div>
          <p>
            Reserve Realm Industries Ltd.
            <br />
            Providing digitalize & comfort rooms since 2012
          </p>
          <div className="flex items-center gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank">
              <FaFacebookSquare className="cursor-pointer" />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin className="cursor-pointer" />
            </a>
            <a href="https://youtube.com" target="_blank">
              <FaYoutube className="cursor-pointer" />
            </a>
          </div>
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
              info@reserve.com
            </p>
          </Link>
          <Link to="contact">
            <p className="link link-hover mx-auto lg:ml-0 hover:underline">
              +537 2234230
            </p>
          </Link>
          <a className="link link-hover mx-auto lg:ml-0">New York, USA</a>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Legal</span>
          <a className="link link-hover mx-auto lg:ml-0">Terms of Service</a>
          <a className="link link-hover mx-auto lg:ml-0">Privacy policy</a>
          <a className="link link-hover mx-auto lg:ml-0">Cookie policy</a>
        </div>
      </div>
      <div className="footer footer-center p-4 bg-[#154f6e] text-white">
        <p>
          Copyright © 2024 - All right reserved by Reserve Realm Industries Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
