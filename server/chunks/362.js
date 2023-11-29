"use strict";
exports.id = 362;
exports.ids = [362];
exports.modules = {

/***/ 7229:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6938);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function NewlineText({ text }) {
    const newText = text.split("\n").map((str, index, array)=>index === array.length - 1 ? str : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                str,
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
            ]
        }));
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: newText
    });
}
function Accordion(props) {
    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.expanded || false);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "accordion",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "flex flex-row gap-2 cursor-pointer",
                    onClick: ()=>setExpanded(!expanded),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: props.type === "cliff" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: "\uD83D\uDCC4"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: "\uD83E\uDDD2"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "text-xl font-sans font-semibold",
                            children: props.type === "cliff" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: "Summarized"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: "Explain Like I’m 5"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: expanded ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__/* .CaretUpIcon */ .y8, {
                                className: "w-6 h-6"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_bitcoin_design_bitcoin_icons_react_filled__WEBPACK_IMPORTED_MODULE_1__/* .CaretDownIcon */ .VA, {
                                className: "w-6 h-6"
                            })
                        })
                    ]
                }),
                expanded ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "block pb-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NewlineText, {
                        text: props.content
                    })
                }) : null
            ]
        })
    });
}


/***/ }),

/***/ 6902:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  i: () => (/* binding */ Mdx)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(0);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(336);
;// CONCATENATED MODULE: ./components/callout.tsx


function Callout({ children, icon, type = "default", ...props }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (0,utils.cn)("my-6 flex items-start rounded-md border border-l-4 p-4", {
            "border-red-900 bg-red-50": type === "danger",
            "border-yellow-900 bg-yellow-50": type === "warning"
        }),
        ...props,
        children: [
            icon && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "mr-4 text-2xl",
                children: icon
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: children
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1518);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/mdx-card.tsx



function MdxCard({ href, className, children, disabled, ...props }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (0,utils.cn)("group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg", disabled && "cursor-not-allowed opacity-60", className),
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-col justify-between space-y-4",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground",
                    children: children
                })
            }),
            href && /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: disabled ? "#" : href,
                className: "absolute inset-0",
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "sr-only",
                    children: "View"
                })
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1913);
;// CONCATENATED MODULE: ./components/Accordion.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`C:\Users\auste\workspace\portland-bitdevs-upgrade\components\Accordion.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const Accordion = (__default__);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/ArrowTopRightOnSquareIcon.js
var ArrowTopRightOnSquareIcon = __webpack_require__(7875);
;// CONCATENATED MODULE: ./components/SummaryLink.tsx



function SummaryLink(props) {
    // TODO: Figure out how to prevent this from being housed in a <p> tag when rendered, I want to use more semantic HTML inside this component
    const entry = props.data?.summary.find((item)=>item.title == props.title);
    return /*#__PURE__*/ jsx_runtime_.jsx("span", {
        className: "pt-4 mb-10 block",
        children: !!props.data ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
            className: "flex flex-col gap-2",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    href: props.href,
                    target: "_blank",
                    className: "text-xl font-sans font-semibold no-underline",
                    children: [
                        props.title,
                        /*#__PURE__*/ jsx_runtime_.jsx(ArrowTopRightOnSquareIcon/* default */.Z, {
                            className: "w-6 h-6 inline-block ml-4 relative -top-1"
                        })
                    ]
                }),
                entry ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Accordion, {
                            content: entry?.summary,
                            type: "cliff"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(Accordion, {
                            content: entry?.summaryeli15,
                            type: "eli5"
                        })
                    ]
                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("em", {
                        children: "Summary unavailable"
                    })
                })
            ]
        }, props.title) : null
    });
}

// EXTERNAL MODULE: ./node_modules/next-contentlayer/dist/hooks/useMDXComponent.js
var useMDXComponent = __webpack_require__(2680);
;// CONCATENATED MODULE: ./components/MDX-components.tsx







function Mdx({ code, slug, jsonData, page = false }) {
    const Component = (0,useMDXComponent/* useMDXComponent */.z)(code);
    // TODO: Fix the liberal className?: explicit any usage
    const components = {
        a: ({ className, href, children, "data-no-summary": noSummary, ...props })=>{
            if (noSummary || jsonData === undefined || page) {
                return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: (0,utils.cn)("font-medium underline underline-offset-4", className),
                    href: href,
                    ...props,
                    children: children
                });
            }
            return /*#__PURE__*/ jsx_runtime_.jsx(SummaryLink, {
                href: href,
                title: children,
                slug: slug,
                data: jsonData
            });
        },
        h1: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: (0,utils.cn)("", className),
                ...props
            }),
        h2: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: (0,utils.cn)("my-10", className),
                ...props
            }),
        h3: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: (0,utils.cn)("my-10", className),
                ...props
            }),
        h4: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h4", {
                className: (0,utils.cn)("my-10", className),
                ...props
            }),
        h5: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h5", {
                className: (0,utils.cn)("my-10", className),
                ...props
            }),
        h6: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("h6", {
                className: (0,utils.cn)("my-10", className),
                ...props
            }),
        p: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: (0,utils.cn)("leading-7 [&:not(:first-child)]:my-6", className),
                ...props
            }),
        ul: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("ul", {
                className: (0,utils.cn)("my-6 ml-6 list-disc", className),
                ...props
            }),
        ol: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("ol", {
                className: (0,utils.cn)("my-6 ml-6 list-decimal", className),
                ...props
            }),
        li: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                className: (0,utils.cn)("mt-2", className),
                ...props
            }),
        blockquote: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("blockquote", {
                className: (0,utils.cn)("mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground", className),
                ...props
            }),
        img: ({ className, alt, ...props })=>// eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                className: (0,utils.cn)("rounded-md border", className),
                alt: alt,
                ...props
            }),
        hr: ({ ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "my-4 md:my-8",
                ...props
            }),
        table: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "my-6 w-full overflow-y-auto",
                children: /*#__PURE__*/ jsx_runtime_.jsx("table", {
                    className: (0,utils.cn)("w-full", className),
                    ...props
                })
            }),
        tr: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("tr", {
                className: (0,utils.cn)("m-0 border-t p-0 even:bg-muted", className),
                ...props
            }),
        th: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("th", {
                className: (0,utils.cn)("border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", className),
                ...props
            }),
        td: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("td", {
                className: (0,utils.cn)("border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className),
                ...props
            }),
        pre: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("pre", {
                className: (0,utils.cn)("mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4", className),
                ...props
            }),
        code: ({ className, ...props })=>/*#__PURE__*/ jsx_runtime_.jsx("code", {
                className: (0,utils.cn)("relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm", className),
                ...props
            }),
        // Image, // TODO: Figure out why this messes with the build script
        Callout: Callout,
        Card: MdxCard
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mdx",
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            components: components
        })
    });
}


/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);


const getJsonFile = async (args)=>{
    try {
        const path = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(process.cwd(), "summaries", `${args.fileName}.json`);
        const data = (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(path, "utf-8");
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (err) {
        console.error(err.message);
        return undefined;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getJsonFile);


/***/ }),

/***/ 1523:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  hE: () => (/* reexport */ _index_namespaceObject)
});

// UNUSED EXPORTS: allDocuments, isType

// EXTERNAL MODULE: ./node_modules/contentlayer/dist/client/index.js + 2 modules
var client = __webpack_require__(3517);
;// CONCATENATED MODULE: ./.contentlayer/generated/Doc/_index.json
const _index_namespaceObject = [];
;// CONCATENATED MODULE: ./.contentlayer/generated/index.mjs
// NOTE This file is auto-generated by Contentlayer

// NOTE During development Contentlayer imports from `.mjs` files to improve HMR speeds.
// During (production) builds Contentlayer it imports from `.json` files to improve build performance.


const allDocuments = [
    ..._index_namespaceObject
];


/***/ })

};
;