import ThemeparksApi from './'


async function main() {
  const a = await ThemeparksApi.cadp.getWaitTimes()
  console.log(a)
}
main()