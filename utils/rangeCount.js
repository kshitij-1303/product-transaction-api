module.exports = (price, range) => {
  const floor = Math.floor(price / 100);

  if (floor >= 10) {
    range[9]++;
  } else {
    range[floor]++;
  }
  return range;

  // if (price >= 0 && price <= 100) {
  //   range.r1++;
  // }
  // if (price >= 101 && price <= 200) {
  //   range.r2++;
  // }
  // if (price >= 201 && price <= 300) {
  //   range.r1++;
  // }
  // if (price >= 301 && price <= 400) {
  //   range.r1++;
  // }
  // if (price >= 401 && price <= 500) {
  //   range.r1++;
  // }
  // if (price >= 501 && price <= 500) {
  //   range.r1++;
  // }
  // if (price >= 601 && price <= 700) {
  //   range.r1++;
  // }
  // if (price >= 701 && price <= 800) {
  //   range.r1++;
  // }
  // if (price >= 801 && price <= 900) {
  //   range.r1++;
  // }
  // if (price >= 901) {
  //   range.r1++;
  // }
};
