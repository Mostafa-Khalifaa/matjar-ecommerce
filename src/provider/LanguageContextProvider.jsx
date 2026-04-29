
import { useState } from "react"
import { Languagecontext } from "../context/languageContext"

const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage]= useState("en")

  return(
    <Languagecontext.Provider value={{ language, setLanguage }}>
      {children}
    </Languagecontext.Provider>
  )
}

export default LanguageContextProvider