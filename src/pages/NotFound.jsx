import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Languagecontext } from "../context/languageContext";
import t from "../translations";

function NotFound() {
  const navigate = useNavigate();
  const { language } = useContext(Languagecontext);
  const tr = t[language];
  const isRtl = language === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center animate-fade-in">
      <p className="text-8xl font-bold text-stone-200 select-none mb-2">404</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-3">{tr.notFoundTitle}</h1>
      <p className="text-slate-500 max-w-sm mb-8 text-sm">{tr.notFoundDesc}</p>
      <button onClick={() => navigate("/")} className="btn-primary px-8 py-3">{tr.backHome}</button>
    </div>
  );
}

export default NotFound;
