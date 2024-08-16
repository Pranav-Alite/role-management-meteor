import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Roles } from 'meteor/alanning:roles'
import { VIEWER } from "../../../lib/constants";

Meteor.methods({
    'registerUser'(userData) {
        try {
            check(userData, {
                firstName: String,
                lastName: String,
                email: String,
                phone: String,
                password: String
            })

            const findUser = Accounts.findUserByEmail(userData.email)
            if (findUser) {
                throw new Meteor.Error('email-exist', 'Email is already in use')
            }

            const newUser = Accounts.createUser({
                email: userData.email,
                password: userData.password,
                profile: {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone
                }
            })

            if (!newUser) {
                throw new Meteor.Error('user-not-created', 'Due to some Internal Error User is not Created')
            }

            Roles.addUsersToRoles(newUser, VIEWER)
            return newUser
        } catch (error) {
            throw error
        }
    }
})