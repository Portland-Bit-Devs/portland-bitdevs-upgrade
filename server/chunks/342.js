"use strict";
exports.id = 342;
exports.ids = [342];
exports.modules = {

/***/ 7342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mH: () => (/* binding */ getSortedMarkdownContent),
/* harmony export */   mO: () => (/* binding */ getPageContentFromMarkdown),
/* harmony export */   zc: () => (/* binding */ ContentType)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6499);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);



var ContentType;
(function(ContentType) {
    ContentType["Posts"] = "posts";
    ContentType["Events"] = "events";
})(ContentType || (ContentType = {}));
function getSortedMarkdownContent(contentType) {
    const contentDirectory = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), `/content/${contentType}`);
    // Get file names under /posts
    const fileNames = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(contentDirectory);
    const allMarkdownData = fileNames.map((fileName)=>{
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");
        // Read markdown file as string
        const fullPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(contentDirectory, fileName);
        const fileContents = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(fullPath, "utf8");
        // Use gray-matter to parse the post metadata section
        const matterResult = gray_matter__WEBPACK_IMPORTED_MODULE_1___default()(fileContents);
        // Combine the data with the id
        const markdownData = {
            id,
            title: "Example Title",
            date: "2009-01-03 00:00:00",
            preview: matterResult.content.replace(/<[^>]*>/g, "").slice(0, 200),
            ...matterResult.data
        };
        return markdownData;
    });
    // Sort posts by date
    const returnValue = allMarkdownData.filter((data)=>data.id !== ".gitkeep").sort((a, b)=>{
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
    return returnValue;
}
function getPageContentFromMarkdown() {
    const contentDirectory = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), "/content/pages");
    // Get the file names under /pages
    const fileNames = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(contentDirectory);
    const allPagesData = fileNames.map((fileName)=>{
        const id = fileName.replace(/\.md$/, "");
        // Read markdown file as string
        const fullPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(contentDirectory, fileName);
        const fileContents = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(fullPath, "utf8");
        // Use gray-matter to parse the page metadata section
        const matterResult = gray_matter__WEBPACK_IMPORTED_MODULE_1___default()(fileContents);
        // Combine the data with the id
        const pageData = {
            id,
            title: "Example Page Title",
            ...matterResult.data
        };
        return pageData;
    });
    const returnValue = allPagesData.filter((data)=>data.id !== ".gitkeep").sort((a, b)=>{
        if (a.id < b.id) {
            return 1;
        } else {
            return -1;
        }
    });
    return returnValue;
}


/***/ })

};
;