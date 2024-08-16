import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles'
import { ADMIN, EDITOR, VIEWER } from '../../../lib/constants';

Template.allRoles.onCreated(function () {
    this.getMyRoles = new ReactiveVar(0)
    this.counter = new ReactiveVar(0)

    const userId = Meteor.userId();
    if (userId) {
        Meteor.call('getRoles', userId, (error, result) => {
            if (!error) {
                this.getMyRoles.set(result);
            }
        });
    }

    this.selectedUserId = new ReactiveVar(Meteor.userId());
});

Template.allRoles.events({
    'change #name'(event, instance) {
        const userId = event.target.value;
        instance.selectedUserId.set(userId);
    },

    'submit .change-user-role-form'(event, instance) {
        event.preventDefault();
        const userId = instance.selectedUserId.get();
        console.log("🚀 ~ userId:", userId)

        if (!userId) return;
        const selectedRoles = [];
        instance.$('input[name="roles"]:checked').each(function () {
            selectedRoles.push(this.value);
        });

        Meteor.call('updateUserRoles', userId, selectedRoles, (error) => {
            if (error) {
                console.error('Error updating roles:', error);
            } else {
                alert('User roles updated successfully.');
            }
        });
    }
});

Template.allRoles.helpers({
    roles() {
        return [ADMIN, EDITOR, VIEWER]
    },
    countUserInRole(role) {
        return Meteor.users.find({ roles: role }).count()
    },

    myRoles() {
        return Meteor.users.findOne(Meteor.userId())
    },
    users() {
        return Meteor.users.find().fetch()
    },
    isSelected(role) {
        return Roles.userIsInRole(Template.instance().selectedUserId.get(), role)
    }
});