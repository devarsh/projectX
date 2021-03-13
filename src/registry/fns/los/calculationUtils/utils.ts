export function PV(rate, periods, payment, future, type) {
  var type = typeof type === "undefined" ? 0 : type;
  rate = Number(rate);
  periods = Number(periods);

  if (rate === 0) {
    return -payment * periods - future;
  } else {
    return (
      (((1 - Math.pow(1 + rate, periods)) / rate) *
        payment *
        (1 + rate * type) -
        future) /
      Math.pow(1 + rate, periods)
    );
  }
}

export function PMT(ir, np, pv, fv = 0) {
  var presentValueInterstFector = Math.pow(1 + ir, np);
  var pmt =
    (ir * pv * (presentValueInterstFector + fv)) /
    (presentValueInterstFector - 1);
  return pmt;
}
