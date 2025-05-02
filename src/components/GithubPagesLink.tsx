import React from 'react';
import Link from 'next/link';

interface GithubPagesLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

// This component is a wrapper around Next.js Link component
// It adds the basePath for GitHub Pages in production
const GithubPagesLink: React.FC<GithubPagesLinkProps> = ({ href, className, children, onClick }) => {
  // Get the base path from environment or default to '/Diabetes-Checker'
  const basePath = process.env.NODE_ENV === 'production' 
    ? '/Diabetes-Checker' 
    : '';
  
  // Add the basePath to the href
  const fullHref = `${basePath}${href}`;
  
  return (
    <Link href={href} as={fullHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default GithubPagesLink;
