import { SubmitHandler, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schemas/auth.schema";
import Navbar from "../../components/shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await register(data).unwrap();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${res.message}`,
      });

      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `${err.data.errorMessages[0].message}`,
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen grid place-items-center">
        <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl text-black p-4 md:p-6 border-2 border-[#154f6e]">
          <PHForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
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
