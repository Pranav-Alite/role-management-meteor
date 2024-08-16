import { Accounts } from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles'

Meteor.startup(function () {
    if (!Roles.getAllRoles().fetch().length) {
        Roles.createRole('ADMIN');
        Roles.createRole('EDITOR');
        Roles.createRole('VIEWER');
    }

    // Roles.addRolesToParent('EDITOR', 'ADMIN')
    // Roles.addRolesToParent('VIEWER', 'EDITOR')

    if (Meteor.users.find().count() == 0) {
        const adminId = Accounts.createUser({
            username: 'admin',
            email: 'admin@yopmail.com',
            password: 'admin123',
            profile : {
                firstName : 'Admin',
                lastName : 'Demo',
                phone : '7777777777'
            }
        });
        console.log("🚀 ~ adminId:", adminId)
        
        if(!Roles.userIsInRole(adminId, ['ADMIN'])){
            Roles.addUsersToRoles(adminId, ['ADMIN'])
        }

        const roles = Roles.getRolesForUser(adminId)
        console.log("🚀 ~ roles:", roles)
    }
});