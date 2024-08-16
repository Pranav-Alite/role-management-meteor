import { Meteor } from "meteor/meteor";
import { Roles } from 'meteor/alanning:roles'
import { DeletedUsers } from "../../../lib/collection";
import { ADMIN, EDITOR, VIEWER } from "../../../lib/constants";

Meteor.methods({
    'deleteUser'(userId) {
        check(userId, String)
        const user = Meteor.users.findOne(userId)
        DeletedUsers.insert(user)
        Meteor.users.remove(userId)
    },
    'updateUserRoles'(userId, roles) {
        check(userId, String)
        check(roles, [String])
        
        Roles.removeUsersFromRoles(userId, [ADMIN, EDITOR, VIEWER]);
        Roles.addUsersToRoles(userId, roles);
    }
})