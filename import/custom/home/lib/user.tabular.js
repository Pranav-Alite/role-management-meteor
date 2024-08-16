import { Meteor } from "meteor/meteor";
import { Tabular } from 'meteor/aldeed:tabular'

export const UserTable = new Tabular.Table({
    name: 'UserTable',
    collection: Meteor.users,
    columns: [
        {
            data: 'profile.firstName',
            title: 'First Name',
            className: 'text-center'
        },
        {
            data: 'profile.lastName',
            title: 'Last Name',
            className: 'text-center'
        },
        {
            data: 'profile.phone',
            title: 'Phone Number',
            className: 'text-center'
        },
        {
            data: 'roles',
            title: 'Roles',
            className: 'text-center w-25'
        },
        {
            title: 'Actions',
            className: 'text-center',
            render: function (val, type, doc) {

                const abc = Meteor.users.findOne(doc._id)
                if(abc.username === 'admin'){
                    const disabled = 'disabled'
                    return '<span class="fw-bold">IT\'s ADMIN</span>'
                }
                return `
                <img src="/images/edit.svg" class="edit-user-roles-icon cursor mx-2" data-id="${doc._id}" data-bs-toggle="modal" data-bs-target="#editUserRolesModal" title="Edit Roles"/>
                <img src="/images/delete.svg" class="delete-user-icon cursor mx-2" data-id="${doc._id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal" title="Delete User"/>
                `
            },
            sortable: false,
        }
    ],
    dom: '<"top"fl>rt<"bottom"p><"clear">',
    headerCallback: (thead) => {
        $(thead).find('th').css({
            'background-color': 'lightgrey',
            'font-size': '20px'
        })
    },
    language: {
        search: 'Search User Here',
        searchPlaceholder: "eg. Pranav",
    }
})