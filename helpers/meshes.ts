import * as three from 'three';

const moonMaterial = new three.MeshStandardMaterial({
  map: new three.TextureLoader().load('./images/moon.jpg'),
  normalMap: new three.TextureLoader().load('./images/normal.jpg'),
});

interface Position {
  x?: number,
  y?: number,
  z?: number
}

export function addMoon(geometry: three.BufferGeometry, position? : Position) {
  const moon = new three.Mesh(geometry, moonMaterial);
  if (position) {
      moon.position.set(position.x || 0, position.y || 0, position.z || 0);
  }
  return moon;
};

export function addStar() {
  const star = new three.Mesh(
    new three.SphereGeometry(0.25, 24, 24),
    new three.MeshStandardMaterial({ color: 0xffffff })
  );

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  return star;
};