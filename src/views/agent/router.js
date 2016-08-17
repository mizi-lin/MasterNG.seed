"use strict";
var _1 = require('./');
var agent_member_form_cpt_1 = require('./agent-member-form.cpt');
var auth_guide_1 = require('../common/auth-guide');
var agent_create_cpt_1 = require('./agent-create.cpt');
exports.agentDetailRouter = [
    { path: '', component: _1.AgentFormCpt, canActivate: [auth_guide_1.AuthGuide] },
    { path: 'members', component: _1.AgentMembersCpt, canActivate: [auth_guide_1.AuthGuide] },
    { path: 'members/create', component: agent_member_form_cpt_1.AgentMemberFormCpt, canActivate: [auth_guide_1.AuthGuide] }
];
exports.agentsRouter = [
    { path: '', component: _1.AgentsCpt, canActivate: [auth_guide_1.AuthGuide], outlet: '' },
    { path: 'create', component: agent_create_cpt_1.AgentCreateCpt, canActivate: [auth_guide_1.AuthGuide] },
    { path: ':agencyId', component: _1.AgentDetailCpt, canActivate: [auth_guide_1.AuthGuide], outlet: '', children: exports.agentDetailRouter.slice() }
];
exports.agentRouter = [
    { path: 'agents', component: _1.AgentLayoutCpt, canActivate: [auth_guide_1.AuthGuide], children: exports.agentsRouter.slice() }
];
//# sourceMappingURL=router.js.map