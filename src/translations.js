// src/translations.js
// Full bilingual support — English & Arabic — for every page

const t = {
  en: {
    // Navbar
    brandName: "Matjar",
    home: "Home",
    cart: "Cart",
    contact: "Contact",
    login: "Login",
    register: "Register",
    logout: "Logout",
    hi: "Hi",
    searchPlaceholder: "Search products…",

    // Products List
    latestArrivals: "Latest Arrivals",
    showing: "Showing",
    of: "of",
    products: "products",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    sale: "Sale",
    addToCart: "Add to Cart",
    prev: "Previous",
    next: "Next",
    page: "Page",
    noResults: "No products found.",

    // Product Details
    backToProducts: "← Back to products",
    price: "Price",
    reviews: "See all reviews",
    availability: "Availability",
    freeShipping: "Free shipping on orders over $50",
    addToCartPrice: "Add to Cart",

    // Cart
    shoppingCart: "Shopping Cart",
    items: "items",
    item: "item",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Looks like you haven't added anything yet. Start browsing our collection!",
    startShopping: "Start Shopping",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    tax: "Estimated Tax",
    total: "Total",
    checkout: "Proceed to Checkout",

    // Contact
    contactTitle: "Get in Touch",
    contactSub: "We'd love to hear from you. Send us a message and we'll get back shortly.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    phoneOptional: "(Optional)",
    message: "Message",
    sendMessage: "Send Message",
    thankYou: "Thanks! We'll be in touch soon.",

    // Register
    createAccount: "Create Account",
    registerSub: "Join thousands of happy shoppers",
    name: "Full Name",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerBtn: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Log in",

    // Login
    loginTitle: "Welcome Back",
    loginSub: "Enter your credentials to continue shopping",
    loginBtn: "Log In",
    noAccount: "Don't have an account?",
    registerLink: "Sign up",
    invalidCredentials: "Incorrect username or password.",

    // NotFound
    notFoundTitle: "Page Not Found",
    notFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",

    // Validation
    required: "This field is required",
    emailInvalid: "Enter a valid email address",
    noSpaces: "No spaces allowed",
    minPassword: "Password must be at least 8 characters",
    uppercase: "Must contain at least one uppercase letter",
    passwordMatch: "Passwords don't match",
    minMessage: "Message must be at least 10 characters",
    maxMessage: "Message must not exceed 500 characters",
  },

  ar: {
    // Navbar
    brandName: "متجر",
    home: "الرئيسية",
    cart: "السلة",
    contact: "تواصل معنا",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    hi: "أهلاً",
    searchPlaceholder: "ابحث عن منتج…",

    // Products List
    latestArrivals: "أحدث المنتجات",
    showing: "عرض",
    of: "من",
    products: "منتج",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    sale: "خصم",
    addToCart: "أضف للسلة",
    prev: "السابق",
    next: "التالي",
    page: "صفحة",
    noResults: "لا توجد منتجات.",

    // Product Details
    backToProducts: "← العودة للمنتجات",
    price: "السعر",
    reviews: "اقرأ التقييمات",
    availability: "التوفر",
    freeShipping: "شحن مجاني للطلبات فوق 50 دولار",
    addToCartPrice: "أضف للسلة",

    // Cart
    shoppingCart: "سلة المشتريات",
    items: "منتجات",
    item: "منتج",
    emptyCart: "سلتك فارغة",
    emptyCartDesc: "يبدو أنك لم تضف أي منتج بعد. ابدأ التسوق الآن!",
    startShopping: "ابدأ التسوق",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    free: "مجاني",
    tax: "الضريبة التقديرية",
    total: "الإجمالي",
    checkout: "إتمام الشراء",

    // Contact
    contactTitle: "تواصل معنا",
    contactSub: "يسعدنا تلقي رسالتك. سنرد عليك في أقرب وقت.",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    phoneOptional: "(اختياري)",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    thankYou: "شكراً! سنتواصل معك قريباً.",

    // Register
    createAccount: "إنشاء حساب",
    registerSub: "انضم لآلاف المتسوقين السعداء",
    name: "الاسم الكامل",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    registerBtn: "إنشاء الحساب",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    loginLink: "تسجيل الدخول",

    // Login
    loginTitle: "مرحباً بعودتك",
    loginSub: "أدخل بيانات حسابك لمتابعة التسوق",
    loginBtn: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    registerLink: "إنشاء حساب",
    invalidCredentials: "اسم المستخدم أو كلمة المرور غير صحيحة.",

    // NotFound
    notFoundTitle: "الصفحة غير موجودة",
    notFoundDesc: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    backHome: "العودة للرئيسية",

    // Validation
    required: "هذا الحقل مطلوب",
    emailInvalid: "أدخل بريداً إلكترونياً صحيحاً",
    noSpaces: "لا يُسمح بالمسافات",
    minPassword: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    uppercase: "يجب احتواء حرف كبير واحد على الأقل",
    passwordMatch: "كلمتا المرور غير متطابقتان",
    minMessage: "الرسالة يجب أن تكون 10 أحرف على الأقل",
    maxMessage: "الرسالة يجب ألا تتجاوز 500 حرف",
  },
}

export default t
