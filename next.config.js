/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  //output: "export"  // enabling this fails building the static files
};

module.exports = nextConfig;
