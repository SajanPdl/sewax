import React from 'react';

interface Props {
  // callback placeholders
}

export const Signup: React.FC<Props> = () => {
  return (
    <div className="max-w-md mx-auto py-24 px-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <p className="text-gray-600 mb-6">Signup form (email/password, OAuth) placeholder.</p>
      <div className="space-y-2">
        <button className="btn btn-primary">Continue with Google</button>
        <button className="btn btn-outline">Continue with GitHub</button>
      </div>
    </div>
  );
};

export default Signup;
