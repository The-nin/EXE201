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
    CUSTOM_SHIRT_PAGE: "custom-shirt",
    ADMIN: {
        LOGIN: "login",
        DASHBOARD: "dashboard",
        ACCOUNT_MNG: "account-management",
        //
        PRODUCT_MNG: "product",
        ADD_PRODUCT: "add-product",
        //
        CATEGORY_MNG: "category",
        ADD_CATEGORY: "add-category",
        //
        FABRIC_MNG: "fabric",
        ADD_FABRIC: "add-fabric",
        //
        BOOKORDER: "bookOrder",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    },
}

export default ROUTES