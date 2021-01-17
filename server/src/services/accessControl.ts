import { Content, Role } from "./enums";

const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
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
    .extend(Role.submitter);

  return ac;
})();
