import { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function ContactUs() {
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const [submitted, setSubmitted] = useState(false)

  const initialValues = { firstName: "", lastName: "", email: "", phone: "", message: "" }

  const validationSchema = Yup.object({
    firstName: Yup.string().required(tr.required),
    lastName: Yup.string().required(tr.required),
    email: Yup.string().email(tr.emailInvalid).required(tr.required),
    phone: Yup.string(),
    message: Yup.string().min(10, tr.minMessage).max(500, tr.maxMessage).required(tr.required),
  })

  const onSubmit = (_, { resetForm }) => {
    setSubmitted(true)
    resetForm()
    setTimeout(() => setSubmitted(false), 5000)
  }

  const err = "text-red-500 text-xs font-medium mt-1"

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{tr.contactTitle}</h1>
      <p className="text-slate-500 mb-10">{tr.contactSub}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info cards */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <FaEnvelope className="text-prime-500" />, title: isRtl ? "البريد الإلكتروني" : "Email Us", value: "support@matjar.com" },
            { icon: <FaPhone className="text-prime-500" />, title: isRtl ? "اتصل بنا" : "Call Us", value: "+1 (800) 123-4567" },
            { icon: <FaMapMarkerAlt className="text-prime-500" />, title: isRtl ? "موقعنا" : "Location", value: isRtl ? "القاهرة، مصر" : "Cairo, Egypt" },
          ].map(({ icon, title, value }) => (
            <div key={title} className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-prime-50 rounded-xl flex items-center justify-center shrink-0">{icon}</div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wide">{title}</p>
                <p className="text-sm font-medium text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 form-card">
          {submitted && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium animate-fade-in">
              ✓ {tr.thankYou}
            </div>
          )}

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ submitCount, errors }) => (
              <Form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "firstName", label: tr.firstName, placeholder: isRtl ? "أحمد" : "Ahmed" },
                    { name: "lastName",  label: tr.lastName,  placeholder: isRtl ? "محمد" : "Mohamed" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                      <Field name={name} type="text" placeholder={placeholder}
                        className={`input-field ${submitCount > 0 && errors[name] ? "border-red-300 focus:border-red-400" : ""}`} />
                      {submitCount > 0 && <ErrorMessage name={name} component="div" className={err} />}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{tr.email}</label>
                    <Field name="email" type="email" placeholder={isRtl ? "ahmed@example.com" : "ahmed@example.com"}
                      className={`input-field ${submitCount > 0 && errors.email ? "border-red-300" : ""}`} />
                    {submitCount > 0 && <ErrorMessage name="email" component="div" className={err} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {tr.phone} <span className="text-slate-400 font-normal">{tr.phoneOptional}</span>
                    </label>
                    <Field name="phone" type="text" placeholder="+20 xxx xxx xxxx" className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{tr.message}</label>
                  <Field as="textarea" name="message" rows={5} placeholder={isRtl ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
                    className={`input-field resize-none ${submitCount > 0 && errors.message ? "border-red-300" : ""}`} />
                  {submitCount > 0 && <ErrorMessage name="message" component="div" className={err} />}
                </div>

                <button type="submit" className="btn-primary py-3 w-full sm:w-auto px-10">{tr.sendMessage}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactUs