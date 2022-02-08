set -ex
developDir=$PWD
rm *.tgz
rm -r ~/.cache/yarn/*/npm-svelte-photoswipe-*
npm pack

cd $(mktemp --directory)
npm init -- vite --template svelte-ts svelte-photoswipe-test
cd svelte-photoswipe-test

packFile=$(echo "$developDir"/svelte-photoswipe-*.*.*.tgz)
yarn add -D "file://$packFile"
cp $developDir/usage.svelte src/App.svelte
yarn run check
yarn run build
yarn run preview --open &
yarn dev --open
