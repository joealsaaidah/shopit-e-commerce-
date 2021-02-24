export const getProducts = (req, res, next) => {
  res.status(200).json({
    success: "true",
    messgage: "This route will fetch all products from the Database",
  });
};
