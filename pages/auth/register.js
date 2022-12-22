import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";

function Register() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    phone: Yup.string().required("Phone is required"),
    telegram: Yup.string().required("Telegram ID is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (user) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        ...user,
        role: "USER",
      });
      console.log(res);
      router.push("/auth/login");
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div className="flex">
      <div className="container card">
        <h4 className="mt-4 ml-4">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>First Name</label>
              <input
                placeholder="Kairat"
                name="firstname"
                type="text"
                {...register("firstname")}
                className={`form-control ${
                  errors.firstname ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.firstname?.message}
              </div>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                placeholder="Nurtas"
                name="lastname"
                type="text"
                {...register("lastname")}
                className={`form-control ${
                  errors.lastname ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.lastname?.message}</div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                placeholder="user@mail.com"
                name="email"
                type="email"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                placeholder="********"
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="mt-2 flex flex-column">
              Phone
              <input
                placeholder="+77775355025"
                name="phone"
                type="text"
                {...register("phone")}
                className={`form-control mt-2 ${
                  errors.phone ? "is-invalid" : ""
                }`}
              />
            </div>
            <div className="form-group mt-2">
              <label>Telegram ID</label>
              <input
                placeholder="kairat_nurtas"
                name="telegram"
                type="text"
                {...register("telegram")}
                className={`form-control ${
                  errors.telegram ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.telegram?.message}</div>
            </div>
            <div className="mt-4">
              <button
                disabled={formState.isSubmitting}
                className="btn btn-primary"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Register
              </button>
              <Link href="/" className="btn btn-link">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
