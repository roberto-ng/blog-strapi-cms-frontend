export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dd78100bf2f6ca66e569930c45476252'),
  },
});
