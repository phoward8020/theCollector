#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        collection          \
    --attributes            \
\
"\
userId:INTEGER,\
collection_type:INTEGER,\
name:STRING\
"