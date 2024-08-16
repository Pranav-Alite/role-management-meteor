import { Meteor } from "meteor/meteor";
import { Players } from "../../../lib/collection";
import { Template } from "meteor/templating";
import { UserTable } from "../lib/user.tabular";
import { ADMIN, EDITOR, VIEWER } from '../../../lib/constants'
import { Roles } from 'meteor/alanning:roles'
import { Session } from "meteor/session";


Template.home.onRendered(function () {

    Session.set('selectedUserId', Meteor.userId())
    Meteor.subscribe('allUsers')
    this.autorun(() => {
        const playerSubscription = this.subscribe('allPlayers');

        if (playerSubscription.ready()) {
            this.$('.loader').hide()
            Meteor.defer(() => {
                this.$('.owl-carousel').owlCarousel({
                    loop: true,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    slideTransition: 'linear',
                    margin: 3,
                    responsive: {
                        0: {
                            items: 2
                        },
                        600: {
                            items: 3
                        },
                        1000: {
                            items: 4
                        },
                        1200: {
                            items: 5
                        }
                    }
                });
            });
        }
    });
});

Template.home.helpers({
    players() {
        return Players.find().fetch()
    },
    userListTable() {
        return UserTable
    },
    isAdmin() {
        if (Roles.userIsInRole(Meteor.userId(), ADMIN)) {
            return true
        }
        return ''
    },
    roles() {
        return [ADMIN, EDITOR, VIEWER]
    },
    isSelected(role) {
        const selectedId = Session.get('selectedUserId')

        if (Roles.userIsInRole(selectedId, role)) {
            return true
        }
        return false
    }
})

Template.home.events({
    'click .edit-user-roles-icon'(event) {
        const userId = event.target.getAttribute('data-id')
        Session.set('selectedUserId', userId)
        $('.edit-user-role-form-btn').attr('data-id', userId)
    },
    'click .delete-user-icon'(event) {
        const userId = event.target.getAttribute('data-id')
        $('.delete-user-btn').attr('data-id', userId)
    },
    'click .delete-user-btn'(event) {
        console.log('clicked');
        const userId = event.target.getAttribute('data-id')

        Meteor.call('deleteUser', userId, (error, result) => {
            if (error) {
                throw error
            }
            $('#deleteUserModal').modal('hide')
        })
    },
    'submit .edit-user-role-form'(event) {
        event.preventDefault()
        const selectedRoles = [];
        const userId = event.target.submitBtn.getAttribute('data-id')

        $(event.target).find('input[name="roles"]:checked').each(function () {
            selectedRoles.push($(this).val());
        });

        if (selectedRoles.length < 1) {
            $(".custom-error").css({ 'padding': '2px 10px' })
            $(".custom-error").text('Atleast One Role should be Assigned')
            throw new Meteor.Error('one-role-required', 'Atleast One Role should be Assigned')
        }

        Meteor.call('updateUserRoles', userId, selectedRoles, (error, result) => {
            if (error) {
                $(".custom-error").css({ 'padding': '2px 10px' })
                $(".custom-error").text(error.reason)
                throw error
            }
            $('#editUserRolesModal').modal('hide')
        })
    }
})