const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/*.js"];

const doc = {
  info: {
    title: "JualApa API",
    description: "Dokumentasi API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ swagger-output.json berhasil dibuat!");
});
