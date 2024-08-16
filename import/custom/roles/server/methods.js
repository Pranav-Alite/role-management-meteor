import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { ADMIN, EDITOR, VIEWER } from "../../../lib/constants";

Meteor.methods({
    'isAdmin'(userId) {
        check(userId, String)
        // console.log(`Roles of ${userId} - ${Roles.getRolesForUser(this.userId)}`);
        return Roles.userIsInRole(userId, 'ADMIN')
    },
    'getRoles'(userId) {
        check(userId, String)
        return Roles.getRolesForUser(this.userId)
    },
    'getCount'(role) {
        check(role, String)
        // console.log("🚀 ~ Roles.getUsersInRole(role).count():", Roles.getUsersInRole(role).count())
        return Roles.getUsersInRole(role).count()
    }
})