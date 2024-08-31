import { SubmitHandler, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema";
import Navbar from "../../components/shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res.token) as TUser;
      if (user) {
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

        dispatch(setUser({ user: user, token: res.token }));
        navigate("/");
      }

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
          <PHForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
            <PHInput type="email" name="email" label="Email"></PHInput>
            <PHInput type="password" name="password" label="Password"></PHInput>
            <button
              type="submit"
              className="btn bg-[#D62828] border-none text-white w-full mx-auto font-bold mt-4"
            >
              Login
            </button>
            <p className="text-sm mt-px">
              Don't have an account?{" "}
              <Link to="/register">
                <strong className="cursor-pointer text-[#154f6e]">
                  Register
                </strong>
              </Link>
            </p>
          </PHForm>
        </div>
      </section>
    </>
  );
};

export default Login;
