import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function ResourceList() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const querySnapshot = await getDocs(collection(db, 'resources'));
      const resourcesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(resourcesData);
    };
    fetchResources();
  }, []);

  return (
    <div className="">
      <Navigations />
      <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-[#186321] dark:text-white">
    <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Ressource</div>
    <ul>
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">

    <div className="xl:w-[80%] sm:w-[85%] xs:w-[90%] mx-auto flex md:flex-row xs:flex-col lg:gap-4 xs:gap-2 justify-center lg:items-stretch md:items-center mt-4">
      <div className="lg:w-[50%] xs:w-full">
        <img className="lg:rounded-t-lg sm:rounded-sm xs:rounded-sm" src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="billboard image" />
      </div>
      
      <div className="lg:w-[50%] sm:w-full xs:w-full bg-gray-100 dark:bg-black dark:text-gray-400 md:p-4 xs:p-0 rounded-md">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{resource.name}</h2>
        <p className="text-md mt-4">
        <Link to={`/resource/${resource.id}`} className="">
        {resource.description}
        </Link>
        </p>
        <p><strong>Catégorie:</strong> {resource.category}</p>
      </div>
    </div>
    </li>
        ))}
      </ul>
  </section>
  <Footer />
    </div>
  );
}

export default ResourceList;
