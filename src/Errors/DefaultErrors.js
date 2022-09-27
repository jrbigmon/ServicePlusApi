module.exports = {
  ExistsInDatase: {
    error: true,
    message: 'Exists in database already!',
    status: 409
  },

  NotExistsInDatase: {
    error: true,
    message: 'Not Exists in database already!',
    status: 404
  },

  DatabaseOut: {
    error: true,
    message: 'The system is out now!',
    status: 500
  },

  BadRequestByUser: {
    error: true,
    message: 'Bad request! Please try again.',
    status: 400
  },

  EmptyFields: {
    error: true,
    message: 'Has empty fields! Please try again.',
    status: 400
  },

  UserNotValidated: {
    error: true,
    message: 'User is not valid! Please try again.',
    status: 401
  },

  VerifyToken: {
    error: true,
    message: 'Error in verify Token! Please try again.',
    status: 403
  }

}
