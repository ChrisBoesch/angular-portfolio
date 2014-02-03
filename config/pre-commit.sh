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

# Discard any changes to built assets (to rebuilt them)
git reset HEAD app/assets/*
git reset HEAD app/fonts/*
git reset HEAD app/js/templates.js

# stash anything else
git stash -q --keep-index

# Rebuild assets
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
