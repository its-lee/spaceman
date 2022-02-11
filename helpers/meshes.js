import * as three from 'three';

const moonMaterial = new three.MeshStandardMaterial({
  map: new three.TextureLoader().load('./public/assets/images/moon.jpg'),
  normalMap: new three.TextureLoader().load('./public/assets/images/normal.jpg'),
});

export function addMoon(geometry, position) {
  const moon = new three.Mesh(geometry, moonMaterial);
  if (position) {
    for (const [ name, value ] of Object.entries(position)) {
      moon.position[name] = value;
    }
  }
  return moon;
};

export function addStar() {
  const star = new three.Mesh(
    new three.SphereGeometry(0.25, 24, 24),
    new three.MeshStandardMaterial({ color: 0xffffff })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  return star;
};