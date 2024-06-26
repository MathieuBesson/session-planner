import AuthController from '#controllers/http/auth_controller'
import HallController from '#controllers/http/hall_controller'
import SessionTypeController from '#controllers/http/session_type_contrller'
import SessionsController from '#controllers/http/sessions_controller'
import UsersController from '#controllers/http/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
    // sessions
    router.get('sessions', [SessionsController, 'getAll'])
    router.get('sessions/:session_id', [SessionsController, 'getOne'])
    router.get('sessions/:session_id/users', [SessionsController, 'getSessionUser'])
    router.post('sessions/:session_id/users/:user_id', [SessionsController, 'addUserToSession'])
    router.delete('sessions/:session_id/users/:user_id', [SessionsController, 'removeUserFromSession'])
    router.delete('sessions/:session_id', [SessionsController, 'deleteSoft'])
    router.post('sessions/', [SessionsController, 'create'])
    router.put('sessions/:session_id', [SessionsController, 'update'])

    // users
    router.get('users/check-token', [AuthController, 'checkToken'])
    router.get('users', [UsersController, 'getAll'])
    router.get('users/:user_id', [UsersController, 'getOne'])
    router.put('users/:user_id', [UsersController, 'patchOne'])
    
    // halls
    router.get('halls', [HallController, 'getAll'])
    // session_types
    router.get('session-types', [SessionTypeController, 'getAll'])
}).use(middleware.auth({ guards: ['api'] }))

// users
router.post('users/register', [AuthController, 'register'])
router.post('users/login', [AuthController, 'login'])
