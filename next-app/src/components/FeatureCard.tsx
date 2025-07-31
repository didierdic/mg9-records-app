import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    href: string; // Replace onClick with href
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonText, href }) => {
    return (
        <div className="group bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:-translate-y-1">
            <div className="mb-4">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-2">
                {title}
            </h3>
            <p className="text-gray-400 flex-grow mb-6">
                {description}
            </p>
            <Link
                href={href}
                className="mt-auto w-full inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-transform transform group-hover:scale-105"
            >
                {buttonText}
            </Link>
        </div>
    );
};
