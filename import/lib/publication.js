import { Meteor } from "meteor/meteor";
import {Players} from './collection'

Meteor.publish('allPlayers', () => {
    return Players.find()
})

Meteor.publish('allUsers', () => {
    return Meteor.users.find({}, {
        fields: {
            emails: 1,
            profile: 1,
            roles: 1,
            username: 1
        }
    })
})