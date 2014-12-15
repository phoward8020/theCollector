#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        charactersissues    \
    --attributes            \
\
"\
characterId:INTEGER,\
issueId:INTEGER\
"