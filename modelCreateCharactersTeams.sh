#!/bin/zsh

node_modules/.bin/sequelize \
\
    model:create            \
    --force                 \
    --name                  \
        charactersteams    \
    --attributes            \
\
"\
characterId:INTEGER,\
teamId:INTEGER\
"