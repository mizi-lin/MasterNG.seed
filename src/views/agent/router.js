"use strict";
var _1 = require('./');
var agent_member_form_cpt_1 = require('./agent-member-form.cpt');
exports.agentDetailRouter = [
    { path: '', component: _1.AgentFormCpt },
    { path: 'members', component: _1.AgentMembersCpt },
    { path: 'members/create', component: agent_member_form_cpt_1.AgentMemberFormCpt }
];
exports.agentsRouter = [
    { path: '', component: _1.AgentsCpt },
    { path: ':agencyId', component: _1.AgentDetailCpt, children: exports.agentDetailRouter.slice() }
];
exports.agentRouter = [
    { path: 'agents', component: _1.AgentLayoutCpt, children: exports.agentsRouter.slice() }
];
//# sourceMappingURL=router.js.map