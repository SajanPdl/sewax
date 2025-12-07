import React from 'react';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
    <div className="p-12 border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl flex flex-col items-center justify-center text-center">
      <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-full mb-4">
        <span className="text-4xl">🚧</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Under Construction</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        This module is enabled by your current template but the features are coming soon in the next update.
      </p>
    </div>
  </div>
);

export const MenuManager = () => <Placeholder title="Menu Management" />;
export const TableManager = () => <Placeholder title="Table Management" />;
export const KitchenDisplay = () => <Placeholder title="Kitchen Display System" />;
export const ServiceList = () => <Placeholder title="Service Menu" />;
export const Appointments = () => <Placeholder title="Appointments" />;
export const Courses = () => <Placeholder title="Course Manager" />;
export const Students = () => <Placeholder title="Student Directory" />;
export const Projects = () => <Placeholder title="Projects" />;
export const CMS = () => <Placeholder title="CMS Content" />;