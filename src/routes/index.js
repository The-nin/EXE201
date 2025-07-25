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
    ORDER_COMPLETE: "order-complete",
    ORDER_HISTORY_PAGE: "order-history",
    BOOKORDER_HISTORY: "history-bookorder",
    BOOKORDER_DETAIL_PAGE: "history-bookorder/:id",
    SUCCESS_PAGE: "success",
    ADMIN: {
        LOGIN: "login",
        DASHBOARD: "admin",
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
        BOOKORDER: "bookOrder",
        //
        TYPE_PRINT_MNG: "type-print",
        ADD_TYPE_PRINT: "add-type-print",
        //
        ORDER: "order",
        DESIGNER: "designer",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    },
}

export default ROUTES