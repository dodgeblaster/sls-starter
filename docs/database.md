# Post

#### Signature

```
PK: user_id
SK: post#type#id
...
```

#### Access Patterns

| access            | PK      | SK                     |
| ----------------- | ------- | ---------------------- |
| getPost           | user_id | post#type#id           |
| getAllPostsByType | user_id | begins_with(post#type) |
