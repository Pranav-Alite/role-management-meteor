import { Mongo } from "meteor/mongo";

export const Players = new Mongo.Collection('players')
export const DeletedUsers = new Mongo.Collection('deletedUsers')