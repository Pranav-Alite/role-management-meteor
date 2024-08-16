import { FlowRouter } from "../../../routes/routes"

Template.register.events({
    'submit .register-form'(event) {
        event.preventDefault()

        if (!$(".register-form").validationEngine("validate")) {
            return false
        }

        const target = event.target

        const firstName = target.firstName.value.trim()
        const lastName = target.lastName.value.trim()
        const email = target.email.value.trim().toLowerCase()
        const phone = target.phone.value.trim()
        const password = target.password.value.trim()
        const confirmPassword = target.confirmPassword.value.trim()

        if (confirmPassword !== password) {
            throw new Meteor.Error('password-mismatch', 'Confirm Password did not match with the Password')
        }

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        }
        Meteor.call('registerUser', userData, (error, result) => {
            if (error) {
                $(".custom-error").css({'padding': '2px 10px'})
                $(".custom-error").text(error.reason)
                throw error
            }
            
            Meteor.loginWithPassword(email, password, (error) => {
                if (error) {
                    $(".custom-error").css({ 'padding': '2px 10px' })
                    $(".custom-error").text(error.reason)
                    throw error
                }
                FlowRouter.go('home')
            })
        })
    }
})