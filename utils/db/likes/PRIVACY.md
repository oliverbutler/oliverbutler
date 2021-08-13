# Privacy Policy

This is a primitive tracking system, simply designed to stop anybody from easily creating more likes on a post than they should be able to.

## Information that we store

- An IP hash
  - Generated from your public ip address, salted with a secret key (to reduce the likelihood of a rainbow table attack)
- A browser identifier
  - this helps us avoid users fraudulently adding more likes than they are supposed to

## Data Structure

### Blogs

```json
[
  "_id": "0001",
  "slug": "some-post-here",
  "likesByUsers": {
    "user-01": 2,
    "user-02": 4,
    "user-03": 9
  }
]
```

<!-- ### Users

```json
[
  "_id": "user-01",
  "ipHash": "some-unique-hash-12931832",
  "browserIds": {
    "abc123": 2,
    "bas213": 4,
    "baq214": 9
  },
  "_id": "user-02",
  "ipHash": "some-unique-hash-12931832",
  "browserIds": {
    "abc123": 2,
    "bas213": 4,
    "baq214": 9
  },
  "_id": "user-03",
  "ipHash": "some-unique-hash-12931832",
  "browserIds": {
    "abc123": 2,
    "bas213": 4,
    "baq214": 9
  }
]
``` -->
