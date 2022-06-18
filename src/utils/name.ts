class FormatName {
  generName(key, type, dest) {
    return `${key};entityType=${type};destination=${dest}`;
  }

  exportKey(name) {
    return name.split(';')[0];
  }
}

export const formatName = new FormatName();
