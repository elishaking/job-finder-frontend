const proxy = require("http-proxy-middleware");

const p = (app) => {
  app.use(
    "/api",
    proxy({
      target:
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://job-finder-bk.herokuapp.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/positions.json",
    proxy({
      target: "https://jobs.github.com",
      changeOrigin: true,
    })
  );
};

module.exports = p;
