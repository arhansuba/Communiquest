import React from 'react';

interface ProfileInfoProps {
  profile: {
    username: string;
    bio: string;
    // Add other profile fields as needed
  };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{profile.username}</h2>
      <p>{profile.bio}</p>
      {/* Render other profile information */}
    </div>
  );
};

export default ProfileInfo;