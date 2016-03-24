# Trigger mupx deploy if current branch is 'prod'
# Used in CIs

#!/bin/bash

echo "On branch '$TRAVIS_BRANCH'."

if [ "$TRAVIS_BRANCH" == "prod" ]; then
  echo "Triggering MupX deployment..."
  mupx deploy
else
  echo "Use 'prod' branch if you want to deploy."
fi
