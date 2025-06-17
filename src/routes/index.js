const ROUTES = {
    NOT_FOUND_PAGE: "*",
    LANDING_PAGE: "/",
    ABOUT_US_PAGE: "about-us",
    PRODUCT_PAGE: "product",
    CART_PAGE: "cart",
    ORDER_PAGE: "order",
    PRODUCT_DETAIL_PAGE: "product/product-detail/:id",
    ORDER_DETAIL_PAGE: "order/:id",
    CONTACT_PAGE: "contact",
    CUSTOM_SHIRT_PAGE: "custom-shirt",
    PROFILE_PAGE: "profile",
    ADMIN: {
        LOGIN: "login",
        DASHBOARD: "dashboard",
        ACCOUNT_MNG: "account-management",
        //
        PRODUCT_MNG: "product",
        ADD_PRODUCT: "add-product",
        DETAIL_PRODUCT: "detail/:id",
        //
        CATEGORY_MNG: "category",
        ADD_CATEGORY: "add-category",
        //
        FABRIC_MNG: "fabric",
        ADD_FABRIC: "add-fabric",
        //
        TYPE_PRINT: "type-print",
        ADD_TYPE_PRINT: "add-type-print",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    },
}

export default ROUTES