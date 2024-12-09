const Route = require("../models/route_model").Route;
const { DraftModel } = require("../models/draftModel");

const post_add_route = async (req, res, next) => {
  try {
    let body = req.body;
    let response = await Route.create(body);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_add_stops_existing_route = async (req, res, next) => {
  try {
    let body = req.body;
    let id = req.params.id;
    let route = await Route.findById(id);
    if (route) {
      // adding the stop here

      let response = await route.updateOne({ $push: { list_of_stops: body } });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ id: "invaild" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

const find_route_with_id = async (req, res, next) => {
  try {
    let id = req.params.id;
    let obj = await Route.findById(id);
    if (obj) {
      return res.status(200).json(obj);
    } else {
      return res.status(400).json({ id: "invaild" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_list_route = async (req, res, next) => {
  try {
    let body = req?.body;
    let list = await Route.find(body);
    if (list) {
      return res.status(200).json(list);
    } else {
      return res.status(200).json([]);
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

const get_route_list_search_list = async (req, res, next) => {
  try {
    let date1 = new Date();
    let draft_of_route_search_list_array = await DraftModel.find({
      key: "route_search_list",
    });

    if (draft_of_route_search_list_array?.length !== 1) {
      return res.status(400).json("Draft is missing");
    }

    let draft_of_route_search_list = draft_of_route_search_list_array[0];

    let different =
      (date1 - new Date(draft_of_route_search_list?.expire)) / 1000;

    if (different < 100) {
      console.log("Fetch Draft");
      let date2 = new Date();
      return res.status(200).json({
        route_list: JSON.parse(draft_of_route_search_list?.data),
        responseTime: date2 - date1,
        fetch: "Fetch Draft",
      });
    } else {
      console.log("Fetch Fresh");
      let route_list = await Route.find().select("route_number _id");
      let date2 = new Date();
      draft_of_route_search_list.expire = new Date();
      draft_of_route_search_list.data = JSON.stringify(route_list);
      await draft_of_route_search_list.save();
      return res.status(200).json({
        route_list,
        responseTime: date2 - date1,
        fetch: "Fetch Fresh",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_add_route: post_add_route,
  find_route_with_id: find_route_with_id,
  post_add_stops_existing_route: post_add_stops_existing_route,
  post_list_route: post_list_route,

  get_route_list_search_list: get_route_list_search_list,
};
