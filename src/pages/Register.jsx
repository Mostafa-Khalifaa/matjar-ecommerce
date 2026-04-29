import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../context/AuthContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function Register() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"

  const initialValues = {
    name: "", email: "", username: "", password: "", confirmPassword: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(tr.required),
    email: Yup.string().email(tr.emailInvalid).required(tr.required),
    username: Yup.string().matches(/^\S+$/, tr.noSpaces).required(tr.required),
    password: Yup.string().min(8, tr.minPassword).matches(/[A-Z]/, tr.uppercase).required(tr.required),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], tr.passwordMatch).required(tr.required),
  })

  const onSubmit = (values) => {
    localStorage.setItem("registered_user", JSON.stringify(values))
    setUser(values)
    navigate("/")
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:bg-white transition-colors"
  const errClass = "text-red-500 text-xs mt-1"

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex bg-prime-50">

      {/* LEFT — brand */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[38%] shrink-0 bg-gradient-to-br from-prime-500 to-prime-400"
      >
        <span className="text-white font-bold text-xl tracking-tight">{tr.brandName}</span>
        <div>
          <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
            {isRtl ? "حساب جديد" : "New account"}
          </p>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            {isRtl ? <>ابدأ رحلة<br />التسوق<br />معنا.</> : <>Start your<br />shopping<br />journey.</>}
          </h1>
          <p className="text-white/60 text-sm max-w-xs leading-relaxed">
            {isRtl
              ? "حساب واحد يمنحك الوصول لآلاف المنتجات الرائعة."
              : "One account gives you access to thousands of amazing products."}
          </p>
        </div>
        <p className="text-white/30 text-xs">© 2025 {tr.brandName}</p>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-12 overflow-y-auto">
        <div className="lg:hidden mb-8">
          <span className="font-bold text-lg text-prime-500">{tr.brandName}</span>
        </div>

        <div className="max-w-lg w-full mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{tr.createAccount}</h2>
          <p className="text-gray-500 text-sm mb-8">{tr.registerSub}</p>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ submitCount, errors }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{tr.name}</label>
                    <Field name="name" type="text" placeholder={isRtl ? "أحمد محمد" : "John Doe"}
                      className={`${inputClass} ${submitCount > 0 && errors.name ? "border-red-300" : ""}`} />
                    {submitCount > 0 && <ErrorMessage name="name" component="div" className={errClass} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{tr.username}</label>
                    <Field name="username" type="text" placeholder={isRtl ? "ahmed123" : "johndoe123"}
                      className={`${inputClass} ${submitCount > 0 && errors.username ? "border-red-300" : ""}`} />
                    {submitCount > 0 && <ErrorMessage name="username" component="div" className={errClass} />}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{tr.email}</label>
                  <Field name="email" type="email" placeholder={isRtl ? "ahmed@example.com" : "john@example.com"}
                    className={`${inputClass} ${submitCount > 0 && errors.email ? "border-red-300" : ""}`} />
                  {submitCount > 0 && <ErrorMessage name="email" component="div" className={errClass} />}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{tr.password}</label>
                    <Field name="password" type="password" placeholder="••••••••"
                      className={`${inputClass} ${submitCount > 0 && errors.password ? "border-red-300" : ""}`} />
                    {submitCount > 0 && <ErrorMessage name="password" component="div" className={errClass} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{tr.confirmPassword}</label>
                    <Field name="confirmPassword" type="password" placeholder="••••••••"
                      className={`${inputClass} ${submitCount > 0 && errors.confirmPassword ? "border-red-300" : ""}`} />
                    {submitCount > 0 && <ErrorMessage name="confirmPassword" component="div" className={errClass} />}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-prime-500 text-white font-semibold text-sm mt-2 hover:bg-prime-600 active:opacity-80 transition-opacity"
                >
                  {tr.registerBtn}
                </button>

                <p className="text-gray-500 text-sm text-center pt-1">
                  {tr.alreadyHaveAccount}{" "}
                  <Link to="/login" className="font-semibold text-prime-500 hover:text-prime-600 hover:underline">{tr.loginLink}</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Register