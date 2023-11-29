exports.id = 49;
exports.ids = [49];
exports.modules = {

/***/ 7563:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4347));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 194))

/***/ }),

/***/ 2523:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7734, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 8709, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2698, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7833, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 9150, 23))

/***/ }),

/***/ 4347:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5176);
/* __next_internal_client_entry_do_not_use__ ThemeProvider auto */ 


function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_2__/* .ThemeProvider */ .f, {
        ...props,
        children: children
    });
}


/***/ }),

/***/ 194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeSwitcher: () => (/* binding */ ThemeSwitcher)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6938);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5176);
/* __next_internal_client_entry_do_not_use__ ThemeSwitcher auto */ 



const ThemeSwitcher = ()=>{
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_3__/* .useTheme */ .F)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: `w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200`,
        onClick: ()=>setTheme(theme === "dark" ? "light" : "dark"),
        "aria-label": "Toggle Dark Mode",
        children: theme === "dark" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__/* .SunIcon */ .NW, {
            className: "w-6 h-6"
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__/* .MoonIcon */ .kL, {
            className: "w-6 h-6"
        })
    });
};


/***/ }),

/***/ 8767:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app\\layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var target_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(6984);
var target_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(target_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app\\layout.tsx","import":"IBM_Plex_Serif","arguments":[{"weight":["400","600"],"style":["normal","italic"],"subsets":["latin"]}],"variableName":"ibmPlexSerif"}
var target_path_app_layout_tsx_import_IBM_Plex_Serif_arguments_weight_400_600_style_normal_italic_subsets_latin_variableName_ibmPlexSerif_ = __webpack_require__(5591);
var target_path_app_layout_tsx_import_IBM_Plex_Serif_arguments_weight_400_600_style_normal_italic_subsets_latin_variableName_ibmPlexSerif_default = /*#__PURE__*/__webpack_require__.n(target_path_app_layout_tsx_import_IBM_Plex_Serif_arguments_weight_400_600_style_normal_italic_subsets_latin_variableName_ibmPlexSerif_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(2817);
// EXTERNAL MODULE: ./components/Header/Header.css
var Header = __webpack_require__(9336);
// EXTERNAL MODULE: ./components/MeetupName.tsx
var MeetupName = __webpack_require__(9010);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1913);
;// CONCATENATED MODULE: ./components/ThemeSwitcher.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`C:\Users\auste\workspace\portland-bitdevs-upgrade\components\ThemeSwitcher.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["ThemeSwitcher"];

// EXTERNAL MODULE: ./meetup.js
var meetup = __webpack_require__(6040);
;// CONCATENATED MODULE: ./components/Header/Header.tsx





const Header_Header = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: "header w-full p-6 flex flex-row justify-between font-sans sticky top-0 left-0 bg-white z-50 drop-shadow-header dark:drop-shadow-header-dark dark:bg-neutral-900",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: "font-black text-2xl",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    href: "/",
                    className: "no-underline",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(MeetupName/* default */.Z, {})
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                    className: "flex flex-row gap-4 font-semibold items-center",
                    children: [
                        meetup.meetup.mainNav.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    href: item.link,
                                    className: "no-underline",
                                    children: item.text
                                })
                            }, item.text)),
                        /*#__PURE__*/ jsx_runtime_.jsx(e0, {})
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const components_Header_Header = (Header_Header);

;// CONCATENATED MODULE: ./app/theme-provider.tsx

const theme_provider_proxy = (0,module_proxy.createProxy)(String.raw`C:\Users\auste\workspace\portland-bitdevs-upgrade\app\theme-provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: theme_provider_esModule, $$typeof: theme_provider_$$typeof } = theme_provider_proxy;
const theme_provider_default_ = theme_provider_proxy.default;

const theme_provider_e0 = theme_provider_proxy["ThemeProvider"];

// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(336);
;// CONCATENATED MODULE: ./app/layout.tsx








const { city: { name: layout_name, position }, description } = meetup.meetup;
const metadata = {
    title: position === "right" ? `BitDevs ${layout_name} | ${description}` : `${layout_name} BitDevs | ${description}`,
    description
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("head", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image",
                        content: meetup.meetup.image
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image:type",
                        content: "image/jpg"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image:width",
                        content: "1920"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image:height",
                        content: "1080"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image:alt",
                        content: ""
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                className: `${(target_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className + " " + (target_path_app_layout_tsx_import_IBM_Plex_Serif_arguments_weight_400_600_style_normal_italic_subsets_latin_variableName_ibmPlexSerif_default()).className} ${utils/* switchThemeDuration */.Z}`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(theme_provider_e0, {
                    attribute: "class",
                    defaultTheme: "system",
                    enableSystem: true,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components_Header_Header, {}),
                        children
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 9010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ MeetupName)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _meetup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6040);


const { city: { name, position } } = _meetup__WEBPACK_IMPORTED_MODULE_1__.meetup;
function MeetupName() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex flex-col space-y-1",
        children: position === "right" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            children: [
                "BitDevs ",
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "meetup-name",
                    children: name
                })
            ]
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "meetup-name",
                    children: name
                }),
                " BitDevs"
            ]
        })
    });
}


/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ switchThemeDuration),
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* unused harmony export formatDate */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1226);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7702);


// import { env } from "@/env.mjs"
function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .W)(inputs));
}
function formatDate(input) {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}
const switchThemeDuration = "duration-200" // export function absoluteUrl(path: string) {
 //   return `${env.NEXT_PUBLIC_APP_URL}${path}`
 // }
;


/***/ }),

/***/ 6040:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.meetup = void 0;
exports.meetup = {
    city: {
        name: "Portland",
        position: "left"
    },
    description: "BitDevs is a community for those interested in discussing and participating in the research and development of Bitcoin and related protocols",
    colors: {
        primary: {
            hex: "#FFFFFF",
            rgb: "rgb(255, 153, 0)"
        },
        secondary: {
            hex: "#333333",
            rgb: "rgb(51, 51, 51)"
        },
        tertiary: {
            hex: "#FF9900",
            rgb: "rgb(255, 255, 255)"
        }
    },
    mainNav: [
        {
            text: "Home",
            link: "/"
        },
        {
            text: "About",
            link: "/page/about"
        },
        {
            text: "Meetup",
            link: "https://www.meetup.com/BitDevsNYC/"
        }
    ],
    image: "/new-bitdevs-default.jpg",
    ai: [
        {
            name: "Summarized",
            system: 'You create useful summaries of long, technical articles in a "cliff notes" format.',
            promptTemplate: "Summarize the following using no more than 160 words, splitting into paragraphs where appropriate:"
        },
        {
            name: "Explain Like I&rsquo;m Five",
            system: 'You summarize articles in an "explain like I&rsquo;m five" format. Assume that the user may not be familiar with the technical jargon in the original text.',
            promptTemplate: "Summarize the following using a maximum of 60 words:"
        }
    ]
};


/***/ }),

/***/ 3174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3785);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 2817:
/***/ (() => {



/***/ }),

/***/ 9336:
/***/ (() => {



/***/ })

};
;