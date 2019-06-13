# Post

#### Signature

```
PK: member_id
SK: post#type#id
...
```

#### Access Patterns

| access                | PK        | SK                     |
| --------------------- | --------- | ---------------------- |
| getMembersPrivateOrg  | member_id | post#type#id           |
| getMembersPrivateOrgs | member_id | begins_with(post#type) |
