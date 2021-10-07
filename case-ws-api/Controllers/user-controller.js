/** @format */

import bcrypt from "bcrypt";
import session from "express-session";

import { userModel } from "../Models/user-model";

import { clientAddress } from "../utils/address";

export const get_user = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await userModel.findById(id).exec();
    return res.json({
      message: "find user success",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.json({
      message: "find user fail" + err,
      success: false,
      data: null,
    });
  }
};

export const get_all_users = async (req, res) => {
  try {
    let allUsers = await userModel.find().exec();
    return res.json({
      message: "find all users success",
      success: true,
      data: allUsers,
    });
  } catch (err) {
    return res.json({
      message: "find all users fail",
      success: false,
      data: null,
    });
  }
};

export const create_user = async (req, res) => {
  try {
    if (
      await userModel.findOne({
        name: req.body.name,
      })
    ) {
      let workingName = req.body.name + Math.floor(Math.random() * 100);
      req.session.message = {
        msg: true,
        type: "Fail",
        message: "username exists alrdy! we suggest: " + workingName,
      };
      res.redirect("/");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = await new userModel({
      name: req.body.name,
      password: hashedPassword,
      avatar: req.body.avatar,
      theme: req.body.theme,
    });

    user.save((error, newuser) => {
      if (error) {
        console.log(error);
      }
      req.session.regenerate((error) => {
        req.session.user = user;
        return res.redirect(clientAddress + "/dashboard/" + user._id);
      });
    });

    // return res.json({
    //   message: "create user success",
    //   USER: user,
    //   success: true,
    //   data: null,
    // });
  } catch (err) {
    return res.json({
      message: "create user fail " + err,
      success: false,
      data: null,
    });
  }
};

export const update_user = async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndUpdate(id, {
      name: req.body.name,
      password: req.body.password,
      avatar: req.body.avatar,
      theme: req.body.theme,
    });
    return res.json({
      message: "update user success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "update user failed",
      success: false,
      data: null,
    });
  }
};

export const delete_user = async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete({ _id: id }).exec();
    return res.json({
      message: "delete user success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "delete user fail",
      success: false,
      data: null,
    });
  }
};

export const delete_all_users = (req, res) => {
  userModel.deleteMany({}).exec();
  res.redirect(clientAddress);
};

export const user_login = async (req, res) => {
  console.log(req.body, "changeAva");
  try {
    const user = await userModel.findOne({
      name: req.body.name,
    });
    if (!user) {
      req.session.message = {
        msg: true,
        type: "Fail",
        message: "Cant find user: " + req.body.name,
      };
      console.log("no user");
      return res.redirect(clientAddress);
    }

    // json web token
    // authzero PRIO

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (correctPassword) {
      await userModel.findByIdAndUpdate(user._id, {
        avatar:
          parseInt(req.body.avatarChange) === 1 || parseInt(user.avatar) === 0
            ? req.body.avatar
            : user.avatar,
        theme:
          parseInt(req.body.themeChange) === 1 || parseInt(user.theme) === 0
            ? req.body.theme
            : user.theme,
      });
      req.session.regenerate((error) => {
        req.session.user = user;
        return res.redirect(clientAddress + "/dashboard/" + user._id);
      });
      console.log("correct password");
    } else {
      req.session.message = {
        msg: true,
        type: "Fail",
        message: "Wrong password",
      };
      console.log("wrong password");
      res.redirect(clientAddress);
    }

    // return res.json({
    //   message: "login user success",
    //   success: true,
    //   data: null,
    // });
  } catch (err) {
    return res.json({
      message: "login user fail" + err,
      success: false,
      data: null,
    });
  }
};

export const user_logout = async (req, res) => {
  // try {
  req.session.destroy((error) => {
    res.redirect(clientAddress);
    console.log("destroyed");
  });
  // } catch (err) {
  //   return res.json({
  //     message: "login user fail" + err,
  //     success: false,
  //     data: null,
  //   });
  // }
};

export const user_join_chatroom = async (req, res) => {
  try {
    return res.json({
      message: "login user success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "login user fail",
      success: false,
      data: null,
    });
  }
};

// not used
export const user_dashboard = async (req, res) => {
  const id = req.params.id;
  try {
    // const user = await userModel.findById({ _id: id });
    return res.redirect("localhost:3000/dashboard/" + user.id);

    // res.render("PageDashboard", {
    //   user: user,
    // });

    return res.json({
      message: "login user success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "login user fail",
      success: false,
      data: null,
    });
  }
};
