import GraphQLDate from "graphql-date";
import { Group, Message, User } from "./connectors";

// connectori su orm mapiranja, a resolveri su orm upiti mapiranja na graphql
// Group, Message, User sequelize modeli tabele

export const resolvers = {
  Date: GraphQLDate,
  // Query tip iz graphql scheme na dnu, jasno
  Query: {
    group(_, args) {
      return Group.find({ where: args });
    },
    messages(_, args) {
      return Message.findAll({
        where: args,
        order: [["createdAt", "DESC"]]
      });
    },
    user(_, args) {
      return User.findOne({ where: args });
    }
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
    messages(group) {
      return Message.findAll({
        where: { groupId: group.id },
        order: [["createdAt", "DESC"]]
      });
    }
  },
  Message: {
    to(message) {
      return message.getGroup();
    },
    from(message) {
      return message.getUser();
    }
  },
  User: {
    messages(user) {
      return Message.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]]
      });
    },
    groups(user) {
      return user.getGroups();
    },
    friends(user) {
      return user.getFriends();
    }
  }
};

export default resolvers;
