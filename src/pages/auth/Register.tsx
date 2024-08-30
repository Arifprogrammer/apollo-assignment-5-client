import { SubmitHandler, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schemas/auth.schema";
import Navbar from "../../components/shared/Navbar";
import { Link } from "react-router-dom";

const Register = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen grid place-items-center">
        <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl text-black p-4 md:p-6 border-2 border-[#154f6e]">
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(registrationSchema)}
          >
            <PHInput type="text" name="name" label="Name"></PHInput>
            <PHInput type="email" name="email" label="Email"></PHInput>
            <PHInput type="password" name="password" label="Password"></PHInput>
            <PHInput type="text" name="phone" label="Phone"></PHInput>
            <PHInput type="text" name="address" label="Address"></PHInput>
            <button
              type="submit"
              className="btn bg-[#D62828] border-none text-white w-full mx-auto font-bold mt-4"
            >
              Register
            </button>
            <p className="text-sm mt-px">
              Already have an account?{" "}
              <Link to="/login">
                <strong className="cursor-pointer text-[#154f6e]">Login</strong>
              </Link>
            </p>
          </PHForm>
        </div>
      </section>
    </>
  );
};

export default Register;
