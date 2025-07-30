import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
  FaTree,
  FaMonument,
} from 'react-icons/fa';

import heroImage from '../assets/Hero_image_Hompage.jpg';

// Attraction images

import { useAuth } from '../recoil/useAuth';
import React from 'react';
import GlobalCardComponent from '../components/features/GlobalCardComp';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const homePageFeaturedData = [
    //personalized choices to shown in the home page(no backend dependency)
    {
      name: 'Rock Garden of Chandigarh',
      description:
        'The Rock Garden of Chandigarh, created by Nek Chand, is a famous 40-acre sculpture garden built entirely from recycled industrial and urban waste. It features interconnected courtyards filled with hundreds of pottery-covered sculptures of dancers, musicians, animals and cultural figures, along with waterfalls and artistic walkways. The garden attracts thousands of visitors daily and is open from 5:00 AM to 9:00 PM with free entry.',
      rating: 4.7,
      slug: 'A-rock-garden-of-chandigarh',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753636453/attractions/main/c3cczyqgw5pjrvzeuep5.webp',
    },
    {
      name: 'Sukhna Lake',
      description:
        "Sukhna Lake is a 3 km² man-made reservoir at the foothills of the Shivalik range, created in 1958. This rainfed lake offers boating, a waterfront promenade and scenic views of the Himalayas. It has become one of Chandigarh's top attractions for leisurely boating, jogging and bird-watching. The promenade and parks around the lake provide a pleasant recreational space.",
      rating: 4.8,
      slug: 'A-sukhna-lake',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753887314/attractions/main/l4q6wdt95nj57iv1rf0k.jpg',
    },
    {
      name: 'Zakir Hussain Rose Garden',
      description:
        "Zakir Hussain Rose Garden is Asia's largest rose garden, established in 1967. Spread over 30 acres, it is home to 50,000 rose plants of 1600+ varieties. Named after former President Zakir Husain, the garden also features an annual Chrysanthemum show and collections of medicinal herbs and bonsai trees. Its vibrant flower beds and winding paths make it a popular spot for picnics and leisurely walks.",
      rating: 4.5,
      slug: 'A-zakir-hussain-rose-garden',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753722843/attractions/main/clerrihu13ehntmtwncj.jpg',
    },
    {
      name: 'Government Museum and Art Gallery',
      description:
        'The Government Museum and Art Gallery in Chandigarh (established 1968) houses rare Gandharan sculptures, Pahari and Mughal miniature paintings, and ancient artifacts. It is known for its rich collection of early Indian art and archaeological exhibits. Entry fee is ₹30 for adults, free for children. This museum is a key cultural institution in Chandigarh.',
      rating: 4.3,
      slug: 'A-government-museum-and-art-gallery',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753874426/attractions/main/otm4tvr4bgzhqjlyroxf.webp',
    },
    {
      name: 'Open Hand Monument',
      description:
        'The Open Hand Monument is a 26-meter tall rotating concrete sculpture designed by Le Corbusier. It symbolizes "the hand to give and the hand to take, peace and prosperity to all". It is part of the Capitol Complex (a UNESCO World Heritage site) and is an emblem of Chandigarh’s modernist architecture. The rotating sculpture on its pedestal is one of the city’s most iconic landmarks.',
      rating: 4.6,
      slug: 'A-open-hand-monument',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753874540/attractions/main/xgvk96ej3jt4vba9beqq.webp',
    },
    {
      name: 'Gurudwara Nada Sahib',
      description:
        "Gurudwara Nada Sahib, located on the Chandigarh-Zirakpur highway, is a Sikh shrine commemorating Guru Gobind Singh's visit. It features a holy sarovar (tank) where devotees bathe, a langar hall serving free meals, and a gurudwara with typical Sikh architecture. It is one of the most revered gurdwaras in the region.",
      rating: 4.9,
      slug: 'A-gurudwara-nada-sahib',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753636617/attractions/main/vdyutgijforovz1rbny1.webp',
    },
    {
      name: 'Nexus Elante Mall',
      description:
        'Nexus Elante Mall is one of North India’s largest shopping malls, with over 200 stores. Opened in 2013, it offers international and Indian fashion brands, a large food court, a multiplex cinema, and entertainment zones. The mall also features restaurants, gaming areas and events, making it a major leisure destination.',
      rating: 4.6,
      slug: 'A-nexus-elante-mall',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753636518/attractions/main/pj6louspaaqmu1efkx08.webp',
    },
    {
      name: 'Capitol Complex',
      description:
        'The Capitol Complex in Sector 1, Chandigarh, is a UNESCO World Heritage ensemble designed by Le Corbusier. It includes the Assembly building, High Court, Secretariat and Open Hand Monument. The complex exemplifies modernist architecture and city planning. Visitors can tour the grounds to see the innovative design of these government buildings.',
      rating: 4.5,
      slug: 'A-capitol-complex',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753636572/attractions/main/mxg5vh55ohouquyhcoks.webp',
    },
    {
      name: 'Tagore Theatre',
      description:
        "Tagore Theatre (Sector 18, Chandigarh) is a well-known cultural venue and theatre hall. Opened in 1964, it hosts plays, dance performances, concerts and other cultural events. The facility features a 480-seat auditorium and acoustics suitable for music and drama, making it a key hub for Chandigarh's performing arts.",
      rating: 4.6,
      slug: 'A-tagore-theatre',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753636783/attractions/main/wn01is4borewn0rzawtq.webp',
    },
    {
      name: 'Yadavindra Mughal Gardens (Pinjore)',
      description:
        'Also known as Pinjore Gardens, this 17th-century terraced complex features Mughal-style pavilions, fountains, and manicured lawns that cascade down seven levels. The annual Pinjore Heritage Festival and illuminated evening shows make it a year-round draw.',
      rating: 4.5,
      slug: 'A-yadavindra-mughal-gardens-pinjore',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753877160/attractions/main/lcpu6kocvs9mfyz1g4ug.webp',
    },
    {
      name: 'Morni Hills Nature Trails',
      description:
        'The only hill station in Haryana, Morni Hills offers pine-clad trekking routes, panoramic viewpoints, and twin lakes (Tikkar Taal). Birdwatchers spot pheasants and Himalayan bulbuls along the forest trails. The scenic treks provide a cool retreat from the plains and are popular for weekend hikes.',
      rating: 4.6,
      slug: 'A-morni-hills-nature-trails',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753877187/attractions/main/lqh4lzm9bvnklbaa6z40.jpg',
    },
    {
      name: 'VR Punjab Mall',
      description:
        'Formerly North Country Mall, this 2 million-sq-ft lifestyle destination (now VR Mohali) offers a wide range of fashion and electronics brands, a large food court, an INOX multiplex, and indoor VR gaming zones.',
      rating: 4.5,
      slug: 'A-vr-punjab-mall',
      image:
        'https://res.cloudinary.com/dbg8levkl/image/upload/v1753877128/attractions/main/zjotcdtxpy5lbvfxp2mu.jpg',
    },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center ">
        <div className="absolute inset-0 z-[-1]">
          <img
            src={heroImage}
            alt="Chandigarh Cityscape"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-gray-900/90"></div>
        </div>
        <div className="container mx-auto px-4 md:ml-10 ml-0">
          <div className="max-w-2xl animate-fadeInMore">
            <h1 className="md:text-6xl text-3xl font-bold font-chillax text-shadow mb-3">
              <span>
                Explore <span className="text-myteal-400">Chandigarh </span>Like Never Before
              </span>
            </h1>
            <p className="md:text-xl text-sm font-chillax  text-gray-300 mb-8 text-shadow">
              Discover the city's best attractions, restaurants, and events - all in one place.
            </p>
            <div className="flex flex-wrap md:gap-4 gap-4">
              <Link
                to="/attractions" //dummy
                className="md:px-8 md:py-3 px-5 py-2 rounded-md font-excon font-semibold bg-myteal-600 hover:bg-myteal-800 hover:text-[var(--text-light)] shadow-md transition-colors  md:mr-0"
              >
                Start Exploring
              </Link>
              <div className="md:hidden w-40"></div>
              {!isAuthenticated && (
                <Link
                  to="signup" //dummy
                  className="md:px-8 md:py-3 px-5 py-2 bg-transparent border border-white hover:border-teal-400 hover:text-teal-400 text-white rounded-md transition-colors font-medium shadow-lg"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-20 py-10 bg-gray-900">
        <div className="container mx-auto lg:px-20  md:px-4 px-8">
          <div className="text-center mb-16">
            <h2 className="text-[1.5rem] md:text-4xl font-chillax font-bold text-white mb-4">
              Discover All That <span className="text-myteal-400">Chandigarh</span> Has To Offer
            </h2>
            <p className="text-gray-300 md:max-w-[67vw] font-chillax font-regular mx-auto text-sm md:text-base">
              From world-renowned architecture to serene gardens, vibrant cultural events to
              delicious cuisine - explore everything the beautiful city has to offer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeaturesCard
              icon={<FaMapMarkerAlt className="text-teal-400 text-2xl" />}
              name={'Attractions'}
              description={
                "Explore the iconic Rock Garden, Sukhna Lake, Rose Garden, and Le Corbusier's architectural marvels."
              }
              linkDescription={'Explore Attractions'}
              linkIcon={<FaArrowRight className="ml-2" />}
            />

            <FeaturesCard
              icon={<FaUtensils className="text-teal-400 text-2xl" />}
              name={'Dining'}
              description={
                'Taste the flavors of Punjab with the best restaurants, street food, and cafes in Chandigarh.'
              }
              linkDescription={'Find Restaurants'}
              linkIcon={<FaArrowRight className="ml-2" />}
            />

            <FeaturesCard
              icon={<FaCalendarAlt className="text-teal-400 text-2xl" />}
              name={'Events'}
              description={
                'Stay updated with cultural festivals, concerts, exhibitions, and sports events happening in the city.'
              }
              linkDescription={'See All Events'}
              linkIcon={<FaArrowRight className="ml-2" />}
            />
          </div>
        </div>
      </section>

      <section className="pt-20 relative bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0 opacity-20 ">
          <img src={heroImage} className="object-cover w-full h-screen hidden md:block" />
        </div>

        <div className=" lg:px-24 md:px-8 px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-[1.5rem] md:text-4xl font-chillax font-bold text-white mb-4">
              Featured <span className="text-myteal-400">Attractions</span>
            </h1>
            <p className="text-gray-300 md:max-w-[67vw] font-chillax font-regular mx-auto text-sm md:text-base ">
              Don't miss these must-visit places that make Chandigarh unique and special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homePageFeaturedData.map((e, idx) => (
              <GlobalCardComponent key={e.slug} page={'attractions'} slug={e.slug} img={e.image}>
                <GlobalCardDetails
                  id={e.slug}
                  name={e.name}
                  rating={e.rating}
                  status={'Open Daily'}
                  description={e.description}
                />
              </GlobalCardComponent>
            ))}
          </div>

          <div className="w-full flex justify-center h-48 items-center">
            <Link
              to="/attractions" //dummy
              className="inline-flex items-center md:px-8 md:py-3 px-5 py-2 rounded-md font-excon font-semibold bg-myteal-600 hover:bg-myteal-800 hover:text-[var(--text-light)] shadow-md transition-colors  md:mr-0"
            >
              View All Attraction <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#1b8e92]/30 ' ></div> */}
        <div className="absolute inset-0 bg-gradient-to-t from-myteal-900/20 to-gray-900 "></div>
      </section>

      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-myteal-900 to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Explore Chandigarh?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create an account to save your favorite places and plan your perfect trip.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-myteal-500 hover:bg-myteal-600 text-white rounded-md transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                Sign Up Now
              </Link>
              <Link
                to="/attractions"
                className="px-8 py-3 bg-transparent border border-white hover:border-myteal-400 hover:text-teal-400 text-white rounded-md transition-colors font-medium shadow-lg"
              >
                Start Browsing
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

//Global card details
const GlobalCardDetails = ({ name, rating, description, linkTo, status, id }) => {
  return (
    <div className="px-4 pb-4 pt-2 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="md:text-xl text-xl font-chillax font-semibold text-white line-clamp-2 h-14 flex items-center">
            {name}
          </h3>
          <div className="flex-shrink-0 flex items-center bg-teal-900/50 px-2 py-1 rounded-full h-7">
            <FaStar className="text-yellow-500" />
            <span className="ml-1 text-white text-sm font-medium">{rating}</span>
          </div>
        </div>

        <p className="text-gray-300 font-chillax text-sm line-clamp-3 min-h-[60px]">
          {description}
        </p>
      </div>
 
      <div className="pt-3 mt-2">
  <div className="flex justify-between items-center">
    <Link
      to={linkTo}
      className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium text-sm"
    >
      View Details <FaArrowRight className="ml-2" />
    </Link>
    <span className="text-xs text-gray-500">{status}</span>
  </div>
</div>

    </div>
  );
};


// Features Component
const FeaturesCard = ({ icon, name, description, linkDescription, linkIcon }) => {
  return (
    <>
      <div className="bg-gray-800 rounded-xl p-6 text-center  shadow-md hover:shadow-xl hover-lift transition border border-gray-800 hover:border-myteal-700 ">
        <div className="md:w-16 md:h-16 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          {icon}
        </div>
        <h3 className="md:text-xl text-lg font-semibold text-white mb-3">{name}</h3>
        <p className="text-gray-300 mb-6 font-chillax text-sm md:text-base">{description}</p>
        <Link
          to="/attractions" //dummy
          className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
        >
          {linkDescription} {linkIcon}
        </Link>
      </div>
    </>
  );
};

export default Home;
