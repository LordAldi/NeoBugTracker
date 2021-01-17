import { Content, Role } from "./enums";

const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant(Role.none)
  //submitter
  .grant(Role.submitter)
  .extend(Role.none)
  .createOwn(Content.ticket)
  .updateOwn(Content.ticket)
  .deleteOwn(Content.ticket)
  .readAny(Content.ticket)
  .readOwn(Content.project)
  .readOwn(Content.profile)
  .updateOwn(Content.profile)
  //developer
  .grant(Role.developer)
  .extend(Role.submitter)
  //Project Manager
  .grant(Role.projectManager)
  .extend(Role.developer)
  .createOwn(Content.project)
  .updateOwn(Content.project)
  //admin
  .grant(Role.admin)
  .extend(Role.projectManager)
  .readAny(Content.project)
  .updateAny(Content.project);

export { ac };
