import {Routes} from '@angular/router';

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
export const $$ROUTES_AGENT_DETAIL: Routes = [
    {path: '', component: AgentFormCpt, canActivate: [AuthGuide]},
    {path: 'members', component: AgentMembersCpt, canActivate: [AuthGuide]},
    {path: 'members/create', component: AgentMemberCreateCpt, canActivate: [AuthGuide]},
    {path: 'members/:adminId/update', component: AgentMemberFormCpt, canActivate: [AuthGuide]}
];

/**
 * 代理模块子路由
 */
export const $$ROUTES_AGENTS: Routes = [
    {path: '', component: AgentsCpt, canActivate: [AuthGuide], outlet: ''},
    {path: 'create', component: AgentCreateCpt, canActivate: [AuthGuide]},
    {path: ':agencyId', component: AgentDetailCpt, canActivate: [AuthGuide], outlet: '', children: [...$$ROUTES_AGENT_DETAIL]}
];

/**
 * 代理模块父级路由
 */
export const $$ROUTE_AGENT: Routes = [
    {path: 'agents', component: AgentLayoutCpt, canActivate: [AuthGuide], children: [...$$ROUTES_AGENTS]}
];
