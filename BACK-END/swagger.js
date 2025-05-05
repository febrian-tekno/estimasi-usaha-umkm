const swaggerAutogen = require('swagger-autogen')();
const outputFile = './BACK-END/swagger-output.json';
const endpointsFiles = ['./BACK-END/server.js', './BACK-END/routes/*.js'];

const doc = {
  info: {
    title: 'Estimasi UMKM API',
    description: 'Dokumentasi API',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ swagger-output.json berhasil dibuat!');
});
