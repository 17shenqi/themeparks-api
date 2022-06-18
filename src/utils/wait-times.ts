export async function countWaitTimes(data, ThemeParks) {
  for (const parkItem of ThemeParks) {
    parkItem.count = 0;
    data
      .filter((_) => parkItem.name === _.park)
      .forEach((item) => {
        const value = item?.value || 0;
        parkItem.count += value;
      });

    data.push({
      name: parkItem.name,
      value: parkItem.count,
      park: parkItem.name,
    });
  }

  return data;
}
