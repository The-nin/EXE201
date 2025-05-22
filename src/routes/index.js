const ROUTES = {
    NOT_FOUND_PAGE: "*",
    LANDING_PAGE: "/",
    ABOUT_US_PAGE: "about-us",
    PRODUCT_PAGE: "product",
    CART_PAGE: "cart",
    ORDER_PAGE: "order",
    PRODUCT_DETAIL_PAGE: "product/:id",
    ORDER_DETAIL_PAGE: "order/:id",
    CONTACT_PAGE: "contact",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    },
}

export default ROUTES