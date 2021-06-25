const Art = require("../Models/artModel");

exports.addArt = async (req, res) => {
  try {
    console.log(req.body);
    var art = await Art.create(req.body);
    console.log(art);
    console.log("art called");
    res.status(200).json({
      status: "success",
      data: {
        art,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
exports.getArts = async (req, res) => {
  var { role, moreData, ...resQueries } = req.query;
  try {
    console.log(req.query)
    //modelled query
    var { role, moreData, sort, ...resQueries } = req.query;
    // 1 filtering
    var queryStr = JSON.stringify(resQueries);
    var query = queryStr.replace(
      /\b(gt|lt|gte|lte|in)\b/g,
      (match) => `$${match}`
    );
    var queryObj = JSON.parse(query);
    //2 sorting
    //pass the query
    var arts = await Art.find(queryObj).sort(sort);
    res.status(200).json({
      status: "success",
      results: arts.length,
      data: {
        arts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
