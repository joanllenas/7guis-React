export function findFirstCircleUnderPoint(circles, point) {
  const circlesUnderPoint = circles.filter( circle => {
    let d = Math.sqrt(Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2));
    return d <= circle.rad;
  });
  return circlesUnderPoint.length > 0 ? circlesUnderPoint[0] : null;
}

export function generateUniqueId() {
  return ( new Date().getTime().toString() + Math.random().toString() ).replace(".","");
}

export function findCircleById(circles, id) {
  const circleWithId = circles.filter( circle => {
    return circle.id === id;
  });
  return circleWithId.length > 0 ? circleWithId[0] : null;
}
