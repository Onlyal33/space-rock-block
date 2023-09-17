import { AsteroidShort } from '@/components/AsteroidEntry/AsteroidEntry';

interface AsteroidsFeed {
  near_earth_objects: Record<string, Asteroid[]>;
}

interface Asteroid {
  id: number;
  name: string;
  nasa_jpl_url: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
      estimated_diameter_min: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}

interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  miss_distance: {
    lunar: number;
    kilometers: number;
  };
  relative_velocity: {
    kilometers_per_second: number;
  };
  orbiting_body: string;
}

const mockAsteroidShortData = {
  id: 465633,
  name: '465633 (2009 JR5)',
  size: 485,
  isHazardous: true,
  closeApproachDate: '2015-09-08',
  missDistance: {
    lunar: 118,
    kilometers: 45290298,
  },
};

/* Neo - Feed
Retrieve a list of Asteroids based on their closest approach date to Earth.
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY

Query Parameters
Parameter	Type	Default	Description
start_date	YYYY-MM-DD	none	Starting date for asteroid search
end_date	YYYY-MM-DD	7 days after start_date	Ending date for asteroid search
api_key	string	DEMO_KEY	api.nasa.gov key for expanded usage
Example query
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY */

export async function fetchtAsteroidsFeed(
  page: number,
): Promise<AsteroidShort[]> {
  const date = new Date();
  date.setDate(date.getDate() + page);

  const formattedDate = date.toLocaleDateString('swe', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const res = await fetch(
    `${
      process.env.NASA_API_URL
    }/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${
      process.env.API_KEY || 'DEMO_KEY'
    }`,
  );

  const json: AsteroidsFeed = await res.json();

  return json.near_earth_objects[formattedDate].map((item) => ({
    id: item.id,
    isHazardous: item.is_potentially_hazardous_asteroid,
    size: Math.round(item.estimated_diameter.meters.estimated_diameter_max),
    closeApproachDate: item.close_approach_data[0].close_approach_date,
    name: item.name,
    missDistance: {
      kilometers: Math.round(
        item.close_approach_data[0].miss_distance.kilometers,
      ),
      lunar: Math.round(item.close_approach_data[0].miss_distance.lunar),
    },
  }));
}

export async function fetchtAsteroidData(id: string | number) {
  const res = await fetch(
    `${process.env.NASA_API_URL}/neo/${id}?api_key=${
      process.env.API_KEY || 'DEMO_KEY'
    }`,
  );

  const json: Asteroid = await res.json();

  const closestApproachId = json.close_approach_data.findIndex(
    (e) => new Date(e.close_approach_date_full) >= new Date(),
  );

  return {
    id: json.id,
    name: json.name,
    nasa_jpl_url: json.nasa_jpl_url,
    estimated_diameter_min: Math.round(
      json.estimated_diameter.meters.estimated_diameter_min,
    ),
    estimated_diameter_max: Math.round(
      json.estimated_diameter.meters.estimated_diameter_max,
    ),
    is_potentially_hazardous_asteroid: json.is_potentially_hazardous_asteroid,
    closestApproachId,
    close_approach_data: json.close_approach_data.map((d) => ({
      close_approach_date: d.close_approach_date,
      relative_velocity_kps:
        Math.round(d.relative_velocity.kilometers_per_second * 100) / 100,
      miss_distance_lunar: Math.round(d.miss_distance.lunar),
      miss_distance_kilometers: Math.round(d.miss_distance.kilometers),
      orbiting_body: d.orbiting_body,
    })),
  };
}
