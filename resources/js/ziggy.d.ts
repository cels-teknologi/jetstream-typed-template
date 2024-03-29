/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "login": [],
    "logout": [],
    "password.request": [],
    "password.reset": [
        {
            "name": "token"
        }
    ],
    "password.email": [],
    "password.update": [],
    "register": [],
    "user-profile-information.update": [],
    "user-password.update": [],
    "password.confirmation": [],
    "password.confirm": [],
    "two-factor.login": [],
    "two-factor.enable": [],
    "two-factor.confirm": [],
    "two-factor.disable": [],
    "two-factor.qr-code": [],
    "two-factor.secret-key": [],
    "two-factor.recovery-codes": [],
    "profile.show": [],
    "other-browser-sessions.destroy": [],
    "current-user-photo.destroy": [],
    "current-user.destroy": [],
    "teams.create": [],
    "teams.store": [],
    "teams.show": [
        {
            "name": "team"
        }
    ],
    "teams.update": [
        {
            "name": "team"
        }
    ],
    "teams.destroy": [
        {
            "name": "team"
        }
    ],
    "current-team.update": [],
    "team-members.store": [
        {
            "name": "team"
        }
    ],
    "team-members.update": [
        {
            "name": "team"
        },
        {
            "name": "user"
        }
    ],
    "team-members.destroy": [
        {
            "name": "team"
        },
        {
            "name": "user"
        }
    ],
    "team-invitations.accept": [
        {
            "name": "invitation"
        }
    ],
    "team-invitations.destroy": [
        {
            "name": "invitation"
        }
    ],
    "sanctum.csrf-cookie": [],
    "ignition.healthCheck": [],
    "ignition.executeSolution": [],
    "ignition.updateConfig": [],
    "dashboard": []
}
}
export {};
