#!/usr/bin/env bash
# 
# Pre commit hook
# 
# place it into .git/hook/pre-commit:
# 
# 	ln -s ../../config/pre-commit.sh .git/hooks/pre-commit
# 	

echo "Updating assets and running tests before commiting changes..."
echo "----"

# stash uncommitted changes
git stash -q --keep-index

# make sure to commit up to built assets
grunt build
git add app/assets/*
git add app/fonts/*
git add app/js/templates.js

# run test
grunt test:shell
RESULT=$?

# return stashed changes
git stash pop -q

# cancel commit if tests failed
[ $RESULT -ne 0 ] && echo "tests failed; commit cancelled." && exit 1

echo "tests successfully; committing changes."
exit 0
