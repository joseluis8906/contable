import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';
import {User} from './User';

const Group = new GraphQLObjectType({
  name: "Group",
  description: "Object representation of Group",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Group) {
          return Group.Id;
        }
      },
      Name: {
        type: GraphQLString,
        resolve(Group) {
          return Group.Name;
        }
      },
      Users: {
        type: new GraphQLList(User),
        resolve(Group) {
          return Group.getUsers();
        }
      }
    };
  }
});

const Groups = {
  type: new GraphQLList(Group),
  args: {
    Id: {type: GraphQLInt},
    Name: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.Group.findAll({where: args});
  }
};

const CreateGroup = {
  type: Group,
  args: {
    Name: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Group.create({
      Name: args.Name
    });
  }
};


const UpdateGroup = {
  type: Group,
  args: {
    Id: {type: GraphQLInt},
    Name: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Group.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Name = args.Name;
      R.save();
      return R;
    });
  }
};


export {
  Group,
  Groups,
  CreateGroup,
  UpdateGroup
}
