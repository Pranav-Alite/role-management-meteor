import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', { main: 'home' })
    }
})

FlowRouter.route('/user/login', {
    name: 'login',
    action() {
        import('../../public/css/login.register.css').then(
            BlazeLayout.render('mainLayout', { main: 'login' })
        )
    }
})
FlowRouter.route('/user/register', {
    name: 'register',
    action() {
        import('../../public/css/login.register.css').then(
            BlazeLayout.render('mainLayout', { main: 'register' })
        )
    }
})

FlowRouter.route('/admin/roles', {
    name: 'roles',
    action() {
        import('../../public/css/roles.css').then(
            BlazeLayout.render('mainLayout', { main: 'allRoles' })
        )
    }
})

FlowRouter.route('*', {
    name: 'notFound',
    action() {
        BlazeLayout.render('notFound')
    }
})

export { FlowRouter }