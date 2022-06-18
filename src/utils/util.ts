export function lineToObject(arg) {
  const obj = {};
  const arr = arg.split(';');

  for (let item of arr) {
    item = item.split('=');
    if (item.length === 1) {
      obj['__id__'] = item[0];
    } else {
      obj[item[0]] = item[1];
    }
  }
  return obj;
}

export function strToCam(str) {
  const arr = str.replace(/ /gim, '').split('-');
  for (var i = 0; i < arr.length; i++) {
    arr[i] =
      arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length - 1);
  }
  return arr.join('');
}

export function formatFacets(facets) {
  const map = {};
  Object.keys(facets).forEach((key) => {
    map[strToCam(key)] = facets[key].map((_) => strToCam(_.urlFriendlyId));
  });
  return map;
}

export function resetDataByParkIds(data, nItem, parkIds, PARK_MAPS) {
  parkIds.forEach((parkId) => {
    const park = PARK_MAPS[parkId];
    if (park) {
      data.push({
        ...nItem,
        name: `${nItem.name};destination=${park}`,
        park,
      });
    }
  });
}
