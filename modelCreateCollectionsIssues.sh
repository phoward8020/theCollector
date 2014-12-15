#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        collectionsissues   \
    --attributes            \
\
"\
collectionId:INTEGER,\
issueId:INTEGER,\
issueRating:INTEGER,\
issueCondition:STRING,\
issueComment:STRING\
"