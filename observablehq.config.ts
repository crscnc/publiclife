// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "Public Life Dashboard",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {name: "Method", path: "/methods"},
    {name: "Dashboard", path: "/dashboards"},
    {name: "Datasets", path: "/datasets"},
    {name: "Credits", path: "/credits"}
  ],

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "oi", // what to show in the header (HTML)
  footer: "Built", // what to show in the footer (HTML)
  toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
  search: true, // activate search
};
