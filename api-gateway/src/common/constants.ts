export enum RabbitMQ {
  UserQueue = 'Users',
  PassengerQueue = 'Passenger',
  FligthsQueue = 'Flight',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}

export enum PassengerMsg {
  CREATE = 'CREATE_PASSENGER',
  FIND_ALL = 'FIND_PASSENGERS',
  FIND_ONE = 'FIND_PASSENGER',
  UPDATE = 'UPDATE_PASSENGER',
  DELETE = 'DELETE_PASSENGER',
}

export enum FlightMsg {
  CREATE = 'CREATE_FLIGTH',
  FIND_ALL = 'FIND_FLIGTHS',
  FIND_ONE = 'FIND_FLIGTH',
  UPDATE = 'UPDATE_FLIGTH',
  DELETE = 'DELETE_FLIGTH',
  ADD_PASSENGER = 'ADD_PASSENGER',
}
