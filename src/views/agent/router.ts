import {RouterConfig} from '@angular/router';

import {
    AgentLayoutCpt,
    AgentsCpt,
    AgentDetailCpt,
    AgentFormCpt,
    AgentMembersCpt
} from './';

import {AgentMemberFormCpt} from './agent-member-form.cpt';

import {AuthGuide} from '../common/auth-guide';
import {AgentCreateCpt} from './agent-create.cpt';
import {AgentMemberCreateCpt} from './agent-member-create.cpt';

/**
 * 代理 detail 页面子路由
 */
export const agentDetailRouter: RouterConfig = [
    {path: '', component: AgentFormCpt, canActivate: [AuthGuide]},
    {path: 'members', component: AgentMembersCpt, canActivate: [AuthGuide]},
    {path: 'members/create', component: AgentMemberCreateCpt, canActivate: [AuthGuide]},
    {path: 'members/:adminId/update', component: AgentMemberFormCpt, canActivate: [AuthGuide]}
];

/**
 * 代理模块子路由
 */
export const agentsRouter: RouterConfig = [
    {path: '', component: AgentsCpt, canActivate: [AuthGuide], outlet: ''},
    {path: 'create', component: AgentCreateCpt, canActivate: [AuthGuide]},
    {path: ':agencyId', component: AgentDetailCpt, canActivate: [AuthGuide], outlet: '', children: [...agentDetailRouter]}
];

/**
 * 代理模块父级路由
 */
export const agentRouter: RouterConfig = [
    {path: 'agents', component: AgentLayoutCpt, canActivate: [AuthGuide], children: [...agentsRouter]}
];
