module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9dde1ba7c8270d8c035b507c913fc183'),
  },
});
