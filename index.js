import { normalize, schema } from 'normalizr';

const data = {
    "id": 321683837308371114n,
    "author": {
        "id": 321683837308371115n,
        "name": "Paul"
    },
    "title": "My awesome blog post",
    "comments": [
        {
            "id": 321683837308371116n,
            "commenter": {
                "id": 321683837308371117n,
                "name": "Nicole"
            }
        },
        {
            "id": 321683837308371118n,
            "commenter": {
                "id": 321683837308371119n,
                "name": "Nicole"
            }
        },
        {
            "id": 321683837308371120n,
            "commenter": {
                "id": 321683837308371121n,
                "name": "Nicole"
            }
        }
    ]
};

let toObject = d => {
    return JSON.parse(JSON.stringify(d, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
};

let datax = toObject(data);

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});

// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

const normalizedData = normalize(datax, article);

console.log(JSON.stringify(normalizedData));

