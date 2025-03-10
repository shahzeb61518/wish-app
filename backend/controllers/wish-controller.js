const Wish = require('../models/wish-model');

// Create a Wish
exports.addWish = (req, res, next) => {
  const wish = new Wish({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    userName: req.body.userName
  });
  console.log("Wish data>>", wish);
  console.log("req.file>>", req.file);

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    wish.image = url + "/images/" + req.file.filename;
  }

  wish.save().then(createdWish => {
    // console.log(createdWish);
    res.status(201).json({
      message: "Created successfully",
      wish: {
        ...createdWish,
        id: createdWish._id
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Creation failed!"
    })
  });
}

// Get Wish 
exports.getWish = (req, res, next) => {
  Wish.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'Data fetched!!!',
      wishes: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: "Getting data failed!"
    })
  });
}

// // Delete Wish
exports.deleteWish = (req, res, next) => {
  Wish.deleteOne({ _id: req.body.id }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not deleted!" });
      }
    }
  ).catch(error => {
    res.status(500).json({
      message: "Deletion failed!"
    })
  });
}
