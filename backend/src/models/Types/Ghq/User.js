import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import {Group} from './Group';

const User = new GraphQLObjectType({
  name: "User",
  description: "Object representation of User",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(User) {
          return User.Id;
        }
      },
      UserName: {
        type: GraphQLString,
        resolve(User) {
          return User.UserName;
        }
      },
      Password: {
        type: GraphQLString,
        resolve(User) {
          return User.Password;
        }
      },
      Active: {
        type: GraphQLString,
        resolve(User) {
          return User.Active;
        }
      },
      Groups: {
        type: new GraphQLList(Group),
        resolve(User) {
          return User.getGroups();
        }
      }
    };
  }
});

const Users = {
  type: new GraphQLList(User),
  args: {
    Id: {type: GraphQLInt},
    UserName: {type: GraphQLString},
    Password: {type: GraphQLString},
    Active: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.User.findAll({where: args});
  }
};


const CreateUser = {
  type: User,
  args: {
    UserName: {type: GraphQLString},
    Password: {type: GraphQLString},
    Active: {type: GraphQLString}
  },
  resolve(_, args) {
    return Db.models.User.create({
      UserName: args.UserName,
      Password: args.Password,
      Active: args.Active
    });
  }
};


const UpdateUser = {
  type: User,
  args: {
    Id: {type: GraphQLInt},
    UserName: {type: GraphQLString},
    Password: {type: GraphQLString},
    Active: {type: GraphQLString}
  },
  resolve(_, args) {
    return Db.models.User.findOne({
      where: {Id: args.Id}
    }).then( R => {
      R.Password = args.Password
      R.Active = args.Active
      R.save()
      return R;
    });
  }
};


const UserAddGroup = {
  type: User,
  args: {
    UserId: {type: GraphQLInt},
    GroupId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.User.findOne({
      where: {Id: args.UserId}
    }).then(U => {
      if (U !== null){
        return Db.models.Group.findOne({
          where: {Id: args.GroupId}
        }).then(G => {
          if (G !== null) {
            return U.addGroup(G).then(R => {
              return U;
            })
          } else {
            return U;
          }
        })
      } else {
        return U;
      }
    });
  }
};


const UserRemoveGroup = {
  type: User,
  args: {
    UserId: {type: GraphQLInt},
    GroupId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.User.findOne({
      where: {Id: args.UserId}
    }).then(U => {
      if (U !== null){
        return Db.models.Group.findOne({
          where: {Id: args.GroupId}
        }).then(G => {
          if (G !== null) {
            U.removeGroup(G)
          }
          return U;
        })
      } else {
        return U;
      }
    });
  }
};


export {
  User,
  Users,
  CreateUser,
  UpdateUser,
  UserAddGroup,
  UserRemoveGroup
}
