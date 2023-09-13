import AsteroidEntry from '@/components/AsteroidEntry/AsteroidEntry';
import styles from './page.module.css';

const data = {
  id: 465633,
  name: '465633 (2009 JR5)',
  size: Number('485'), //estimated_diameter / meters / estimated_diameter_max
  isHazardous: true, // is_potentially_hazardous_asteroid
  closeApproachDate: new Date('2015-09-08'),
  missDistance: {
    lunar: Math.round(Number('117.7685618773')),
    kilometers: Math.round(Number('45290298.225725659')),
  },
};

export default function Home() {
  return (
    <main>
      <AsteroidEntry {...data} />
    </main>
  );
}
