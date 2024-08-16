import { Template } from "meteor/templating"
import { Meteor } from "meteor/meteor"
import { FlowRouter } from "../routes/routes"
import { ADMIN } from "../lib/constants"
import { Roles } from 'meteor/alanning:roles'

Template.mainLayout.helpers({
    isAdmin() {
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
            return true
        }
        return ''
    },
})

Template.mainLayout.events({
    'click .login-btn'(event) {
        FlowRouter.go('login')
    },
    'click .register-btn'(event) {
        FlowRouter.go('register')
    },
    'click .logout-btn'(event) {
        Meteor.logout()
        FlowRouter.go('login')
    }
})