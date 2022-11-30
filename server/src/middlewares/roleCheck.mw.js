import { findGroupById } from "../modules/group/groupModel";

export const roleCheckMW = async (req, res, next, allowedRoles) => {
  const userId = req.id;
  let { groupId } = req.body;
  if (!groupId) {
    groupId = req.params.id;
  }

  const group = await findGroupById(groupId, userId);

  if (!group) {
    return res.status(400).send({ message: "Group not exist" });
  }

  const { members } = group;

  const member = members.find((user) => allowedRoles.includes(user.role));

  if (!member) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  next();
};
