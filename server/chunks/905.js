"use strict";
exports.id = 905;
exports.ids = [905];
exports.modules = {

/***/ 1191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostPreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var remark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8105);
/* harmony import */ var strip_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(539);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function PostPreview(props) {
    const [stripped, setStripped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Bitcoin ipsum dolor sit amet. Block height address wallet block reward mining nonce transaction.");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        async function stripMarkdown() {
            try {
                const file = await (0,remark__WEBPACK_IMPORTED_MODULE_2__/* .remark */ .j)().use(strip_markdown__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z).process(props.previewText);
                setStripped(String(file));
            } catch (error) {
                console.error(error);
            }
        }
        stripMarkdown();
    }, [
        props.previewText
    ]) // Run the effect whenever `props.previewText` changes
    ;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "flex flex-col gap-1 ",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/" + props.type + "/" + props.id,
                            className: "no-underline",
                            children: props.title
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                        className: "font-sans text-gray-500 text-lg order-first ",
                        children: props.date
                    }),
                    props.author ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "order-last text-xl font-sans ",
                        children: props.author
                    }) : ``
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                children: [
                    stripped,
                    "…"
                ]
            })
        ]
    });
}


/***/ }),

/***/ 3259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1913);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`C:\Users\auste\workspace\portland-bitdevs-upgrade\components\PostPreview.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;