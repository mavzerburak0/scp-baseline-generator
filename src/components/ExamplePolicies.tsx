import React from 'react';

const examplePolicies = {
    PreventCloudtrailDisable: {
        name: 'PreventCloudtrailDisable',
        description: 'This policy will prevent any user from disabling Cloudtrail',
        statements: ['cloudtrail:DeleteTrail', 
        'cloudtrail:PutEventSelectors', 
        'cloudtrail:StopLogging', 
        'cloudtrail:UpdateTrail'],
        effect: 'Deny',
    },
    PreventLeavingOrg: {
        name: 'PreventLeavingOrganization',
        description: 'Prevent member accounts from leaving the organization',
        statements: ['organizations:LeaveOrganization'],
        effect: 'Deny',
    },
    PreventGuardDutyDisable: {
        name: 'PreventGuardDutyDisable',
        description: 'This SCP prevents users or roles in any affected account from disabling GuardDuty or altering its configuration.',
        statements: ['guardduty:AcceptInvitation',
        'guardduty:ArchiveFindings',
        'guardduty:CreateDetector',
        'guardduty:CreateFilter',
        'guardduty:CreateIPSet',
        'guardduty:CreateMembers',
        'guardduty:CreatePublishingDestination',
        'guardduty:CreateSampleFindings',
        'guardduty:CreateThreatIntelSet',
        'guardduty:DeclineInvitations',
        'guardduty:DeleteDetector',
        'guardduty:DeleteFilter',
        'guardduty:DeleteInvitations',
        'guardduty:DeleteIPSet',
        'guardduty:DeleteMembers',
        'guardduty:DeletePublishingDestination',
        'guardduty:DeleteThreatIntelSet',
        'guardduty:DisassociateFromMasterAccount',
        'guardduty:DisassociateMembers',
        'guardduty:InviteMembers',
        'guardduty:StartMonitoringMembers',
        'guardduty:StopMonitoringMembers',
        'guardduty:TagResource',
        'guardduty:UnarchiveFindings',
        'guardduty:UntagResource',
        'guardduty:UpdateDetector',
        'guardduty:UpdateFilter',
        'guardduty:UpdateFindingsFeedback',
        'guardduty:UpdateIPSet',
        'guardduty:UpdatePublishingDestination',
        'guardduty:UpdateThreatIntelSet'],
        effect: 'Deny',
    }

};

export default examplePolicies;