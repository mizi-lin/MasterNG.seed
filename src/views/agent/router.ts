import {RouterConfig} from '@angular/router';

import {
    AgentLayoutCpt,
    AgentsCpt,
    AgentDetailCpt,
    AgentFormCpt,
    AgentMembersCpt
} from './';
import {AgentMemberFormCpt} from './agent-member-form.cpt';

/**
 * 代理 detail 页面子路由
 */
export const agentDetailRouter: RouterConfig = [
    {path: '', component: AgentFormCpt},
    {path: 'members', component: AgentMembersCpt},
    {path: 'members/create', component: AgentMemberFormCpt}
];

/**
 * 代理模块自路由
 */
export const agentsRouter: RouterConfig = [
    {path: '', component: AgentsCpt},
    {path: ':agencyId', component: AgentDetailCpt, children: [...agentDetailRouter]}
];

export const agentRouter: RouterConfig = [
    {path: 'agents', component: AgentLayoutCpt, children: [...agentsRouter]}
];

