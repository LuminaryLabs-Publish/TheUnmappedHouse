export const DESIGN_WIDTH = 1920;
export const DESIGN_HEIGHT = 1080;
export const DESIGN_ASPECT = DESIGN_WIDTH / DESIGN_HEIGHT;

export function computeAspectFrame(windowWidth = innerWidth, windowHeight = innerHeight) {
  const safeWidth = Math.max(1, windowWidth);
  const safeHeight = Math.max(1, windowHeight);
  const windowAspect = safeWidth / safeHeight;

  let width;
  let height;

  if (windowAspect >= DESIGN_ASPECT) {
    height = safeHeight;
    width = height * DESIGN_ASPECT;
  } else {
    width = safeWidth;
    height = width / DESIGN_ASPECT;
  }

  return {
    x: (safeWidth - width) / 2,
    y: (safeHeight - height) / 2,
    width,
    height,
    scale: width / DESIGN_WIDTH,
    aspect: DESIGN_ASPECT
  };
}

export function applyAspectFrame(element, frame = computeAspectFrame()) {
  if (!element) return frame;

  element.style.left = `${frame.x}px`;
  element.style.top = `${frame.y}px`;
  element.style.width = `${frame.width}px`;
  element.style.height = `${frame.height}px`;

  return frame;
}
