const checkTitle = (req, res, next) => {
    if (req.body.title) {
      return next();
    } else {
      res.status(400).json({ error: "Title is required" });
    }
  };

const checkDescription = (req, res, next) => {
    if (req.body.description) {
      next();
    } else {
      res.status(400).json({ error: "Description is required" });
    }
  };
  
  module.exports = {  checkTitle, checkDescription };