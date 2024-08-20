import { FlowRouter } from "../../../routes/routes"

Template.login.events({
    'submit .login-form'(event) {
        event.preventDefault()

        if (!$(".login-form").validationEngine("validate")) {
            return false
        }

        const target = event.target
        const email = target.email.value.trim().toLowerCase()
        const password = target.password.value.trim()

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                $(".custom-error").css({ 'padding': '2px 10px' })
                $(".custom-error").text(error.reason)
                throw error
            }
            FlowRouter.go('home')
        })
    }
})

Template.login.helpers({
    hello() {
        return 'hello'
    }
})